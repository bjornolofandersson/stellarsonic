<script lang="ts">
  import { Footer, Input, List, ListItem, Scrollable } from "src/editor";
  import type { Entity } from "@lib/interfaces";
  import type { Page, Palette } from "src/content/config";
  import * as api from "@lib/api";
  import { onMount } from "svelte";

  export let page: Page;

  let options: Entity<Palette>[] = [];
  let search: string = '';
  let filtered: any[] = [];

  $: {
    filtered = options.filter(f => f.data.name.toLowerCase().includes(search.toLowerCase()));
  }
  
  onMount(async () => {
    options = await api.collection<Palette>('palettes');
  });
</script>
    
<Input type="search" icon="search" placeholder="Search palettes" bind:value={search} />

<Scrollable>
  <List>
    {#each filtered as option, i}
      <ListItem icon="" active={page.palette === option.id} onClick={() => {page.palette = option.id}}>
        <span>{option.data.name}</span>
        <ul class="flex gap-2 overflow-hidden" slot="actions">
          {#each option.data.colors as color}
            <li class="inline-block w-6 border border-stone-700 rounded h-full" style="background-color: {color};"></li>
          {/each}
        </ul>
      </ListItem>
    {/each}
  </List>
</Scrollable>

<Footer></Footer>