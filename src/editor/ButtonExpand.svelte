<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import Button from './Button.svelte';

  export let label: string;
  export let icon: string | undefined = undefined;

  let expanded = false;
</script>

<Button actionIcon={expanded ? 'expand_less' : 'expand_more'} label={label} icon={icon} on:click={() => {expanded = !expanded}}>
  <slot name="value" slot="value"/>
</Button>
{#if expanded}
  <div class="bg-[#00000007] px-8 py-4 -ml-8 -mr-8" transition:slide={{ duration: 200, easing: quintOut }}>
    <slot/>
  </div>
{/if}
