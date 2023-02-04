<script lang="ts">
  import { MultiButton } from "src/editor";

  export let theme: any;
  export let items: any;
</script>

<ul class="mt-8">
  {#each items as item}
    <li>
      {#if item.type === 'select'}
        <label class="text-xs opacity-50">{item.name}</label>
        <MultiButton options={item.options} bind:selected={theme[item.name]} />
      {/if}
    </li>
  {/each}
</ul>
