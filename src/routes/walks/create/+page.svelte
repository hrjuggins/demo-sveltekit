<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import {
    TextInput,
    Button,
    Stack,
    Group,
    Title,
    Text,
    Modal,
  } from "@svelteuidev/core";
  import Header from "$lib/components/Header.svelte";
  import Select from "svelte-select";
  import { enhance } from "$app/forms";
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

</script>

<Header />

<CreateOrEdit 
  features={features}
  placesToEat={placesToEat}
  form={form}
  post={null}
/>

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
