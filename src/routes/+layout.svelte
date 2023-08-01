<script lang="ts">
  import { SvelteUIProvider, Container, createTheme, useSvelteUITheme,  } from "@svelteuidev/core";
  import Navigation from "$lib/components/Navigation.svelte";
  import "$lib/styles/style.css";
const newTheme = createTheme('newTheme', {
    ...useSvelteUITheme(),
    fonts: {
      standard: 'Quicksand'
    }
});
</script>

<SvelteUIProvider withNormalizeCSS withGlobalStyles class={newTheme}>
  <Container override={{ padding: 0, 
    minHeight: '100vh'
   }}>
    <slot />
  </Container>
  <!-- <Navigation /> -->
</SvelteUIProvider>
