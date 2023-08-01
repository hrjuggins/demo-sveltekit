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
    Container,
  } from "@svelteuidev/core";
  import {
    Star,
    StarFilled,
    Pencil1,
    Trash,
    PaperPlane,
  } from "radix-icons-svelte";
  import { DiamondTurnRightSolid } from "svelte-awesome-icons";
  import Header from "$lib/components/Header.svelte";
  import { enhance } from "$app/forms";
  export let data: any;
  const { post } = data;

  let isFavourite = post?.favourite;

  const commonPageStyles = {
    minHeight: "100vh",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 100px",
    paddingTop: 80,
  };
  const pageStyles = [
    {
      backgroundImage: "/1.png",
      backgroundColor: "#ffcc7b",
    },
    {
      backgroundImage: "/2.png",
      backgroundColor: "#f9f3e1",
    },
    {
      backgroundImage: "/3.png",
      backgroundColor: "#ecd9d4",
    },
    {
      backgroundImage: "/4.png",
      backgroundColor: "#cacebc",
    },
  ];

  const randomStyleIndex = Math.floor(Math.random() * pageStyles.length) || 0;

  const placeCard = {
    borderRadius: 6,
    border: "1px solid #333",
    background: "#ffffff0f",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(3.3px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  };
</script>

<Container override={{ ...pageStyles[randomStyleIndex], ...commonPageStyles }}>
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

      <ActionIcon size="lg" variant="outline" href="{post.id}/edit" root="a">
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
    src={pageStyles[randomStyleIndex].backgroundImage}
    alt="Random unsplash image"
    width="100%"
  />

  <Space h="md" />

  <Group direction="row" position="apart">
    <Group direction="column" align="flex-start" spacing="xs">
      <Text override={{ fontFamily: "Pacifico", fontSize: 24 }}
        >{post.name}</Text
      >
      <Text size="md" weight="light">{post.location}</Text>
    </Group>
    <ActionIcon size="lg" root="a" href={post.mapLink}>
      <DiamondTurnRightSolid size={24} color="#333" />
    </ActionIcon>
  </Group>

  <Space h="xl" />

  <Text size="xl">Features</Text>
  <Space h="md" />

  <Group direction="row" spacing="xs">
    {#each post.features as feature (feature.id)}
      <Chip color="dark" variant='outline'>{feature.name}</Chip>
    {/each}
  </Group>

  <Space h="xl" />

  <Text size="xl">Places to eat</Text>
  <Space h="md" />

  <Stack spacing="xl">
    {#each post.places as place (place.id)}
      <a href="/places/p/{place.id}">
        <Paper override={placeCard}>
          <Group direction="row" position="apart">
            <Stack spacing="xs">
              <Text size="md" weight="bold">{place.name}</Text>
              <Text size="sm">{place.type}</Text>
            </Stack>

            <ActionIcon size="lg">
              <a href={place.mapLink}>
                <PaperPlane size={16} />
              </a>
            </ActionIcon>
          </Group>
        </Paper>
      </a>
    {/each}
  </Stack>
</Container>

<style>
  a {
    text-decoration: none;
  }
</style>
