<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let show: boolean = false;
</script>


{#if show}
  <div class="absolute w-full px-8" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
    <slot/>
  </div>
{/if}
