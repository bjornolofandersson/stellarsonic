<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getContext } from "svelte";
	import { PANELS } from './Editor.svelte';
  
	const { selected, registerPanel } = getContext<any>(PANELS);

  registerPanel('main');
</script>


{#if $selected === 'main'}
  <div class="absolute w-full h-screen px-8" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
    <div class="h-full flex flex-col flex-auto">
      <slot/>
    </div>
  </div>
{/if}
