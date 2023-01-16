<script lang="ts">
  export let trail: any[];
</script>

<ul class="my-8 flex mx-8 border-b border-stone-400">
  {#each trail as crumb}
    {#if crumb.href}
      <li class="px-2 text-stone-800"><a href={crumb.href}>{crumb.label}</a></li>
      <li class="px-2">/</li>
    {:else}
      <li class="px-2 text-stone-500">{crumb.label}</li>
    {/if}
  {/each}
</ul>
