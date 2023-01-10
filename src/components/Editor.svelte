<script lang="ts">
  import { slug, title, subtitle, description, image, colorPrimary, colorSecondary } from '@lib/MixStore';
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import EditorPanel from './EditorPanel.svelte';

  function onSave() {
    fetch('/mixes/' + $slug + '.json', {
      method: 'PUT',
      body: JSON.stringify({
        title: $title,
        subtitle: $subtitle,
        description: $description,
        image: $image,
        colors: [$colorPrimary, $colorSecondary],
      }),
    });
  }

  let selected: any = undefined;
</script>

<div class="bg-stone-300 py-12 relative" style="height: 100vw">
  {#if selected === 'tracks'}
  <div class="w-full h-20 absolute" transition:fly={{y: -80, duration: 500, easing: quintOut}}>
    Track view
  </div>
  {/if}
  <div>
    <div class="w-[512px] absolute mt-20">
      {#if !selected}
      <div class="absolute w-full" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
        <ul class="text-center font-primary mt-20 text-2xl text-stone-500">
          <li class="py-2"><button on:click={() => selected = 'post'} class="hover:text-stone-700">Post</button></li>
          <li class="py-2"><button on:click={() => selected = 'image'} class="hover:text-stone-700">Image</button></li>
          <li class="py-2"><button on:click={() => selected = 'tracks'} class="hover:text-stone-700">Tracks</button></li>
          <li class="py-2"><button on:click={() => selected = 'colors'} class="hover:text-stone-700">Colors</button></li>
        </ul>
      </div>
      {/if}

      {#if selected === 'post'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="title" class="text-xs text-stone-700 font-primary">Title</label>
          <input id="title" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$title}>
        </div>
        <div class="p-4 px-8">
          <label for="subtitle" class="text-xs text-slate-700 font-primary">Subtitle</label>
          <input id="subtitle" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$subtitle}>
        </div>
        <div class="p-4 px-8">
          <label for="description" class="text-xs text-slate-700 font-primary">Description</label>
          <textarea id="description" class="w-full bg-[#ffffff60] p-4 font-primary" rows="20" bind:value={$description} />
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'image'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="image" class="text-xs text-stone-700 font-primary">Image</label>
          <input id="image" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$image}>
        </div>
      </EditorPanel>
      {/if}

      {#if selected === 'tracks'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
      </EditorPanel>
      {/if}

      {#if selected === 'colors'}
      <EditorPanel onBack={() => {selected = undefined}} onSave={onSave}>
        <div class="p-4 px-8">
          <label for="primaryColor" class="text-xs text-stone-700 font-primary">Primary</label>
          <input id="primaryColor" class="w-full h-12" type="color" bind:value={$colorPrimary}>
        </div>
        <div class="p-4 px-8">
          <label for="secondaryColor" class="text-xs text-stone-700 font-primary">Secondary</label>
          <input id="secondaryColor" class="w-full h-12" type="color" bind:value={$colorSecondary}>
        </div>
      </EditorPanel>
      {/if}
    </div>

  <div class="w-full shadow-lg absolute" style="width: calc(100vw - 570px); top: {selected === 'tracks' ? 8 : 2}rem; right: 2rem; transition: top 0.5s">
    <slot/>
  </div>
  </div>
</div>
