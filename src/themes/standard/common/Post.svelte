<script>
  export let image;
  export let colorPrimary;

  const bgStyle=`background: url(${image}) 50% 50% / cover no-repeat; opacity: 0.02; transform: scaleX(-1); height: 350px`;
</script>

<div style={`background: ${colorPrimary}f2`} class="text-white relative">
  <div class="w-full fixed bg-fixed" style={bgStyle}>
  </div>
  <section class="relative text-white" style="height: 350px;">
    <div class="container mx-auto dark">
      <slot name="menu"/>
    </div>
  </section>
  <section class="relative text-white" style={`background: ${colorPrimary}`}>
    <div class="container mx-auto px-8 grid">
      <div class="grid grid-cols-12 py-20">
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <div class="shadow-lg overflow-hidden relative aspect-square" style="padding-bottom: 100%; margin-top: -250px">
            <img class="absolute w-full h-full object-cover" src={image} alt=""/>
          </div>
          <slot name="header-left"/>
        </div>
        <div class="relative col-span-12 md:col-span-6 lg:col-span-8 md:px-8 lg:pl-20">
          <slot name="header-right"/>
        </div>
      </div>
    </div>
  </section>
  <section class="relative bg-slate-200 dark:bg-dark-base">
    <div class="container mx-auto px-8 grid grid-cols-12 text-slate-800">
      <div class="col-span-12 lg:col-span-12 bg-slate-100 dark:bg-dark-base-variant dark:text-stone-300 article p-12 py-20 lg:px-20 font-primary">
        <slot/>
      </div>
    </div>
  </section>
</div>
