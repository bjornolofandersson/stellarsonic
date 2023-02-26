<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import MenuBar from "./MenuBar.svelte";

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
        <div class="absolute grid grid-cols-12 gap-20 mt-20"
          in:fly={{ x: clientWidth, duration: 500, easing: quintOut }}
          out:fly={{ x: -clientWidth, duration: 500, easing: quintOut }}>
          <div class="h-full col-span-7 flex justify-center items-center">
            <div class="px-10 text-palette-3">
              <h1 class="text-6xl font-title mb-20">{p.title}</h1>
              <p class="text-sm opacity-60">{p.description}</p>
              <div class="py-20 flex gap-8">
                <a class="border border-[#00000040] p-6 w-full rounded-full text-center" href="">Read more</a>
                <a class="border border-[#00000040] p-6 w-full rounded-full text-center" href="">Browse Mixtapes</a>
              </div>
            </div>
          </div>
          <div class="col-span-5 flex justify-center items-center">
            <div class="relative">
              <div class="absolute bg-palette-2 aspect-square w-full h-full -ml-10 -rotate-6 shadow-2xl" />
              <a href="/{p.slug}" class="block aspect-square rotate-6 shadow-xl">
                <img class="w-full h-full object-cover" src={p.image} alt=""/>
              </a>
            </div>
          </div>
        </div>
        {/if}
      {/each}
    </div>
    <div class="py-20 flex justify-around h-48">
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
