// src/routes/create/+page.server.ts

import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }) => {
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

    await prisma.place.create({
      data: {
        name,
        type,
        mapLink,
      },
    });

    throw redirect(303, `/places`);
  },
} satisfies Actions;
