<script lang="ts">
    import {Container} from '@svelteuidev/core'
  import Header from "$lib/components/Header.svelte";
  import CreateOrEditPlace from "$lib/components/CreateOrEditPlace.svelte";
  import type {ActionData} from "./$types";

  export let form: ActionData;
  const containerStyle = {
    paddingTop: 100,
    background: "#efe1c9",
    minHeight: "100vh",
  };
</script>

<Container override={containerStyle}>
<Header />

<CreateOrEditPlace {form} place={null}/>
</Container>    
