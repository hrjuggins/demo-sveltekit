<!-- 1. -->
<script>
  // @ts-nocheck

  import { Title, Stack, Paper } from "@svelteuidev/core";
  import Header from "$lib/components/Header.svelte";

  const cardStyle = {
    height: 140,
    width: "calc(100vw - 80px)",
    display: "grid",
    placeItems: "center",
    borderRadius: 6,
    border: "1px solid #333",
    background: "#ffffff0f",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(3.3px)",
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
  </Stack>
</div>

<style>
  .home {
    background-image: url("/outside.png");
    background-size: contain;
    background-position: center 24px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 160px;
  }
  a {
    text-decoration: none;
  }
</style>
