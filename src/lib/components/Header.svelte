<script lang="ts">
  import { Affix, Title } from "@svelteuidev/core";
  let scrollY = 0;

  const titleStyle = {
    fontFamily: "Pacifico",
    color: "#333",
    textDecoration: "underline #8ba07a",
  };
</script>

<svelte:window on:scroll={() => (scrollY = window.scrollY)} />

<Affix position={{ top: 0 }}>
  <nav class:minimised={scrollY > 20}>
    {#if scrollY < 20}
      <a href="/">
        <Title order={1} override={titleStyle}>Sunday drive</Title>
      </a>
    {/if}
    <slot />
  </nav>
</Affix>

<style>
  nav {
    display: flex;
    padding: 2rem 1rem;
    justify-content: space-between;
    width: 100vw;
    transition: all 0.2s ease-in;
  }
  .minimised {
    padding: 1rem;
    justify-content: flex-end;
    background: none;
  }
</style>
