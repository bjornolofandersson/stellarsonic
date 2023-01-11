<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string | undefined;
</script>

<div class="py-4">
  <label for={id} class="text-xs">{label}</label>
  <input id={id} class="w-full h-12" type="color" bind:value={value}>
</div>
