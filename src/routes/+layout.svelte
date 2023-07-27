<script lang="ts">
  import { SvelteUIProvider, Container } from "@svelteuidev/core";
  import "$lib/styles/style.css";
</script>

<SvelteUIProvider>
  <Container override={{ marginTop: 100 }}>
    <slot />
  </Container>
</SvelteUIProvider>
