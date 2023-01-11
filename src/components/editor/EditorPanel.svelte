<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let onBack: () => void;
  export let title: string;
</script>

<div class="absolute w-full px-8" transition:fly={{ x: 512, duration: 500, easing: quintOut }}>
  <div class="flex justify-between">
    <button class="text-stone-400 hover:text-stone-700" on:click={onBack}>
      <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
    </button>
    <h1 class="font-bold text-2xl">{title}</h1>
  </div>
  <slot/>
</div>
