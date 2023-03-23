<script lang="ts">
  import Icon from "./Icon.svelte";

  export let value: string | number | undefined;
  export let icon: string | undefined = undefined;
</script>

{#if icon}
<div class="mb-4 w-full p-4 pb-2 text-sm border-b border-[#00000020] rounded hover:border-stone-700 focus:text-stone-700 dark:text-stone-300 dark:focus:text-stone-100 dark:border-[#ffffff80] dark:focus:border-[#ffffff] transition">
  <div class="flex gap-4 -ml-4">
    <Icon class="opacity-50" bind:name={icon}/>
    <input bind:value={value} class="w-full placeholder-stone-400 focus:outline-none bg-transparent" {...$$restProps}>
  </div>
</div>
{:else}
<input class="mb-4 w-full p-4 pb-2 text-sm bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700 dark:text-stone-300 dark:focus:text-stone-100 dark:border-[#ffffff80] dark:focus:border-[#ffffff]"
  bind:value={value} {...$$restProps}>
{/if}
