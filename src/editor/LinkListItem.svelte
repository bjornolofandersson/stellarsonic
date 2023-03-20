<script lang="ts">
  export let icon: string;
  export let url: string | undefined;
  export let active: boolean = false;
</script>

<li
  class="-ml-8 -mr-8 px-8 py-4 flex justify-between text-sm {active ? 'bg-stone-500 text-stone-50' : 'hover:bg-[#00000007]'}">
  <a class="flex gap-4" href={url}>
    <span class="material-symbols-outlined">{icon}</span>
    <slot/>
  </a>
  {#if active}
    <div class="flex">
      <slot name="actions"/>
    </div>
  {/if}
</li>
