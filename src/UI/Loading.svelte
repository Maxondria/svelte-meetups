<script>
  export let centered = true;
</script>

<div class:loading-container={centered}>
  <div class="loading"></div>
</div>

<style>
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .loading {
    width: 3rem;
    height: 3rem;
    border: 0.5rem solid #ccc;
    border-top-color: #e40763;
    border-radius: 50%;
    animation: spin 1s infinite linear;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
