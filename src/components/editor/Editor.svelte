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
  let active = false;

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

  const menuItems = ['Post', 'Image', 'Audio', 'Tracks', 'Style'];
</script>

<div class="bg-stone-300 relative" style="height: 100vw">
  {#if selected === 'Tracks'}
  <div class="w-full h-20 absolute" transition:fly={{y: -80, duration: 500, easing: quintOut}}>
    <Timeline audio={$post.audio} bind:tracks={$post.tracks} onSelect={onSelectTrack} />
  </div>
  {/if}
  <div>
    <div class="w-[512px] absolute mt-24 text-stone-700 font-editor">
      {#if !selected}
      <div class="absolute w-full" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
        <ul class="text-center font-primary mt-20 text-2xl text-stone-500 font-bold">
          {#each menuItems as item}
            <li class="py-2">
              <button on:click={() => selected = item} class="hover:text-stone-700">{item}</button>
            </li>
          {/each}
        </ul>
      </div>
      {/if}

      {#if selected === 'Post'}
      <EditorPanel title="Post" onBack={() => {selected = undefined}}>
        <TextInput id="title" label="Title" bind:value={$post.title} />
        <TextInput id="subtitle" label="Subtitle" bind:value={$post.subtitle} />
        <TextArea id="description" label="Description" rows={20} bind:value={$post.description} />
      </EditorPanel>
      {/if}

      {#if selected === 'Image'}
      <EditorPanel title="Image" onBack={() => {selected = undefined}}>
        <div class="p-8 grid grid-cols-3">
          <img class="w-full" src={$post.image} alt=""/>
        </div>
        <TextInput id="image" label="URL" bind:value={$post.image} />
      </EditorPanel>
      {/if}

      {#if selected === 'Audio'}
      <EditorPanel title="Audio" onBack={() => {selected = undefined}}>
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
        <ColorInput id="color-primary" label="Primary" bind:value={$post.colors[0]} />
        <ColorInput id="color-secondary" label="Secondary" bind:value={$post.colors[1]} />
      </EditorPanel>
      {/if}
    </div>

    <PageContainer bind:title={$post.title} onSave={onSave}>
      <slot/>
    </PageContainer>
  </div>
</div>

