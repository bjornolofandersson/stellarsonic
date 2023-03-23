<script lang="ts">
  import { List, ListItem, Select, Scrollable, Input, Tabs, Tab, Range } from "src/editor";

  export let label: string;
  export let family: string;
  export let weight: number;
  export let lineHeight: number;

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
            return { value: 400, name: '400' };
          }
          return { value: parseInt(v), name: v };
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

<Tabs>
  <Tab name="family">
    <Input type="search" icon="search" placeholder="Search fonts" bind:value={search} />

    <Scrollable>
      <List>
        {#each filteredFonts as font}
          <ListItem active={selected === font} icon="" onClick={() => {selected = font}}>{font.family}</ListItem>
        {/each}
      </List>
    </Scrollable>
  </Tab>

  <Tab name="properties">
    <Select label="Weight" bind:value={weight} options={weights} />
    <Range label="Line height" bind:value={lineHeight} unit="rem" min={0.5} max={4} step={0.1} />

    <slot/>
  </Tab>
</Tabs>
