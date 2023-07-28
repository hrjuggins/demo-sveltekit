// src/routes/+page.server.ts

import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const places = await prisma.place.findMany();

  return { places };
}) satisfies PageServerLoad;
