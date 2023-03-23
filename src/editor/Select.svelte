<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ButtonExpand from "./ButtonExpand.svelte";

  export let value: any;
  export let label: string;

	const dispatch = createEventDispatcher();
</script>

<div class="relative">
  <label class="absolute font-semi-bold mt-4 ml-4 pointer-events-none" for={label}>{label}</label>
  <select id={label} bind:value={value} on:change={onChange} class="text-right mb-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700 dark:text-stone-300 dark:focus:text-stone-100 dark:border-[#ffffff80] dark:focus:border-[#ffffff]">
    <slot/>
  </select>
</div>

<ButtonExpand label={label}>

</ButtonExpand>
