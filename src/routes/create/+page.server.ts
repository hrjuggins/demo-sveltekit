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
  create: async ({ request }) => {
    const data = await request.formData();

    let name = data.get("name");
    let location = data.get("location");
    let mapLink = data.get("mapLink");
    let features = JSON.parse(data.get("features")!.valueOf().toString());
    let places = JSON.parse(data.get("places")!.valueOf().toString());

    features = features.map((feature: { value: any }) => feature.value);
    places = places.map((place: { value: any }) => place.value);

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
          connectOrCreate: features.map((feature: any) => {
            return {
              where: {
                id: typeof feature === "string" ? 9999999 : feature,
              },
              create: { name: feature.toString() },
            };
          }),
        },
        places: {
          connect: places.map((place: any) => ({ id: place })),
        },
      },
    });

    throw redirect(303, `/`);
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
