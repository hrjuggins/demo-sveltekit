import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ params: { id } }) => {
  const post = async () =>
    await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { features: true, places: true },
    });

  return { post: post() };
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

  deletePost: async ({ params: { id } }) => {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    throw redirect(303, "/walks");
  },
} satisfies Actions;
