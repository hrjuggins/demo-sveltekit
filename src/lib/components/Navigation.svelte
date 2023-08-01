<script>
  import {
    HouseSolid,
    PersonWalkingSolid,
    BowlFoodSolid,
  } from "svelte-awesome-icons";
  import { Text } from "@svelteuidev/core";
  import { page } from "$app/stores";

  const links = [
    {
      pathname: "/",
      icon: HouseSolid,
      text: "Home",
    },
    {
      pathname: "/walks",
      icon: PersonWalkingSolid,
      text: "Walks",
    },
    {
      pathname: "/places",
      icon: BowlFoodSolid,
      text: "Food",
    },
  ];
</script>

<nav>
  {#each links as link}
    <a
      href={link.pathname}
      class="nav-item"
      class:active={$page.url.pathname === link.pathname}
    >
      <svelte:component
        this={link.icon}
        color={$page.url.pathname.includes(link.pathname) ? "#f39751" : "#696488"}
        size="16"
      />
      <Text
        size="sm"
        color={$page.url.pathname.includes(link.pathname) ? "#f39751" : "#696488"}
        >{link.text}</Text
      >
    </a>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 1rem 3rem;
    box-shadow: 0 4px 20px 0 #69648833;
    background-color: white;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-decoration: none;
  }
</style>
