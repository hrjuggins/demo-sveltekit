// src/routes/+page.server.ts

import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const places = async () => await prisma.place.findMany();

  return { places: places() };
}) satisfies PageServerLoad;
