<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { fly, slide } from "svelte/transition";

  export let show: boolean = false;
  export let disabled: boolean = false;
  export let button: boolean = true;
  export let onAdd: () => void;
</script>

{#if show}
  <div
    class="relative mt-4 px-8 py-8 mb-8 -ml-8 -mr-8 bg-[#00000007] shadow-inner" 
    transition:slide={{ duration: 200, easing: quintOut }}
  >
    <slot/>
    {#if button}
    <button
      on:click={onAdd}
      in:fly={{ delay: 200, x: 15, duration: 200, easing: quintOut }}
      class="absolute right-4 bottom-0 text-stone-700 disabled:text-stone-400 -mb-7 p-4 w-14 h-14 bg-stone-100 rounded-full shadow enabled:hover:bg-stone-50"
      disabled={disabled}
    >
      <span class="material-symbols-outlined">add</span>
    </button>
    {/if}
  </div>
{/if}
