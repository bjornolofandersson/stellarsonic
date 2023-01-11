<script lang="ts">
  import { slug, post } from '@lib/MixStore';
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import EditorPanel from './EditorPanel.svelte';
  import Timeline from './Timeline.svelte';
  import TextInput from './TextInput.svelte';
  import NumberInput from './NumberInput.svelte';
  import ColorInput from './ColorInput.svelte';
  import TextArea from './TextArea.svelte';
  import PageContainer from './PageContainer.svelte';
  import Menu from './Menu.svelte';

  function onSave() {
  }

  let selected: any = undefined;

  const menuItems = ['Content', 'Assets', 'Tracks', 'Style'];
</script>

<div class="bg-stone-300 fixed w-screen h-screen">
  <div class="w-[512px] absolute mt-12 text-stone-700 font-editor">
    {#if !selected}
      <button>Create mix</button>
    {/if}
  </div>

  <PageContainer title="Mixes" onSave={onSave}>
    <slot/>
  </PageContainer>
</div>

