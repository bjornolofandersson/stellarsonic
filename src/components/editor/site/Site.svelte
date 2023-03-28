<script lang="ts">
  import Pages from "./PageAdd.svelte";

  import { onMount } from "svelte";
  import type { Entity, ModuleDescription } from "@lib/interfaces";
  import type { Page } from "src/content/config";
  import Scrollable from "src/editor/Scrollable.svelte";
  import Button from "src/editor/Button.svelte";
  import PageList from "./PageList.svelte";
  import * as api from '@lib/api';
    import PageAdd from "./PageAdd.svelte";

  export let site: any;
  export let panel: string;

  let pages: Entity<Page>[] = [];
  let modules: Record<string, ModuleDescription> = {}

  onMount(async () => {
    modules = await api.modules();
    pages = await api.collection<Page>('pages');
  });
</script>


<PageAdd modules={modules} />
<Scrollable>
  <PageList bind:panel={panel} pages={pages} modules={modules} />
</Scrollable>
<Button icon="explore" label="Navigation" on:click={() => {panel = 'navigation'}}></Button>
