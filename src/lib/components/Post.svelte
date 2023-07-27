<script lang="ts">
  import { Text } from "@svelteuidev/core";

  export let data: any;
</script>

<a class="post" class:favourite={data.favourite} href='/p/{data.id}'>
  <Text size="sm" color="white">{data.name}</Text>
  <Text size="sm" color="gray">{data.location}</Text>
</a>

<style>
  .post {
    padding: 2rem;
    text-decoration: none;
    height: 200px;
    background-image: url("https://cdn.vectorstock.com/i/preview-1x/26/32/tourists-on-hike-vector-46892632.jpg"), linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(9, 9, 121, 0.1) 35%,
      rgba(0, 0, 0, 1) 100%
    );
    transition: box-shadow 0.1s ease-in;
    background-size: cover;
    background-blend-mode: darken;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .favourite {
    min-width: 80%;
  }

  .post:hover {
    box-shadow: 1px 1px 3px #aaa;
    cursor: pointer;
  }

  .post,
  .post {
    margin-top: 2rem;
  }
</style>
