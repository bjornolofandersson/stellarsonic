<script>

</script>

<div class="bg-white">
  <slot name="header"/>
  <slot name="featured"/>

  {#if $$slots.mixes}
    <section class="container mx-auto">
      <div class="text-xl py-20 flex">
        <span class="material-symbols-outlined mr-4">graphic_eq</span>
        <span class="block font-primary">Recent mixtapes</span>
      </div>

      <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
        <slot name="mixes"/>
      </div>
    </section>
  {/if}
</div>
