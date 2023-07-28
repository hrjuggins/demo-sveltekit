import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ params: { id } }) => {
  const place = await prisma.place.findUnique({
    where: { id: Number(id) },
    include: { posts: true },
  });
  return { place };
}) satisfies PageServerLoad;

export const actions = {
  deletePlace: async ({ params: { id } }) => {
    await prisma.place.delete({
      where: { id: Number(id) },
    });

    throw redirect(303, "/places");
  },
};
