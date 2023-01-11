<script lang="ts">
  import { slug, post } from '@lib/MixStore';
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import EditorPanel from './EditorPanel.svelte';
  import Timeline from './Timeline.svelte';

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
</script>

<div class="bg-stone-300 relative" style="height: 100vw">
  {#if selected === 'tracks'}
  <div class="w-full h-20 absolute" transition:fly={{y: -80, duration: 500, easing: quintOut}}>
    <Timeline audio={$post.audio} bind:tracks={$post.tracks} onSelect={onSelectTrack} />
  </div>
  {/if}
  <div>
    <div class="w-[512px] absolute mt-24 text-stone-700 font-editor">
      {#if !selected}
      <div class="absolute w-full" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
        <ul class="text-center font-primary mt-20 text-2xl text-stone-500 font-bold">
          <li class="py-2"><button on:click={() => selected = 'post'} class="hover:text-stone-700">Post</button></li>
          <li class="py-2"><button on:click={() => selected = 'image'} class="hover:text-stone-700">Image</button></li>
          <li class="py-2"><button on:click={() => selected = 'audio'} class="hover:text-stone-700">Audio</button></li>
          <li class="py-2"><button on:click={() => selected = 'tracks'} class="hover:text-stone-700">Tracks</button></li>
          <li class="py-2"><button on:click={() => selected = 'style'} class="hover:text-stone-700">Style</button></li>
        </ul>
      </div>
      {/if}

      {#if selected === 'post'}
      <EditorPanel title="Post" onBack={() => {selected = undefined}}>
        <div class="p-4 px-8">
          <label for="title" class="text-xs">Title</label>
          <input id="title" class="w-full bg-[#ffffff60] p-2 text-stone-700" type="text" bind:value={$post.title}>
        </div>
        <div class="p-4 px-8">
          <label for="subtitle" class="text-xs">Subtitle</label>
          <input id="subtitle" class="w-full bg-[#ffffff60] p-2" type="text" bind:value={$post.subtitle}>
        </div>
        <div class="p-4 px-8">
          <label for="description" class="text-xs">Description</label>
          <textarea id="description" class="w-full bg-[#ffffff60] p-4" rows="20" bind:value={$post.description} />
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'image'}
      <EditorPanel title="Image" onBack={() => {selected = undefined}}>
        <div class="p-4 px-8">
          <label for="image" class="text-xs">Image</label>
          <input id="image" class="w-full bg-[#ffffff60] p-2" type="text" bind:value={$post.image}>
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'audio'}
      <EditorPanel title="Audio" onBack={() => {selected = undefined}}>
        <div class="p-4 px-8">
          <label for="audio" class="text-xs">Audio</label>
          <input id="audio" class="w-full bg-[#ffffff60] p-2" type="text" bind:value={$post.audio}>
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'tracks'}
      <EditorPanel title="Tracks" onBack={() => {selected = undefined}}>
        <div class="p-4 px-8">
          <label for="trackName" class="text-xs">Name</label>
          <input id="trackName" class="w-full bg-[#ffffff60] p-2" type="text"
            bind:value={$post.tracks[selectedTrack].name}>
        </div>
        <div class="p-4 px-8">
          <label for="trackArtist" class="text-xs">Artist</label>
          <input id="trackArtist" class="w-full bg-[#ffffff60] p-2" type="text"
            bind:value={$post.tracks[selectedTrack].artist}>
        </div>
        <div class="p-4 px-8">
          <label for="trackYear" class="text-xs">Year</label>
          <input id="trackYear" class="w-full bg-[#ffffff60] p-2" type="number"
            bind:value={$post.tracks[selectedTrack].year}>
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'tags'}
      <EditorPanel title="Tags" onBack={() => {selected = undefined}}>
        <ul>
        </ul>
      </EditorPanel>
      {/if}

      {#if selected === 'style'}
      <EditorPanel title="Style" onBack={() => {selected = undefined}}>
        <div class="p-4 px-8">
          <label for="primaryColor" class="text-xs">Primary</label>
          <input id="primaryColor" class="w-full h-12" type="color" bind:value={$post.colors[0]}>
        </div>
        <div class="p-4 px-8">
          <label for="secondaryColor" class="text-xs">Secondary</label>
          <input id="secondaryColor" class="w-full h-12" type="color" bind:value={$post.colors[1]}>
        </div>
      </EditorPanel>
      {/if}
    </div>

  <div class="w-full shadow-lg absolute" style="width: calc(100vw - 570px); top: {selected === 'tracks' ? 6 : 2}rem; right: 2rem; transition: top 0.3s">
    <div class="w-full bg-white px-8 py-2 flex justify-between">
      <div class="font-editor">
        <button class="p-2 text-stone-500 bg-white hover:text-stone-700" on:click={onSave}>
          <span class="material-symbols-outlined text-3xl">save_as</span>
        </button>
      </div>
      <div class="font-editor mt-4">{$post.title}</div>
      <div class="font-editor">
        <button class="p-2 text-stone-500 bg-white hover:text-stone-700" on:click={() => active = !active}>
          <span class="material-symbols-outlined text-3xl">fullscreen</span>
        </button>
      </div>
    </div>
    <slot/>
  </div>
  </div>
</div>
