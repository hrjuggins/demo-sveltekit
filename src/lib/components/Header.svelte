<script lang="ts">
  import { Affix, Title } from "@svelteuidev/core";
  let scrollY = 0;
</script>

<svelte:window on:scroll={() => (scrollY = window.scrollY)} />

<Affix position={{ top: 0 }}>
  <nav class:minimised={scrollY > 20}>
    {#if scrollY < 20}
      <a href="/">
        <Title order={1}>Sunday drive</Title>
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
    background-color: white;
    width: 100vw;
    transition: all 0.2s ease-in;
  }
  .minimised {
    padding: 1rem;
    justify-content: flex-end;
    background: none;
  }
  a {
    text-decoration: none;
  }
</style>
