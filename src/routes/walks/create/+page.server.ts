// src/routes/create/+page.server.ts

import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const features = await prisma.feature.findMany();
  const places = await prisma.place.findMany();

  return { features, places };
}) satisfies PageServerLoad;

export const actions = {
  createOrUpdate: async ({ request }) => {
    const data = await request.formData();

    let name = data.get("name") as string;
    let location = data.get("location") as string;
    let mapLink = data.get("mapLink") as string;
    let features = data.get("features") as string;
    let places = data.get("places") as string;

    const featuresArray = features ? JSON.parse(features) : [];
    const placesArray = places
      ? JSON.parse(places).map((place: { value: any }) => place.value)
      : [];

    if (!name || !location || !mapLink) {
      return fail(400, { name, missing: true });
    }

    if (
      typeof name != "string" ||
      typeof location != "string" ||
      typeof mapLink != "string"
    ) {
      return fail(400, { incorrect: true });
    }

    await prisma.post.create({
      data: {
        name,
        location,
        mapLink,
        features: {
          connectOrCreate: featuresArray.map((feature: any) => {
            return {
              where: {
                id: feature.value,
              },
              create: { name: feature.label },
            };
          }),
        },
        places: {
          connect: placesArray.map((place: any) => ({ id: place })),
        },
      },
    });

    throw redirect(303, `/walks`);
  },

  createPlace: async ({ request }) => {
    const data = await request.formData();

    let name = data.get("name");
    let type = data.get("type");
    let mapLink = data.get("mapLink");

    if (!name || !type || !mapLink) {
      return fail(400, { name, missing: true });
    }

    if (
      typeof name != "string" ||
      typeof type != "string" ||
      typeof mapLink != "string"
    ) {
      return fail(400, { incorrect: true });
    }

    return await prisma.place.create({
      data: {
        name,
        type,
        mapLink,
      },
    });
  },
} satisfies Actions;
