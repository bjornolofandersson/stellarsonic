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

  let selectedTrack = 0;

  function onSave() {
    fetch('/mixes/' + $slug + '.json', {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  }

  function onSelectTrack(track: number) {
    selectedTrack = track;
  }

  let selected: any = undefined;

  const menuItems = ['Content', 'Assets', 'Tracks', 'Style'];
</script>

<div class="bg-stone-300 fixed w-screen h-screen">
  <!--
  {#if selected === 'Tracks'}
  <div class="w-full h-20 absolute" transition:fly={{y: -80, delay: 300, duration: 500, easing: quintOut}}>
    <Timeline audio={$post.audio} bind:tracks={$post.tracks} onSelect={onSelectTrack} />
  </div>
  {/if}
-->

  <div class="w-[512px] absolute mt-12 text-stone-700 font-editor">
    {#if !selected}
    <div class="absolute w-full px-8" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
      <h2 class="mt-8 text-xl border-b border-stone-400">Post</h2>
      <ul class="font-primary mt-8 text-2xl text-stone-500 font-bold">
        {#each menuItems as item}
          <li class="py-2">
            <button on:click={() => selected = item} class="hover:text-stone-700">{item}</button>
          </li>
        {/each}
      </ul>
      <h2 class="mt-8 text-xl border-b border-stone-400">Site</h2>
    </div>
    {/if}

    {#if selected === 'Content'}
    <EditorPanel title="Content" onBack={() => {selected = undefined}}>
      <TextInput id="title" label="Title" bind:value={$post.title} />
      <TextInput id="subtitle" label="Subtitle" bind:value={$post.subtitle} />
      <TextArea id="description" label="Description" rows={20} bind:value={$post.description} />
    </EditorPanel>
    {/if}

    {#if selected === 'Assets'}
    <EditorPanel title="Assets" onBack={() => {selected = undefined}}>
      <h2 class="mt-8 text-xl border-b border-stone-400">Image</h2>
      <div class="py-4 grid grid-cols-3">
        <img class="w-full" src={$post.image} alt=""/>
      </div>
      <TextInput id="image" label="URL" bind:value={$post.image} />

      <h2 class="mt-8 text-xl border-b border-stone-400">Audio</h2>
      <TextInput id="audio" label="URL" bind:value={$post.audio} />
    </EditorPanel>
    {/if}

    {#if selected === 'Tracks'}
    <EditorPanel title="Tracks" onBack={() => {selected = undefined}}>
      <TextInput id="track-name" label="Name" bind:value={$post.tracks[selectedTrack].name} />
      <TextInput id="track-artist" label="Artist" bind:value={$post.tracks[selectedTrack].artist} />
      <NumberInput id="track-year" label="Year" bind:value={$post.tracks[selectedTrack].year} />
    </EditorPanel>
    {/if}

    {#if selected === 'Tags'}
    <EditorPanel title="Tags" onBack={() => {selected = undefined}}>
      <ul>
      </ul>
    </EditorPanel>
    {/if}

    {#if selected === 'Style'}
    <EditorPanel title="Style" onBack={() => {selected = undefined}}>
      <ColorInput id="color-primary" label="Primary color" bind:value={$post.colors[0]} />
      <ColorInput id="color-secondary" label="Secondary color" bind:value={$post.colors[1]} />
    </EditorPanel>
    {/if}
  </div>

  <PageContainer bind:title={$post.title} onSave={onSave}>
    <slot/>
  </PageContainer>
</div>

