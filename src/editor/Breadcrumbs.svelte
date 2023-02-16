<script lang="ts">
  export let slug: string;

  const parts = slug.split('/');
  const trail = [{href: '/', label: 'home'}];

  let href = '';
  for (let p of parts) {
    href = href + '/' + p;
    trail.push({href, label: p});
  }
</script>

<ul class="text-sm flex">
  {#each trail as crumb, i}
    {#if i < trail.length - 1}
      <li class="px-1 text-stone-800"><a href={crumb.href}>{crumb.label}</a></li>
      <li class="px-1">/</li>
    {:else}
      <li class="px-1 text-stone-500">{crumb.label}</li>
    {/if}
  {/each}
</ul>
