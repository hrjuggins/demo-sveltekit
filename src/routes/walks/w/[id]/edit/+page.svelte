<script lang="ts">
  import {
    Image,
    Text,
    ActionIcon,
    Group,
    Space,
    Chip,
    Paper,
    Stack,
    Button,
  } from "@svelteuidev/core";
  import {
    Star,
    StarFilled,
    Pencil1,
    Trash,
    PaperPlane,
  } from "radix-icons-svelte";
  import Header from "$lib/components/Header.svelte";
  import CreateOrEdit from "$lib/components/CreateOrEditWalk.svelte";
  import { enhance } from "$app/forms";
  export let data: any;
  const { post } = data;
  export let form;
  let isFavourite = post?.favourite;

  let features = data.features.map((feature: { name: any; id: any }) => ({
    label: feature.name,
    value: feature.id,
  }));

  let placesToEat = data.places.map(
    (place: { name: any; type: any; id: any }) => ({
      label: `${place.name} - ${place.type}`,
      value: place.id,
    })
  );
</script>

<CreateOrEdit {features} {placesToEat} {form} {post} />
