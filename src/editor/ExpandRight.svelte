<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string;
  export let icon: string | undefined = undefined;

	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('click')} class="flex justify-between text-sm mb-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none hover:border-stone-700 hover:text-stone-700 dark:text-stone-300 dark:focus:text-stone-100 dark:border-[#ffffff80] dark:focus:border-[#ffffff] transition">
  <div class="flex gap-4">
    {#if icon}
      <span class="material-symbols-outlined">{icon}</span>
    {/if}
    <span>{label}</span>
  </div>
  <div class="flex gap-4 -mr-4">
    <slot name="value"/>
    <span class="material-symbols-outlined">chevron_right</span>
  </div>
</button>
