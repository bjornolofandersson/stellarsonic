<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: number | undefined;
</script>

<div class="py-4">
  <label for={id} class="text-xs">{label}</label>
  <input id={id} class="w-full bg-[#ffffff60] p-2 text-stone-700" type="number" bind:value={value}>
</div>
