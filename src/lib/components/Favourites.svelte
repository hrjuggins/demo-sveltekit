<script lang="ts">
  import { Title } from "@svelteuidev/core";

  import Post from "$lib/components/Post.svelte";

  export let posts: any;

  posts.sort((a: any,b: any) => (a.id > b.id) ? -1 : 1)

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
  .favourites {
    margin-bottom: 2rem;
  }
  .favourites-list {
    display: flex;
    overflow-x: scroll;
    gap: 2rem;
  }
</style>
