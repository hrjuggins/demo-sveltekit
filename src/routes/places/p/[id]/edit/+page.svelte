<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import CreateOrEditPlace from "$lib/components/CreateOrEditPlace.svelte";
  import type {ActionData} from "./$types";
  import { Container } from "@svelteuidev/core";

  export let form: ActionData;

  export let data: any;
  const { place } = data;
  const containerStyle = {
    paddingTop: 100,
    background: "#efe1c9",
    minHeight: "100vh",
  };
</script>
<Container override={containerStyle}>
<Header />

<CreateOrEditPlace {form} place={place}/>
</Container>
