<script lang="ts">
  export let data: any;
</script>

<div class="container mx-auto bg-white grid grid-cols-3 px-20 gap-20">
  {#each data as item}
    <div class="py-20">
      <a href="/{item.slug}" class="block relative aspect-square shadow-lg">
        <img class="absolute w-full h-full object-cover" src={item.image} alt=""/>
      </a>
      <h1 class="text-3xl font-title py-4 mt-4">{item.title}</h1>
      <p class="text-sm opacity-50">{item.description}</p>
    </div>
  {/each}
</div>
