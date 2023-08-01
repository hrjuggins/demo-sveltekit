<!-- 1. -->
<script>
  // @ts-nocheck

  import { Title, Button, ChipGroup, Stack, Paper } from "@svelteuidev/core";
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

  const cardStyle = {
    height: 140,
    width: "calc(100vw - 80px)",
    display: "grid",
    placeItems: "center",
    borderRadius: 6,
    boxShadow: "0 4px 20px 0 #69648833",
    background: "none",
    border: "1px solid #333",
  };
  const createCard = {
    ...cardStyle,
    height: 70,
    background: "#8ba07a",
  };
</script>

<div class="home">
  <Header />
  <Stack spacing="xl">
    <a href="/walks">
      <Paper withBorder override={cardStyle}>
        <Title order={1} override={{ fontFamily: "Pacifico, cursive" }}
          >Walks</Title
        >
      </Paper>
    </a>

    <a href="/places">
      <Paper withBorder override={cardStyle}>
        <Title order={1} override={{ fontFamily: "Pacifico, cursive" }}
          >Food</Title
        >
      </Paper>
    </a>
    <a href="/walks/create">
      <Paper withBorder override={createCard}>
        <Title order={2}>Add a new walk</Title>
      </Paper>
    </a>
  </Stack>
</div>

<!-- <Favourites posts={data.favourites} />

<Group>
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
</Group> -->
<style>
  .home {
    background-image: url("/outside.png");
    background-size: contain;
    background-position: center 24px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color: #f2b553;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 70px;
  }
  a {
    text-decoration: none;
  }
</style>
