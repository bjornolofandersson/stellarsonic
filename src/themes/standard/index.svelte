<script lang="ts">
  import MenuBar from "./MenuBar.svelte";

  export let data: any;
  export let page: any;
  export let navigation: any;
  export let previews: any;

  const preview = previews[0];
</script>

<div class="bg-[#e9e6df] h-screen">
  <div class="flex flex-col container mx-auto px-20">
    <div class="col-span-12">
      <MenuBar sitemap={navigation} />
    </div>
    <div class="grid grid-cols-12 gap-20 mt-20">

    <div class="h-full col-span-7 px-20 flex justify-center items-center">
      <div class="">
        <h1 class="text-6xl font-title mb-20">{preview.title}</h1>
        <p class="text-sm opacity-40 font-text">{preview.description}</p>
      </div>
    </div>
    <div class="col-span-5 flex justify-center items-center">
      <div class="relative">
        <div class="absolute bg-white aspect-square w-full h-full -ml-20 -rotate-6 shadow-2xl" />
        <a href="/{preview.slug}" class="block aspect-square rotate-6 shadow-xl">
          <img class="w-full h-full object-cover" src={preview.image} alt=""/>
        </a>
      </div>
    </div>
    </div>
    <div class="grid grid-cols-12 h-full">
      <div class="px-20 py-20 col-span-6 flex gap-8">
        <a class="border border-[#00000040] p-6 font-title w-full rounded-full text-center" href="">Read more</a>
        <a class="border border-[#00000040] p-6 font-title w-full rounded-full text-center" href="">Browse Mixtapes</a>
      </div>
    </div>
  </div>
</div>
