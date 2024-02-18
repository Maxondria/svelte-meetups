<script>
  import { isNotNullish } from "../utils/isNotNullish";

  export let controlType = "input";
  export let id;
  export let label;
  export let rows = 3;
  export let value;
  export let type = "text";
  export let valid = true;
  export let error = "";

  let touched = false;

  const onHandleBlur = () => (touched = true);
</script>

<div class="form-control">
  <label for="title">{label}</label>
  {#if controlType === "textarea"}
    <textarea
      {id}
      {value}
      class:invalid={touched && !valid}
      on:input
      {rows}
      on:blur={onHandleBlur}
    ></textarea>
  {:else}
    <input
      {type}
      {id}
      {value}
      class:invalid={touched && !valid}
      on:input
      on:blur={onHandleBlur}
    />
  {/if}
  {#if touched && !valid && isNotNullish(error)}
    <p class="error-message">{error}</p>
  {/if}
</div>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }

  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>
