<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import { onInputHandler } from "../utils/inputHandler";
  import Modal from "../UI/Modal.svelte";
  import { isEmail, isMinLength, isNotEmpty, isURL } from "../utils/validation";
  import { databaseURL, meetupsStore } from "../store/meetups";
  import axios from "axios";

  export let id = undefined;

  let isLoading = false;

  let title = "";
  let subtitle = "";
  let description = "";
  let imageUrl = "";
  let address = "";
  let contactEmail = "";

  let meetup;

  $: {
    if (id && (meetup = $meetupsStore.find((m) => m.id === id))) {
      ({ title, subtitle, description, imageUrl, address, contactEmail } =
        meetup);
    }
  }
  let isFormValid = false;

  $: {
    isFormValid =
      isNotEmpty(title) &&
      isMinLength(title, 5) &&
      isNotEmpty(subtitle) &&
      isMinLength(subtitle, 5) &&
      isNotEmpty(description) &&
      isMinLength(description, 20) &&
      isNotEmpty(imageUrl) &&
      isURL(imageUrl) &&
      isNotEmpty(address) &&
      isMinLength(address, 5) &&
      isNotEmpty(contactEmail) &&
      isEmail(contactEmail);
  }

  const dispatch = createEventDispatcher();

  const onSubmitHandler = async () => {
    try {
      const meetup = {
        title,
        subtitle,
        description,
        imageUrl,
        address,
        contactEmail,
      };

      isLoading = true;

      if (id) {
        await axios.patch(`${databaseURL}/meetups/${id}.json`, meetup);
        meetupsStore.edit(id, meetup);
      } else {
        const response = await axios.post(`${databaseURL}/meetups.json`, {
          ...meetup,
          isFavorite: false,
        });

        meetupsStore.add({
          id: response.data.name,
          isFavorite: false,
          ...meetup,
        });
      }

      isLoading = false;

      title = "";
      subtitle = "";
      description = "";
      imageUrl = "";
      address = "";
      contactEmail = "";

      dispatch("savesuccess");
    } catch (error) {
      console.error("Error saving meetup:", error);
    } finally {
      isLoading = false;
    }
  };

  const onDeleteMeetup = async () => {
    try {
      isLoading = true;
      await axios.delete(`${databaseURL}/meetups/${id}.json`);
      meetupsStore.remove(id);
      dispatch("savesuccess");
    } catch (error) {
      console.error("Error deleting meetup:", error);
    } finally {
      isLoading = false;
    }
  };
</script>

<Modal title="Add a Meetup" {isLoading} on:cancel>
  <form on:submit|preventDefault={onSubmitHandler} action="">
    <TextInput
      label="Title"
      value={title}
      id="title"
      valid={isNotEmpty(title) && isMinLength(title, 5)}
      error="Please enter a title"
      on:input={onInputHandler((value) => (title = value))}
    />
    <TextInput
      label="Sub Title"
      value={subtitle}
      id="subtitle"
      valid={isNotEmpty(subtitle) && isMinLength(subtitle, 5)}
      error="Please enter a subtitle"
      on:input={onInputHandler((value) => (subtitle = value))}
    />
    <TextInput
      label="Description"
      controlType="textarea"
      rows="5"
      value={description}
      id="description"
      valid={isNotEmpty(description) && isMinLength(description, 20)}
      error="Please enter a description"
      on:input={onInputHandler((value) => (description = value))}
    />
    <TextInput
      label="Image URL"
      value={imageUrl}
      id="imageUrl"
      valid={isNotEmpty(imageUrl) && isURL(imageUrl)}
      error="Please enter a valid image URL"
      on:input={onInputHandler((value) => (imageUrl = value))}
    />
    <TextInput
      label="Address"
      value={address}
      id="address"
      valid={isNotEmpty(address) && isMinLength(address, 5)}
      error="Please enter an address"
      on:input={onInputHandler((value) => (address = value))}
    />
    <TextInput
      label="Contact Email"
      value={contactEmail}
      id="contactEmail"
      type="email"
      valid={isNotEmpty(contactEmail) && isEmail(contactEmail)}
      error="Please enter a valid email"
      on:input={onInputHandler((value) => (contactEmail = value))}
    />
  </form>

  <div slot="footer">
    <Button
      type="button"
      mode="outline"
      disabled={isLoading}
      on:click={() => dispatch("cancel")}
    >
      Cancel
    </Button>

    <Button
      type="button"
      on:click={onSubmitHandler}
      mode="success"
      disabled={!isFormValid || isLoading}
    >
      Save Meetup
    </Button>

    {#if id}
      <Button
        type="button"
        on:click={onDeleteMeetup}
        disabled={isLoading}
        mode="danger"
      >
        Delete
      </Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
