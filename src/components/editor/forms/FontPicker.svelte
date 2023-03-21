<script lang="ts">
  import { List, ListItem, Option, Select, Scrollable, Input, Footer } from "src/editor";
    import ExpandSelect from "src/editor/ExpandSelect.svelte";

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
  <ExpandSelect icon="" label="Weight">
    <div slot="value">
      <span class="capitalize">{weight}</span>
    </div>
    <div class="flex justify-between w-full gap-4 flex-wrap">
      {#each weights as w}
        <button on:click={() => {weight = w}} class="flex gap-4 p-4 shadow rounded {weight === w ? 'bg-stone-100 shadow-lg' : 'bg-stone-200'}">
          <span class="text-sm">{w}</span>
        </button>
      {/each}
    </div>
  </ExpandSelect>

  <slot/>
{/if}
