<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let onBack: () => void;
  export let title: string;
  export let show: boolean = false;
</script>

{#if show}
  <div class="absolute w-full px-8 overflow-y-auto" style="height: calc(100vh - 150px)" transition:fly={{ x: 512, duration: 500, easing: quintOut }}>
    <div class="flex">
      <button class="text-stone-400 hover:text-stone-700" on:click={onBack}>
        <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
      </button>
    </div>

    <div class="flex justify-between text-xl">
      <h2 class="mt-8 text-lg font-[500]">{title.toUpperCase()}</h2>
      <div class="flex">
        <slot name="actions"/>
      </div>
    </div>
    <slot/>
  </div>
{/if}
