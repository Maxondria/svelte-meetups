<script>
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Header from "./UI/Header.svelte";

  import EditMeetup from "./Meetups/EditMeetup.svelte";

  import { databaseURL, meetupsStore } from "./store/meetups";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import Loading from "./UI/Loading.svelte";

  let isEditing = false;

  let page = "overview";
  let detailsId;
  let editId;
  let isLoading = false;

  onMount(async () => {
    isLoading = true;
    try {
      const response = await axios.get(`${databaseURL}/meetups.json`);
      const data = response.data;

      meetupsStore.set(
        Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .slice()
          .reverse()
      );
    } catch (error) {
      console.error("Failed to fetch meetups:", error);
    } finally {
      isLoading = false;
    }
  });

  const onShowDetails = (event) => {
    detailsId = event.detail.id;
    page = "details";
  };

  const onCloseDetails = () => {
    page = "overview";
    detailsId = null;
  };

  const onEditMeetup = (event) => {
    editId = event.detail.id;
    isEditing = true;
  };

  const onAfterEffects = () => {
    isEditing = false;
    editId = undefined;
  };

  const onToggleEditMode = () => (isEditing = !isEditing);
</script>

<Header />
<main>
  {#if page === "overview"}
    {#if isEditing}
      <!-- 
      bind:isEditing={isEditing} - 2-way binding allowing it's value to be set from both here and in the child
      bind:id={editId} - 2-way binding allowing it's value to be set from both here and in the child

      Remember: isEditing and editId should be props in the EditMeetup component
     -->
      <EditMeetup
        id={editId}
        on:cancel={onAfterEffects}
        on:savesuccess={onAfterEffects}
      />
    {/if}

    {#if isLoading}
      <Loading />
    {:else}
      <MeetupGrid
        {isEditing}
        meetups={$meetupsStore}
        on:showdetails={onShowDetails}
        on:editmeetup={onEditMeetup}
        on:toggleeditmode={onToggleEditMode}
      />
    {/if}
  {:else if page === "details" && detailsId}
    <MeetupDetail id={detailsId} on:close={onCloseDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
