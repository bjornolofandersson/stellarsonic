<script lang="ts">
    import { quintOut } from "svelte/easing";
    import { slide } from "svelte/transition";


  export let items: any[];
  export let context: any;
  export let post: any;
  export let onSelect: (item: string) => void;

  let active: any = undefined;
</script>

<ul class="font-primary mt-8 text-md text-stone-500">
  {#each items as item}
    {#if active === item.name}
      <div class="-ml-8 -mr-8 bg-[#00000007] p-8" transition:slide={{ duration: 200, easing: quintOut }}>
        <div class="flex mb-6 justify-between">
          <div class="flex">
            <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 mr-4">
              <span class="material-symbols-outlined">{item.icon}</span>
            </button>
            <h1 class="text-sm text-stone-700">{item.name}</h1>
          </div>
          <button on:click={() => {active = undefined}} class="text-stone-700 disabled:text-stone-400 mr-4">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <svelte:component this={item.panel} bind:context={context} bind:post={post}/>
      </div>
    {:else}
    <li class="">
      <button on:click={() => {active = item.name}} class="hover:text-stone-700 w-full text-left py-3 text-sm">
        <div class="flex">
          <span class="material-symbols-outlined mr-4">{item.icon}</span>
          <span>{item.name}</span>
        </div>
      </button>
    </li>
    {/if}
  {/each}
</ul>


