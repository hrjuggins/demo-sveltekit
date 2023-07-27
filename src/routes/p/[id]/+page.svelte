<script lang="ts">
  import {
    Image,
    Text,
    ActionIcon,
    Group,
    Space,
    Chip,
  } from "@svelteuidev/core";
  import {
    Star,
    StarFilled,
    Pencil1,
    Trash,
    PaperPlane,
  } from "radix-icons-svelte";
  import Header from "$lib/components/Header.svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { post } = data;

  let isFavourite = post.favourite;
</script>

<Header>
  <Group position="right">
    <form
      method="post"
      class="actions"
      use:enhance={() => {
        isFavourite = !isFavourite;

        return async ({ update }) => {
          await update();
        };
      }}
    >
      <ActionIcon
        size="lg"
        variant="outline"
        color="yellow"
        formaction="?/toggleFavourite"
      >
        {#if isFavourite}
          <StarFilled size={16} />
        {:else}
          <Star size={16} />
        {/if}
      </ActionIcon>
    </form>

    <ActionIcon size="lg" variant="outline">
      <Pencil1 size={16} />
    </ActionIcon>
    <form method="post" class="actions">
      <ActionIcon size="lg" variant="outline" formaction="?/deletePost">
        <Trash size={16} />
      </ActionIcon>
    </form>
  </Group>
</Header>

<Image
  radius="md"
  src={"https://cdn.vectorstock.com/i/preview-1x/26/32/tourists-on-hike-vector-46892632.jpg"}
  alt="Random unsplash image"
  width="100%"
/>

<Space h="md" />

<Group direction="row" position="apart">
  <Group direction="column" align="flex-start" spacing="xs">
    <Text size="xl">{post.name}</Text>
    <Text size="md" weight="light">{post.location}</Text>
  </Group>
  <ActionIcon size="lg" variant="outline">
    <a href={post.mapLink}>
      <PaperPlane size={16} />
    </a>
  </ActionIcon>
</Group>

<Space h="xl" />

<Text size="xl">Features</Text>
<Space h="md" />

<Group direction="row" spacing="xs">
  {#each post.features as feature (feature.id)}
    <Chip>{feature.name}</Chip>
  {/each}
</Group>

<!-- <form method="post" class="actions">
      {#if !post.published}
        <button formaction="?/publishPost">Publish</button>
      {/if}
      <button formaction="?/deletePost">Delete</button>
    </form> -->
<style>
</style>
