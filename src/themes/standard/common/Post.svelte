<div class="bg-primary text-white relative" {...$$restProps}>
  <section class="relative text-white">
    <div class="container mx-auto px-20">
      <slot name="menu"/>
    </div>
  </section>
  <section class="relative text-white">
    <div class="container mx-auto px-20 grid">
      <div class="grid grid-cols-12 py-20">
        <div class="col-span-12 md:col-span-6 lg:col-span-6">
          <slot name="header-left"/>
        </div>
        <div class="relative col-span-12 md:col-span-6 lg:col-span-6 md:px-8 lg:pl-20">
          <slot name="header-right"/>
        </div>
      </div>
    </div>
  </section>
  <section class="relative bg-article-primary">
    <div class="container mx-auto px-8 grid grid-cols-12 text-stone-800">
      <div class="col-span-12 lg:col-span-7 p-12 py-20 lg:px-20 font-primary">
        <slot/>
      </div>
    </div>
  </section>
</div>
