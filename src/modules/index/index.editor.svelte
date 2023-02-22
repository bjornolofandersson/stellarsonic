<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { Action, Scrollable, TitleBar} from 'src/editor';
  import type { Entity } from '@lib/interfaces';
  import Accordion from 'src/editor/Accordion.svelte';
  import AccordionItem from 'src/editor/AccordionItem.svelte';
  import Input from 'src/editor/Input.svelte';
  import { IndexStore } from '.';

  export let entity: Entity<any>;
  export let data: any;
  export let sitemap: any;

  const store = IndexStore.instance(entity);
  const { entity: index } = store;
</script>

<Scrollable>
  <TitleBar title="Hero">
    <Action icon={$index.data.hero.disabled ? 'web_asset_off' : 'web_asset'} onClick={() => {$index.data.hero.disabled = !$index.data.hero.disabled}}/>
  </TitleBar>

  {#if !$index.data.hero.disabled}
    <label for="title" class="text-xs">Title</label>
    <Input id="title" bind:value={$index.data.hero.title} />
    <label for="cta-label" class="text-xs">Call to action label</label>
    <Input id="cta-label" bind:value={$index.data.hero.cta.label} />
    <label for="cta-url" class="text-xs">Call to action URL</label>
    <Input id="cta-url" bind:value={$index.data.hero.cta.url} />
  {/if}
</Scrollable>
