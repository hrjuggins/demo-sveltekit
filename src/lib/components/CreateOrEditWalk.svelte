<script lang="ts">
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

  export let post: any;

  export let form: any;

  export let features: any = [];
   
  export let placesToEat: any;

  let opened = false;

  const closeModal = () => (opened = false);

  let filterText = "";
  let value: any;


  if (post) {
    value = features.filter((i: any) =>
      post.features.map((pf: any) => pf.id).includes(i.value)
    );
  }

  let placeValue: any;

  if (post) {
    placeValue = placesToEat.filter((i: any) =>
      post.places.map((pf: any) => pf.id).includes(i.value)
    );
  }

  function handleFilter(e: any) {
    if (value?.find((i: any) => i.label === filterText)) return;
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

<form method="post" action="?/createOrUpdate" use:enhance={({data}) => {
  if (post) {
    data.set('id', post.id);
  }
  return async ({ update }) => {
    await update();
  };
}}>
  {#if form?.missing}<p class="error">Missing field required!</p>{/if}

  <Stack
    spacing="lg"
    justify="flex-start"
    override={{ height: "calc(100vh - 200px)" }}
  >
    <Title order={3}>Add a new walk</Title>

    <TextInput
      placeholder="Name this walk"
      label="Walk Name"
      name="name"
      value={post?.name}
    />
    <TextInput
      placeholder="Where is the walk?"
      label="Location"
      name="location"
      value={post?.location}
    />
    <TextInput
      placeholder="Google map link"
      label="Paste the link"
      name="mapLink"
      value={post?.mapLink}
    />
    <Text size="sm">Tags</Text>

    <Select
      on:change={handleChange}
      multiple
      on:filter={handleFilter}
      bind:filterText
      bind:value
      items={features}
      name="features"
      placeholder="e.g Long, short, easy, hard..."
    >
      <div slot="item" let:item>
        {item.created ? "Add new: " : ""}
        {item.label}
      </div>
    </Select>
    <Group direction="row" position="apart">
      <Text size="sm">Place to eat</Text>
      <Button
        variant="subtle"
        color="green"
        size="sm"
        type="button"
        on:click={() => (opened = true)}>New</Button
      >
    </Group>
    <Select
      items={placesToEat}
      multiple
      name="places"
      placeholder="Select places to eat nearby"
      bind:value={placeValue}
    />
  </Stack>

  <Group position="right">
    <a class="back" href="/walks"> or Cancel </a>
    <Button color="green" size="md" type="submit">
      {#if !!post}
        Update
      {:else}
        Create
      {/if}
    </Button>
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
