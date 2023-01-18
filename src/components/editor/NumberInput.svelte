<script lang="ts">
  export let id: string;
  export let label: string | undefined;
  export let value: number | undefined;
</script>

<div class="py-4">
  {#if label}
    <label for={id} class="text-xs">{label}</label>
  {/if}
  <input id={id} class="w-full bg-[#ffffff60] dark:bg-[#00000040] p-3 text-stone-700 dark:text-stone-400" type="number" bind:value={value}>
</div>
