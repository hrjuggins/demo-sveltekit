import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ params: { id } }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { features: true, places: true },
  });
  const features = await prisma.feature.findMany();
  const places = await prisma.place.findMany();

  return { post, features, places };
}) satisfies PageServerLoad;

export const actions = {
  toggleFavourite: async ({ params: { id } }) => {
    const favourite = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: { favourite: true },
    });
    await prisma.post.update({
      where: { id: Number(id) },
      data: { favourite: !favourite?.favourite },
    });
  },

  createOrUpdate: async ({ request }) => {
    const data = await request.formData();

    let name = data.get("name") as string;
    let location = data.get("location") as string;
    let mapLink = data.get("mapLink") as string;
    let features = data.get("features") as string;
    let places = data.get("places") as string;

    const featuresArray = features
      ? JSON.parse(features).map((feature: { label: any }) => feature.label)
      : [];
    const placesArray = places
      ? JSON.parse(places).map((place: { value: any }) => place.value)
      : [];

    // update post
    if (data.get("id")) {
      const id = data.get("id");

      await prisma.post.update({
        where: { id: Number(id) },
        data: {
          name,
          location,
          mapLink,
          features: {
            deleteMany: {},
            create: featuresArray.map((feature: any) => ({
              name: feature.toString(),
            })),
          },
          places: {
            connect: placesArray.map((place: any) => ({ id: place })),
          },
        },
      });
    }

    throw redirect(303, `/walks/w/${data.get("id")}`);
  },

  // 2.
  // publishPost: async ({ params: { id } }) => {
  //   await prisma.post.update({
  //     where: { id: Number(id) },
  //     data: {
  //       published: true,
  //     },
  //   });

  //   throw redirect(303, `/p/${id}`);
  // },

  deletePost: async ({ params: { id } }) => {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    throw redirect(303, "/");
  },
} satisfies Actions;
