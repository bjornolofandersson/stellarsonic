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

<Input type="search" icon="search" placeholder="Search fonts" bind:value={search} />

<Scrollable>
  <List>
    {#each filteredFonts as font}
      <ListItem active={selected === font} icon="" onClick={() => {selected = font}}>{font.family}</ListItem>
    {/each}
  </List>
</Scrollable>

<Footer>
  <Select label="Weight" bind:value={weight}>
    {#each weights as w}
      <Option value={w}>{w}</Option>
    {/each}
  </Select>

  <slot/>
</Footer>
