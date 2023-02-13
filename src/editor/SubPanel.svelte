<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { getContext } from "svelte";
	import { PANELS } from './Sidebar.svelte';
  import BackArrow from "./BackArrow.svelte";
  import TitleBar from "./TitleBar.svelte";
  
  export let name: string;

	const { registerPanel, selectPanel, selected } = getContext<any>(PANELS);

	registerPanel(name);
</script>

{#if $selected === name}
  <div class="absolute w-full px-8" transition:fly={{ x: 512, duration: 500, easing: quintOut }}>
    <BackArrow onClick={() => selectPanel('main')} />

    <TitleBar title={name}>
      <slot name="actions"/>
    </TitleBar>
    <slot/>
  </div>
{/if}
