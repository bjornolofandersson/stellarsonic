<script lang="ts">
  import { slug, post } from '@lib/MixStore';
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import EditorPanel from './EditorPanel.svelte';
  import Timeline from './Timeline.svelte';

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
</script>

<div class="bg-stone-300 relative" style="height: 100vw">
  {#if selected === 'tracks'}
  <div class="w-full h-20 absolute" transition:fly={{y: -80, duration: 500, easing: quintOut}}>
    <Timeline audio={$post.audio} bind:tracks={$post.tracks} onSelect={onSelectTrack} />
  </div>
  {/if}
  <div>
    <div class="w-[512px] absolute mt-24">
      {#if !selected}
      <div class="absolute w-full" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
        <ul class="text-center font-primary mt-20 text-2xl text-stone-500">
          <li class="py-2"><button on:click={() => selected = 'post'} class="hover:text-stone-700">Post</button></li>
          <li class="py-2"><button on:click={() => selected = 'image'} class="hover:text-stone-700">Image</button></li>
          <li class="py-2"><button on:click={() => selected = 'audio'} class="hover:text-stone-700">Audio</button></li>
          <li class="py-2"><button on:click={() => selected = 'tracks'} class="hover:text-stone-700">Tracks</button></li>
          <li class="py-2"><button on:click={() => selected = 'colors'} class="hover:text-stone-700">Colors</button></li>
        </ul>
      </div>
      {/if}

      {#if selected === 'post'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="title" class="text-xs text-stone-700 font-primary">Title</label>
          <input id="title" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$post.title}>
        </div>
        <div class="p-4 px-8">
          <label for="subtitle" class="text-xs text-slate-700 font-primary">Subtitle</label>
          <input id="subtitle" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$post.subtitle}>
        </div>
        <div class="p-4 px-8">
          <label for="description" class="text-xs text-slate-700 font-primary">Description</label>
          <textarea id="description" class="w-full bg-[#ffffff60] p-4 font-primary" rows="20" bind:value={$post.description} />
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'image'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="image" class="text-xs text-stone-700 font-primary">Image</label>
          <input id="image" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$post.image}>
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'audio'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="audio" class="text-xs text-stone-700 font-primary">Audio</label>
          <input id="audio" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$post.audio}>
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'tracks'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="trackName" class="text-xs text-stone-700 font-primary">Name</label>
          <input id="trackName" class="w-full bg-[#ffffff60] p-2 font-primary" type="text"
            bind:value={$post.tracks[selectedTrack].name}>
        </div>
        <div class="p-4 px-8">
          <label for="trackArtist" class="text-xs text-stone-700 font-primary">Artist</label>
          <input id="trackArtist" class="w-full bg-[#ffffff60] p-2 font-primary" type="text"
            bind:value={$post.tracks[selectedTrack].artist}>
        </div>
        <div class="p-4 px-8">
          <label for="trackYear" class="text-xs text-stone-700 font-primary">Year</label>
          <input id="trackYear" class="w-full bg-[#ffffff60] p-2 font-primary" type="number"
            bind:value={$post.tracks[selectedTrack].year}>
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'tags'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <ul>
        </ul>
      </EditorPanel>
      {/if}

      {#if selected === 'colors'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="primaryColor" class="text-xs text-stone-700 font-primary">Primary</label>
          <input id="primaryColor" class="w-full h-12" type="color" bind:value={$post.colors[0]}>
        </div>
        <div class="p-4 px-8">
          <label for="secondaryColor" class="text-xs text-stone-700 font-primary">Secondary</label>
          <input id="secondaryColor" class="w-full h-12" type="color" bind:value={$post.colors[1]}>
        </div>
      </EditorPanel>
      {/if}
    </div>

  <div class="w-full shadow-lg absolute" style="width: calc(100vw - 570px); top: {selected === 'tracks' ? 6 : 2}rem; right: 2rem; transition: top 0.5s">
    <slot/>
  </div>
  </div>
</div>
