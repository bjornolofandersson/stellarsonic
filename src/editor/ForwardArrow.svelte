<script lang="ts">
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let title: string;
</script>

<div class="flex justify-between w-full mb-8">
  <h1 class="uppercase opacity-50">
    {title}
  </h1>
  <button class="text-stone-400 hover:text-stone-700" on:click={() => dispatch('click')}>
    <span class="material-symbols-outlined text-4xl">arrow_right_alt</span>
  </button>
</div>
