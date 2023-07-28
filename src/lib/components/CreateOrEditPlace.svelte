<script lang="ts">
  import { Group, Button, TextInput, Stack } from "@svelteuidev/core";
  export let form: any;
  export let place: any;
</script>

{#if form?.missing}<p class="error">Missing field required!</p>{/if}

<form method="post">
  <Stack>
    <TextInput
      placeholder="Place name"
      label="Name"
      name="name"
      value={place?.name}
    />
    <TextInput
      placeholder="e.g Cafe, restaurant, pub..."
      label="Type"
      name="type"
      value={place?.type}
    />
    <TextInput
      placeholder="Paste map link here"
      label="Google map link"
      name="mapLink"
      value={place?.mapLink}
    />
    <Group position="right">
      <a class="back" href="/places"> or Cancel </a>
      <Button color="green" size="md" type="submit">
        {#if !!place}
          Update
        {:else}
          Create
        {/if}
      </Button>
    </Group>
  </Stack>
</form>

<style>
  .error {
    color: red;
  }
</style>
