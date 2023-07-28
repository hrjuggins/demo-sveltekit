<!-- 1. -->
<script>
  // @ts-nocheck

  import { Title, Button, ChipGroup, Stack } from "@svelteuidev/core";
  import Header from "$lib/components/Header.svelte";
  import PlaceCard from "$lib/components/PlaceCard.svelte";

  export let data;
  const {places} = data;

  places.sort((a, b) => (a.id > b.id ? -1 : 1));

</script>

<Header>
  <Button color="teal" ripple href="/places/create">Create</Button>
</Header>

<Stack>
  <Title order={2}>Places to eat</Title>
  {#each places as place (place.id)}
    <PlaceCard {place} />
  {/each}
</Stack>
