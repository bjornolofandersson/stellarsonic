<script lang="ts">
  export let post: any;
  export let collection: string;
  export let slug: string;

  let icon = '';

  if (collection === 'mixes') {
    icon = 'graphic_eq';
  }
</script>

<div class="container mx-auto">
  <div class="w-full overflow-hidden">
    <div class="grid grid-cols-12 py-12">
      <div class="col-span-12 lg:col-span-6">
        <img class="w-full h-full object-cover" src={post.image} alt=""/>
      </div>
      <div class="bg-white col-span-12 lg:col-span-6 z-10 p-20 relative">
        <span class="material-symbols-outlined absolute top-0 right-0 p-8">
          {icon}
        </span>
        <h1 class="text-6xl font-title">{post.title}</h1>
        <h2 class="text-xl text-accent">{post.subtitle}</h2>
        <p class="text-lg block mt-12 font-primary">{post.description}</p>
        <a class="block mt-12 p-8 font-primary" href={`${collection}/${slug}`} style="border: 1px solid #00000020">Read more</a>
      </div>
    </div>
  </div>
</div>
