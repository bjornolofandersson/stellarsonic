<script lang="ts">
  export let icon: string;
  export let onClick: (() => void) | undefined = undefined
</script>

<li on:click={onClick} on:keypress={onClick} class="-ml-8 -mr-8 px-8 py-2 h-12 flex justify-between text-stone-600 {onClick ? 'cursor-pointer' : ''}">
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
