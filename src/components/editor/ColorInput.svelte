<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string | undefined;
</script>

<div class="py-4 flex">
  <input id={id} class="w-12 h-12" type="color" bind:value={value}>
  <label for={id} class="text-md py-3 px-4 w-full bg-stone-200">{label}</label>
</div>
