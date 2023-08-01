// src/routes/+page.server.ts

import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const favourites = async () =>
    await prisma.post.findMany({
      where: { favourite: true },
      include: { features: true, places: true },
    });

  const allPosts = async () =>
    await prisma.post.findMany({
      include: { features: true, places: true },
    });

  const features = async () => await prisma.feature.findMany();

  return {
    allPosts: allPosts(),
    favourites: favourites(),
    features: features(),
  };
}) satisfies PageServerLoad;
