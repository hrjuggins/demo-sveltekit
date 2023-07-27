<!-- 1. -->
<script>
  // @ts-nocheck

  import { Title, Button, ChipGroup, Space, Stack } from "@svelteuidev/core";
  import Header from "$lib/components/Header.svelte";
  import Post from "$lib/components/Post.svelte";
  import Favourites from "$lib/components/Favourites.svelte";

  export let data;
  let value;

  data.allPosts.sort((a, b) => (a.id > b.id ? -1 : 1));

  const features = data.features.map((feature) => ({
    label: feature.name,
    value: feature.id,
  }));

  let filteredPosts = data.allPosts;

  function handleFilter(e) {
    if (e.detail) {
      filteredPosts = data.allPosts.filter((post) =>
        post.features.map((feature) => feature.id).includes(e.detail)
      );
    } else {
      filteredPosts = data.allPosts;
    }
  }
</script>

<Header>
  <Button color="teal" ripple href="/create">Create</Button>
</Header>

<Favourites posts={data.favourites} />

<Stack>
  <Title order={2}>All walks</Title>
  <ChipGroup
    color="teal"
    size="sm"
    items={features}
    bind:value
    on:change={handleFilter}
  />
  {#each filteredPosts as post (post.id)}
    <Post data={post} />
  {/each}
</Stack>
