<script lang="ts">
  import { post } from '@lib/MixStore';
  import EditorPanel from './EditorPanel.svelte';
  import Timeline from './Timeline.svelte';
  import TextInput from './TextInput.svelte';
  import NumberInput from './NumberInput.svelte';
  import ColorInput from './ColorInput.svelte';
  import TextArea from './TextArea.svelte';
  import Menu from './Menu.svelte';
  import Editor from './Editor.svelte';

  export let slug: string;

  let selectedTrack = 0;

  function onSave() {
    fetch('/mixes/' + slug + '.json', {
      method: 'PUT',
      body: JSON.stringify($post),
    });
  }

  function onSelectTrack(track: number) {
    selectedTrack = track;
  }

  let selected: any = undefined;

  const menuItems = ['Content', 'Assets', 'Tracks', 'Style'];
</script>

<Editor bind:pageTitle={$post.title} onSave={onSave}>
  <ul class="my-8 flex mx-8 border-b border-stone-400">
    <li class="px-2 text-cyan-700"><a href="/">Home</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-cyan-700"><a href="/mixes">Mixes</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-stone-500">{slug}</li>
  </ul>

  {#if !selected}
    <Menu items={menuItems} onSelect={item => {selected = item}}/>
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

  <div slot="preview"><slot/></div>
</Editor>

