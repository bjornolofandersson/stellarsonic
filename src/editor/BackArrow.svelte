<script lang="ts">
  export let onClick: (() => void) | undefined = undefined
  export let url: string | undefined = undefined;
</script>

<div class="flex mt-8">
  {#if onClick}
    <button class="text-stone-400 hover:text-stone-700" on:click={onClick}>
      <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
    </button>
  {:else}
    <a class="text-stone-400 hover:text-stone-700" href={url}>
      <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
    </a>
  {/if}
</div>
