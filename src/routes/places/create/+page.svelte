<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import CreateOrEditPlace from "$lib/components/CreateOrEditPlace.svelte";
  import type {ActionData} from "./$types";

  export let form: ActionData;
</script>

<Header />

<CreateOrEditPlace {form} place={null}/>
