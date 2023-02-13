<script lang="ts">
  import { SelectGroup, SelectGroupOption } from "src/editor";

  export let theme: any;
  export let items: any;
</script>

<ul class="mt-8">
  {#each items as item}
    <li>
      {#if item.type === 'select'}
        <label class="text-xs opacity-50">{item.name}</label>
        <SelectGroup bind:selected={theme[item.name]}>
          {#each item.options as option}
            <SelectGroupOption id={option}>{option}</SelectGroupOption>
          {/each}
        </SelectGroup>
      {/if}
    </li>
  {/each}
</ul>
