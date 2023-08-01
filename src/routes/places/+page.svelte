<!-- 1. -->
<script>
  // @ts-nocheck

  import { Title, Button, Stack, Container } from "@svelteuidev/core";
  import Header from "$lib/components/Header.svelte";
  import PlaceCard from "$lib/components/PlaceCard.svelte";

  export let data;
  const {places} = data;

  places.sort((a, b) => (a.id > b.id ? -1 : 1));

  const containerStyle = {
    paddingTop: 100,
    background: "#efe1c9",
    minHeight: "100vh",
  };
</script>
<Container override={containerStyle}>
<Header>
  <Button color="teal" ripple href="/places/create">Create</Button>
</Header>

<Stack>
  <Title order={2}>Places to eat</Title>
  {#each places as place (place.id)}
    <PlaceCard {place} />
  {/each}
</Stack>
</Container>  
