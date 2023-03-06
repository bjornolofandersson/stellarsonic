<script lang="ts">
  export let site: any;
</script>

<div class="" {...$$restProps}>
  <section class="bg-primary text-primary">
    <div class="container mx-auto px-20">
      <div class="flex space-between text-primary py-12">
        <div class="flex">
          <a href="/" class="mr-4 site-title text-4xl">{site.title}</a>
        </div>
        <div class="grow"></div>
        <ul class="flex text-xs font-bold justify-right font-title">
          {#each site.navigation as link}
            <li><a href={link.url} class="mr-8 hover:border-b-2 border-primary">{link.title}</a></li>
          {/each}
        </ul>
      </div>
    </div>

    <slot/>
  </section>
</div>
