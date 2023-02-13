<script lang="ts">
  import { getContext } from "svelte";
	import { OPTIONS } from './SelectGroup.svelte';
  
  export let id: string;
  export let icon: string | undefined = undefined;

	const { registerOption, selectOption, selected } = getContext<any>(OPTIONS);

	registerOption(id);
</script>

{#if $selected === id}
  <button on:click={() => selectOption(id)} class="p-4 first:rounded-l-md last:rounded-r-md w-full bg-[#ffffff60] shadow-sm flex gap-4">
    {#if icon}
      <span class="material-symbols-outlined">{icon}</span>
    {/if}
    <span><slot/></span>
  </button>
{:else}
  <button on:click={() => selectOption(id)} class="p-4 first:rounded-l-md last:rounded-r-md w-full bg-[#00000010] text-stone-500 flex gap-4 hover:bg-[#ffffff60] transition">
    {#if icon}
      <span class="material-symbols-outlined">{icon}</span>
    {/if}
    <span><slot/></span>
  </button>
{/if}
