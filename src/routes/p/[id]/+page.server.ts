// src/routes/p/[id]/+page.server.ts
import prisma from "$lib/prisma";
// 1.
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ params: { id } }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { features: true, places: true },
  });
  return { post };
}) satisfies PageServerLoad;

export const actions = {
  toggleFavourite: async ({ params: { id } }) =>
    await prisma.$queryRaw`
      UPDATE Post
      SET favourite = NOT favourite
      WHERE id = ${Number(id)}
    `,

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

  // // 3.
  // deletePost: async ({ params: { id } }) => {
  //   await prisma.post.delete({
  //     where: { id: Number(id) },
  //   });

  //   throw redirect(303, "/");
  // },
} satisfies Actions;
