<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string | undefined;
  export let rows: number;
</script>

<div class="p-4 px-8">
  <label for={id} class="text-xs">{label}</label>
  <textarea id={id} class="w-full bg-[#ffffff60] p-4" rows={rows} bind:value={value} />
</div>
