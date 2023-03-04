<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import { onMount } from "svelte";
  import * as store from '@lib/store';

  export let name: string;
  export let component: string;
  export let content: Entity<any>;
  export let site: any;
  export let props: any = {};

  const modules = import.meta.glob('../themes/*/*.svelte');
  const loadModule = modules[`../themes/${name}/${component}`];

  let Component: any = undefined;
  const c = store.loadEntity(content);
  store.site.set(site);
  const s = store.site;

  onMount(async () => {
    const module = await loadModule();
    Component = (module as any).default;
  });
</script>

{#if Component}
  <svelte:component this={Component} data={$c.data} site={$s} {...props}>
    <slot/>
  </svelte:component>
{/if}
