<script lang="ts">
  import MenuBar from "./MenuBar.svelte";

  export let data: any;
  export let page: any;
  export let navigation: any;
</script>

<div class="container mx-auto {page.menu}" style="height: 500px; background-color: {page.palette[0]}">
  <MenuBar sitemap={navigation} />
  <div class="grid grid-cols-12">
    <div class="col-start-2 col-span-4 mt-20">
      <h1 class="text-4xl mb-8" style="color: {page.palette[3]}">{data.title}</h1>
      <a class="p-4 text-white" style="background-color: {page.palette[1]}" href="{data.cta.url}">{data.cta.label}</a>
    </div>
  </div>
</div>
