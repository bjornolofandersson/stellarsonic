<script lang="ts">
  import { Option, Select } from "src/editor";
  import ExpandSelect from "src/editor/ExpandSelect.svelte";

  export let label: string;
  export let family: string;
  export let weight: number;

  let fonts: any[] = [];
  let selected: any;
  let weights: any[] = [];

  $: {
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
    fonts = data.items.slice(0, 100);
    selected = fonts.find(f => f.family === family);
  }

  getFonts();
</script>

<ExpandSelect label={label}>
  <span slot="value">{family}</span>

  <Select label="Family" bind:value={selected}>
    {#each fonts as font}
      <Option value={font}>{font.family}</Option>
    {/each}
  </Select>

  <Select label="Weight" bind:value={weight}>
    {#each weights as w}
      <Option value={w}>{w}</Option>
    {/each}
  </Select>

  <slot/>
</ExpandSelect>
