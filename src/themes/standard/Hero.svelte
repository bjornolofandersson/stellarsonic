<script lang="ts">
  import MenuBar from "./MenuBar.svelte";

  export let data: any;
  export let page: any;
  export let navigation: any;
</script>

<!--
<div class="container mx-auto {page.menu}" style="height: 600px; background-color: {page.palette[0]}">
  <MenuBar sitemap={navigation} />
  <div class="grid grid-cols-12 px-20">
    <div class="col-start-1 col-span-5 mt-20">
      <h1 class="text-4xl py-2 font-title" style="color: {page.palette[3]}">{data.title}</h1>
      <p class="text-sm py-2 mb-8">{data.description}</p>
      <a class="p-4 text-white" style="background-color: {page.palette[1]}" href="{data.cta.url}">{data.cta.label}</a>
    </div>
  </div>
</div>
-->
