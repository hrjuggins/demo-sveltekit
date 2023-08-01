<script lang="ts">
  import { Container } from "@svelteuidev/core";
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
  const containerStyle = {
    paddingTop: 100,
    background: "#efe1c9",
    minHeight: "100vh",
  };
</script>

<Container override={containerStyle}>
  <CreateOrEdit {features} {placesToEat} {form} {post} />
</Container>
