<script lang="ts">
  import type { PageSummary } from "@lib/interfaces";

  export let data: PageSummary;
  export let flip: boolean;
</script>

<div class="grid grid-cols-12 gap-20 mt-20">
  <div class="h-full col-span-7 flex justify-center items-center {flip ? 'order-last' : ''}">
    <div class="px-10 text-primary">
      <h1 class="text-6xl font-title mb-20">{data.title}</h1>
      <p class="text-sm opacity-60">{data.description}</p>
      <div class="py-20 flex gap-8">
        <a class="border border-[#00000040] py-4 px-12 rounded-full text-center" href="/{data.slug}">Read more</a>
      </div>
    </div>
  </div>
  <div class="col-span-5 flex justify-center items-center">
    <div class="relative">
      <div class="absolute bg-accent aspect-square w-full h-full -ml-10 -rotate-6 shadow-2xl" />
      <a href="/{data.slug}" class="block aspect-square rotate-6 shadow-xl">
        <img class="w-full h-full object-cover" src={data.image} alt=""/>
      </a>
    </div>
  </div>
</div>
