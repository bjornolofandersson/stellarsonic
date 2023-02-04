<script lang="ts">
  export let id: string;
  export let label: string;
  export let value: string | undefined;
</script>

<div class="py-4 flex">
  <input id={id} class="w-12 h-12 border-0 p-0 m-0 bg-stone-300" type="color" style="border: none!important; appearance: none;" bind:value={value}>
  <label for={id} class="text-md py-3 px-4 w-full bg-stone-300 rounded">{label}</label>
</div>
