<script lang="ts">
  export let image: string;
  export let url: string;
  export let date: string;
  export let categories: string[];

</script>
---

<div class="w-full overflow-hidden odd:bg-light-base-variant dark:odd:bg-dark-base-variant">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-12">
    <div class="text-right px-20">
      <time class="text-sm p-2 text-slate-600 dark:text-white" style="border-bottom: 1px solid #00000012">{date}</time>
      <ul class="flex justify-end">
        {#each categories as cat}
          <li class="px-1 py-2 mt-2 text-xs text-accent">{cat}</li>
        {/each}
      </ul>
    </div>
    <div class="w-full px-20 md:pl-0 lg:px-0">
      <a href={url} class="block relative aspect-square shadow-lg">
        <img class="absolute w-full h-full object-cover" src={image} alt=""/>
      </a>
    </div>
    <div class="px-20 py-6 lg:py-0 md:col-span-2">
      <slot/>
    </div>
  </div>
</div>
