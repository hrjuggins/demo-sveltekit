<script lang="ts">
  import { Title } from "@svelteuidev/core";

  import Post from "$lib/components/Post.svelte";

  export let posts: any;

  posts.sort((a: any, b: any) => (a.id > b.id ? -1 : 1));
</script>

<div class="favourites">
  <Title order={2}>Favourites</Title>
  {#if posts.length === 0}
    <p>No favourites yet</p>
  {:else}
    <div class="favourites-list">
      {#each posts as favourite (favourite.id)}
        <Post data={favourite} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .favourites-list {
    display: flex;
    overflow-x: scroll;
    gap: 2rem;
    padding: 1rem;
    scroll-snap-type: mandatory;
    scroll-snap-points-x: repeat(3rem);
    scroll-snap-type: x mandatory;
    scroll-padding-left: 4px;
  }
  .favourites-list::-webkit-scrollbar {
    display: none;
  }
  .favourites-list > a {
    background-color: rgba(254, 249, 236, 1);
    border: 1px solid rgba(241, 165, 75, 1);
  }
</style>
