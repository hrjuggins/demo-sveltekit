<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import CreateOrEditPlace from "$lib/components/CreateOrEditPlace.svelte";
  import type {ActionData} from "./$types";

  export let form: ActionData;

  export let data: any;
  const { place } = data;
</script>

<Header />

<CreateOrEditPlace {form} place={place}/>
