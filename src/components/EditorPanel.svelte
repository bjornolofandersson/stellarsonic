<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let onBack: () => void;
  export let onSave: () => void;
</script>

<div class="absolute w-full" transition:fly={{ x: 512, duration: 500, easing: quintOut }}>
  <div class="px-8 flex justify-between">
    <button class="text-stone-400 hover:text-stone-700" on:click={onBack}>
      <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
    </button>
    <button class="text-stone-400 hover:text-stone-700 ml-4" on:click={onSave}>
      <span class="material-symbols-outlined text-4xl">save_as</span>
    </button>
  </div>
  <slot/>
</div>
