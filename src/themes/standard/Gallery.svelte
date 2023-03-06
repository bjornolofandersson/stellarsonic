<script lang="ts">
  import type { PageSummary } from "@lib/interfaces";
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import MenuBar from "./MenuBar.svelte";
  import Preview from "./Preview.svelte";

  export let data: any;
  export let site: any;
  export let previews: PageSummary[];

  const duration = 5000;
  let index = 0;
  let clientWidth = 0;
  let timer: any;

  function show(i: number) {
    index = i;
    timer = setTimeout(() => show((index + 1) % previews.length), duration);
  }
  show(index);
</script>

<div class="bg-primary text-primary h-screen overflow-hidden" bind:clientWidth={clientWidth}>
  <div class="flex flex-col container mx-auto px-20 h-full">
    <div class="col-span-12">
      <MenuBar site={site} />
    </div>
    <div class="relative flex-grow h-full">
      {#each previews as p, i}
        {#if i === index}
        <div class="absolute"
          in:fly={{ x: clientWidth, duration: 500, easing: quintOut }}
          out:fly={{ x: -clientWidth, duration: 500, easing: quintOut }}>
          <Preview data={p} flip={false} />
        </div>
        {/if}
      {/each}
    </div>
    <div class="py-14 px-10 flex justify-between h-48">
      <div class="flex gap-4">
        {#each data.cta as cta}
          <a class="text-primary-invert bg-primary-invert py-4 px-12 rounded-full text-center" href={cta.url}>{cta.label}</a>
        {/each}
      </div>
      <ul class="flex gap-8">
        {#each previews as p, i}
          <li>
            <button class="rounded-full w-3 h-3 text-primary-invert {index === i ? 'bg-primary-invert' : 'border border-stone-700'}" on:click={() => {index = i}}/>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
