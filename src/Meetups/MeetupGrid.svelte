<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import MeetupItem from "./MeetupItem.svelte";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";

  export let meetups;
  export let isEditing = false;

  let seleted = "all";

  const onFilter = (event) => (seleted = event.detail.name);

  $: sievedMeetups = meetups.filter(
    (meetup) => seleted === "all" || meetup.isFavorite
  );

  const dispatch = createEventDispatcher();
</script>

<section class="meetup-controls">
  <MeetupFilter on:filter={onFilter} {seleted} />
  <Button type="button" on:click={() => dispatch("toggleeditmode")}>
    {isEditing ? "Cancel" : "New Meetup"}
  </Button>
</section>

{#if sievedMeetups.length < 1}
  <p class="no-meetups">No meetups found. Maybe create one?</p>
{:else}
  <section class="meetups">
    {#each sievedMeetups as meetup (meetup.id)}
      <div transition:scale animate:flip={{ duration: 300 }}>
        <MeetupItem {...meetup} on:showdetails on:editmeetup />
      </div>
    {/each}
  </section>
{/if}

<style>
  .meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    .meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .meetup-controls {
    margin: 1rem;
    width: 97%;
    display: flex;
    justify-content: space-between;
  }

  .no-meetups {
    text-align: center;
    margin-top: 3rem;
    font-size: 1.5rem;
  }
</style>
