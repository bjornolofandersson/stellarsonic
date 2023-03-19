<script lang="ts">
  import { List, ListItem, Option, Select, Scrollable, Input, Footer } from "src/editor";

  export let label: string;
  export let family: string;
  export let weight: number;

  let fonts: any[] = [];
  let selected: any;
  let weights: any[] = [];
  let search: string = '';
  let filteredFonts: any[] = [];
  let tab: string = 'family';

  $: {
    filteredFonts = fonts.filter(f => f.family.toLowerCase().includes(search.toLowerCase()));

    if (selected) {
      family = selected.family;
      weights = selected.variants
        .filter((v: string) => !v.includes('italic'))
        .map((v: string) => {
          if (v === 'regular') {
            return 400;
          }
          return parseInt(v);
      });
    }
  }

  async function getFonts() {
    const apiKey = 'AIzaSyAscojZoTHT-ChlbFfAeONUjCntBXQiXPU';
    const resp = await fetch(`https://webfonts.googleapis.com/v1/webfonts?sort=POPULARITY&key=${apiKey}`);
    const data = await resp.json();
    filteredFonts = fonts = data.items.slice(0, 100);
    selected = fonts.find(f => f.family === family);
  }

  getFonts();
</script>

<div class="text-sm flex gap-4 mb-8">
  {#each ['family', 'properties'] as t}
    <button 
      on:click={() => { tab = t }}
      class="capitalize border-b-2 {t === tab ? 'border-stone-600' : 'opacity-50'}">{t}</button>
  {/each}
</div>

{#if tab === 'family'}
<Input type="search" icon="search" placeholder="Search fonts" bind:value={search} />

<Scrollable>
  <List>
    {#each filteredFonts as font}
      <ListItem active={selected === font} icon="" onClick={() => {selected = font}}>{font.family}</ListItem>
    {/each}
  </List>
</Scrollable>
{/if}

{#if tab === 'properties'}
  <Select label="Weight" bind:value={weight}>
    {#each weights as w}
      <Option value={w}>{w}</Option>
    {/each}
  </Select>

  <slot/>
{/if}
