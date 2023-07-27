<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import {
    TextInput,
    Button,
    CheckboxGroup,
    Stack,
    Group,
    Title,
    Text,
    Modal,
  } from "@svelteuidev/core";
  import Header from "$lib/components/Header.svelte";
  import Select from "svelte-select";

  export let form: ActionData;

  export let data: PageData;

  let features = data.features.map((feature: { name: any; id: any }) => ({
    label: feature.name,
    value: feature.id,
  }));

  const placesToEat = data.places.map(
    (place: { name: any; type: any; id: any }) => ({
      label: `${place.name} - ${place.type}`,
      value: place.id,
    })
  );

  let opened = false;

  const closeModal = () => (opened = false);

  let filterText = '';
  let value = null;
  function handleFilter(e) {        
        if (value?.find(i => i.label === filterText)) return;
        if (e.detail.length === 0 && filterText.length > 0) {
            const prev = features.filter((i) => !i.created);
            features = [...prev, { value: filterText, label: filterText, created: true }];
        }
    }
    
    function handleChange(e) {
      features = features.map((i) => {
            delete i.created;
            return i;
        });
    }
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

    <!-- <Select items={features} multiple name="features" /> -->
    <Select on:change={handleChange} multiple on:filter={handleFilter} bind:filterText bind:value items={features } name="features">
      <div slot="item" let:item>
          {item.created ? 'Add new: ' : ''}
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
    <Select items={placesToEat} multiple />
  </Stack>

  <!-- <input class="hidden" id="file-to-upload" type="file" accept=".png,.jpg" /> -->
  <Group position="right">
    <a class="back" href="/"> or Cancel </a>
    <Button color="green" size="md" type="submit">Create</Button>
  </Group>
</form>

<Modal
  centered
  opened={opened}
  size="xs"
  on:close={closeModal}
  title="Create a new feature"
>
    <form method="post" action="?/createPlace">
      <Stack>
        <TextInput placeholder="Place name" label="Name" name="name" />
        <TextInput
          placeholder="e.g Cafe, restaurant, pub..."
          label="Type"
          name="type"
        />
        <TextInput
          placeholder="Paste map link here"
          label="Google map link"
          name="mapLink"
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
