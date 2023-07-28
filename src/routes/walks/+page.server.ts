// src/routes/+page.server.ts

import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  // 1.
  const favourites = await prisma.post.findMany({
    where: { favourite: true },
    include: { features: true, places: true },
  });

  const allPosts = await prisma.post.findMany({
    include: { features: true, places: true },
  });

  const features = await prisma.feature.findMany();

  // 2.
  return { allPosts, favourites, features };
}) satisfies PageServerLoad;
