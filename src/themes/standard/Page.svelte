<script lang="ts">
    import MenuBar from "./MenuBar.svelte";

  export let page: any;
  export let sitemap: any;
</script>

<div class="bg-white container mx-auto min-h-full">
  <MenuBar sitemap={sitemap} />
  <div class="page-content px-8">
    <slot/>
  </div>
</div>
