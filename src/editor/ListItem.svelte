<script lang="ts">
  export let icon: string;
  export let active: boolean = false;
  export let onClick: (() => void) | undefined = undefined
</script>

<li on:click={onClick} on:keypress={onClick} class="-ml-8 -mr-8 px-8 py-4 flex justify-between text-sm  {onClick ? 'cursor-pointer' : ''} {active ? 'bg-stone-500 text-stone-50' : 'hover:bg-[#00000010] text-stone-600'}">
  {#if onClick}
  <div class="flex">
    <span class="mr-4 material-symbols-outlined">{icon}</span>
    <slot/>
  </div>
  <div class="flex">
    <slot name="actions"/>
  </div>
  {:else}
  <div class="flex">
    <span class="mr-4 material-symbols-outlined">{icon}</span>
    <slot/>
  </div>
  <div class="flex">
    <slot name="actions"/>
  </div>
  {/if}
</li>
