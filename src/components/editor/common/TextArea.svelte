<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string | undefined;
  export let rows: number;
</script>

<div class="py-4">
  <label for={id} class="text-xs">{label}</label>
  <textarea id={id} class="w-full bg-[#00000010] p-4 rounded-md" rows={rows} bind:value={value} />
</div>
