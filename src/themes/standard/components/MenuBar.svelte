<script lang="ts">
  export let settings: any;
</script>

<div class="flex space-between text-black dark:text-white px-8 py-12">
  <div class="flex">
    <a href="/" class="mr-4 site-title text-4xl">{settings.title}</a>
  </div>
  <div class="grow"></div>
  <ul class="flex text-xs font-bold justify-right font-primary">
    {#each settings.navigation as nav}
      <li><a href={nav.path} class="mr-4 hover:border-b-2 border-black dark:border-white">{nav.name}</a></li>
    {/each}
  </ul>
</div>
