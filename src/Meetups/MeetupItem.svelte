<script>
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import { databaseURL, meetupsStore } from "../store/meetups";
  import { createEventDispatcher } from "svelte";
  import axios from "axios";

  export let id;
  export let title;
  export let subtitle;
  export let description;
  export let imageUrl;
  export let address;
  export let isFavorite = false;

  const toggleFavourite = async (id) => {
    //update the store to simulate the change almost instantly
    meetupsStore.makeFavorite(id);
    try {
      await axios.patch(`${databaseURL}/meetups/${id}.json`, {
        isFavorite: !isFavorite,
      });
    } catch (error) {
      //revert the change if the request fails
      meetupsStore.makeFavorite(id);
    }
  };

  const dispatch = createEventDispatcher();
</script>

<article>
  <header>
    <h1 class:is-favorite={isFavorite}>
      {title}
      {#if isFavorite}
        <Badge>Favorite</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <h2>{address}</h2>
  </header>
  <div class="image">
    <img src={imageUrl} alt="" />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button on:click={() => dispatch("editmeetup", { id })}>Edit Meetup</Button>
    <Button
      type="button"
      mode="outline"
      on:click={() => dispatch("showdetails", { id })}>Show Details</Button
    >
    <Button
      type="button"
      mode="outline"
      color={isFavorite ? "success" : null}
      on:click={() => toggleFavourite(id)}
    >
      {isFavorite ? "Remove Favorite" : "Favorite"}
    </Button>
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
