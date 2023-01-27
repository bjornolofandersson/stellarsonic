<script lang="ts">
  export let collection: string;
  export let slug: string;
  export let post: any;

  const date = new Date(post.date).toDateString();
</script>

<div class="w-full overflow-hidden odd:bg-light-base-variant dark:odd:bg-dark-base-variant">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-12">
    <div class="text-right px-20">
      <time class="text-sm p-2 text-slate-600 dark:text-white" style="border-bottom: 1px solid #00000012">{date}</time>
      <ul class="flex justify-end">
        {#each post.genres as cat}
          <li class="px-1 py-2 mt-2 text-xs text-accent">{cat}</li>
        {/each}
      </ul>
    </div>
    <div class="w-full px-20 md:pl-0 lg:px-0">
      <a href="/{collection}/{slug}" class="block relative aspect-square shadow-lg">
        <img class="absolute w-full h-full object-cover" src={post.image} alt=""/>
      </a>
    </div>
    <div class="px-20 py-6 lg:py-0 md:col-span-2">
      <div class="flex">
        <div>
          <h1 class="font-title text-slate-600 dark:text-slate-200 text-3xl">{post.title}</h1>
          <h2 class="font-primary text-l text-accent">{post.subtitle}</h2>
        </div>
      </div>
      <p class="font-primary text-md py-6 opacity-60 dark:text-slate-200">{post.description}</p>
    </div>
  </div>
</div>
