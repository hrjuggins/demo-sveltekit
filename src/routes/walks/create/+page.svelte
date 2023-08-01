<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import { Container } from "@svelteuidev/core";
  import Header from "$lib/components/Header.svelte";
  import CreateOrEdit from "$lib/components/CreateOrEditWalk.svelte";

  export let form: ActionData;

  export let data: PageData;

  let features = data.features.map((feature: { name: any; id: any }) => ({
    label: feature.name,
    value: feature.id,
  }));

  let placesToEat = data.places.map(
    (place: { name: any; type: any; id: any }) => ({
      label: `${place.name} - ${place.type}`,
      value: place.id,
    })
  );
  const containerStyle = {
    paddingTop: 100,
    background: "#efe1c9",
    minHeight: "100vh",
  };
</script>

<Container override={containerStyle}>
  <Header />

  <CreateOrEdit {features} {placesToEat} {form} post={null} />
</Container>

<style global>
  .back {
    margin-left: 1rem;
  }
  .error {
    color: red;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
