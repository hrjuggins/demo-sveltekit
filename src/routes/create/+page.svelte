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

  let opened = false;

  const closeModal = () => (opened = false);

  let filterText = "";
  let value: any[] | null = null;

  function handleFilter(e: any) {
    if (value?.find((i) => i.label === filterText)) return;
    if (e.detail.length === 0 && filterText.length > 0) {
      const prev = features.filter((i: any) => !i.created);
      features = [
        ...prev,
        { value: filterText, label: filterText, created: true },
      ];
    }
  }

  function handleChange() {
    features = features.map((i: any) => {
      delete i.created;
      return i;
    });
  }

  let placeName = "";
  let placeType = "";
  let placeMapLink = "";
</script>

<Header />

<form method="post" action="?/create">
  {#if form?.missing}<p class="error">Missing field required!</p>{/if}

  <Stack
    spacing="lg"
    justify="flex-start"
    override={{ height: "calc(100vh - 200px)" }}
  >
    <Title order={3}>Add a new walk</Title>

    <TextInput placeholder="Name this walk" label="Walk Name" name="name" />
    <TextInput
      placeholder="Where is the walk?"
      label="Location"
      name="location"
    />
    <TextInput
      placeholder="Google map link"
      label="Paste the link"
      name="mapLink"
    />
    <Text size="sm">Select features</Text>

    <Select
      on:change={handleChange}
      multiple
      on:filter={handleFilter}
      bind:filterText
      bind:value
      items={features}
      name="features"
    >
      <div slot="item" let:item>
        {item.created ? "Add new: " : ""}
        {item.label}
      </div>
    </Select>
    <Group direction="row" position="apart">
      <Text size="sm">Select places to eat</Text>
      <Button
        variant="subtle"
        color="green"
        size="sm"
        type="button"
        on:click={() => (opened = true)}>New</Button
      >
    </Group>
    <Select items={placesToEat} multiple name="places" />
  </Stack>

  <Group position="right">
    <a class="back" href="/"> or Cancel </a>
    <Button color="green" size="md" type="submit">Create</Button>
  </Group>
</form>

<Modal
  centered
  {opened}
  size="xs"
  on:close={closeModal}
  title="Create a new feature"
>
  <form
    method="post"
    action="?/createPlace"
    use:enhance={() => {
      closeModal();
      placesToEat = [{ value: null, label: placeName }, ...placesToEat];
      placeName = "";
      placeType = "";
      placeMapLink = "";
      return async ({ update }) => {
        await update();
      };
    }}
  >
    <Stack>
      <TextInput
        placeholder="Place name"
        label="Name"
        name="name"
        bind:value={placeName}
      />
      <TextInput
        placeholder="e.g Cafe, restaurant, pub..."
        label="Type"
        name="type"
        bind:value={placeType}
      />
      <TextInput
        placeholder="Paste map link here"
        label="Google map link"
        name="mapLink"
        bind:value={placeMapLink}
      />
      <Group position="right">
        <Button color="green" size="sm" type="submit">Create</Button>
      </Group>
    </Stack>
  </form>
</Modal>

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
