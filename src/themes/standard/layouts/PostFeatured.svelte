<script lang="ts">
  export let post: any;

  let icon = '';

  if (post.collection === 'mixes') {
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
        <slot />
        <a class="block mt-12 p-8 font-primary" href={`${post.collection}/${post.slug}`} style="border: 1px solid #00000020">Read more</a>
      </div>
    </div>
  </div>
</div>
