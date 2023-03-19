<script lang="ts">
  import { List, ListItem, Option, Select, Scrollable } from "src/editor";

  export let label: string;
  export let family: string;
  export let weight: number;

  let fonts: any[] = [];
  let selected: any;
  let weights: any[] = [];
  let search: string = '';
  let filteredFonts: any[] = [];

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


{#if selected}
  <h1 class="mb-8">{selected.family}</h1>
{/if}

<input type="search" class="w-full p-4 mb-4 bg-transparent border-b border-stone-400 focus:border-stone-700 focus:text-stone-700 focus:outline-none placeholder-stone-400"
  placeholder="Search fonts" aria-label="Search" bind:value={search}>

<Scrollable>
  <List>
    {#each filteredFonts as font}
      <ListItem active={selected === font} icon="" onClick={() => {selected = font}}>{font.family}</ListItem>
    {/each}
  </List>
</Scrollable>

<div class="-mr-8 -ml-8 px-8 border-t border-stone-300 pt-4">
  <Select label="Weight" bind:value={weight}>
    {#each weights as w}
      <Option value={w}>{w}</Option>
    {/each}
  </Select>

  <slot/>
</div>
