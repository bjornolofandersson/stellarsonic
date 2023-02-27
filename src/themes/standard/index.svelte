<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import MenuBar from "./MenuBar.svelte";
    import Preview from "./Preview.svelte";

  export let data: any;
  export let page: any;
  export let navigation: any;
  export let previews: any;

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

<div class="bg-palette-1 h-screen overflow-hidden" bind:clientWidth={clientWidth}>
  <div class="flex flex-col container mx-auto px-20 h-full">
    <div class="col-span-12">
      <MenuBar sitemap={navigation} />
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
    <div class="py-20 px-10 flex justify-between h-48">
      <a class="" href="/mixtapes">Browse Mixtapes</a>
      <ul class="flex gap-8">
        {#each previews as p, i}
          <li>
            <button class="rounded-full w-3 h-3 {index === i ? 'bg-palette-3' : 'border border-stone-700'}" on:click={() => {index = i}}/>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
