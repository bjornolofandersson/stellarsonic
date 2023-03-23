<script lang="ts">
  import ButtonExpand from "./ButtonExpand.svelte";

  export let value: number;
  export let label: string;
  export let palette: string[];
</script>

<ButtonExpand label={label}>
  <span slot="value"
    class="inline-block w-6 h-6 rounded border border-stone-700"
    style="background-color: {palette[value]};"
  />

  <div class="flex justify-start gap-4">
    {#each palette as color, i}
      <button on:click={() => {value = i}}
        class="inline-block w-6 h-6 rounded border border-stone-700"
        style="background-color: {color};"
      />
    {/each}
  </div>
</ButtonExpand>
