<script>
  import {
    Group,
    Space,
    Stack,
    Title,
    ActionIcon,
    Container,
  } from "@svelteuidev/core";
  import { PaperPlane, Pencil1, Trash } from "radix-icons-svelte";
  import Post from "$lib/components/Post.svelte";
  import Header from "$lib/components/Header.svelte";

  export let data;
  const { place } = data;
  const containerStyle = {
    paddingTop: 100,
    background: "#efe1c9",
    minHeight: "100vh",
  };
</script>

<Container override={containerStyle}>
  <Header>
    <Group position="right">
      <ActionIcon size="lg" variant="outline" href="{place.id}/edit" root="a">
        <Pencil1 size={16} />
      </ActionIcon>
      <form method="post" class="actions">
        <ActionIcon size="lg" variant="outline" formaction="?/deletePlace">
          <Trash size={16} />
        </ActionIcon>
      </form>
    </Group>
  </Header>

  <Group position="apart">
    <Stack>
      <Title order={1}>{place.name}</Title>
      <Title order={2} color="gray">{place.type}</Title>
    </Stack>
    <ActionIcon size="lg">
      <a href={place.mapLink}>
        <PaperPlane size={16} />
      </a>
    </ActionIcon>
  </Group>

  <Space h="xl" />

  <Stack spacing="xl">
    <Title order={3}>Nearby walks</Title>

    {#each place.posts as post (post.id)}
      <Post data={post} />
    {/each}
  </Stack>
</Container>
