<script lang="ts">
  export let id: string;
  export let label: string | undefined;
  export let value: string | undefined;
</script>

<div class="py-4">
  {#if label}
    <label for={id} class="text-xs">{label}</label>
  {/if}
  <input id={id} class="w-full rounded-md bg-[#00000010] dark:bg-[#00000040] p-3 text-stone-600 dark:text-[#ffffffa0]" type="text" bind:value={value}>
</div>
