<script lang="ts">
  import { post } from '@lib/MixStore';
  import PanelRight from './PanelRight.svelte';
  import Timeline from './Timeline.svelte';
  import TextInput from './TextInput.svelte';
  import NumberInput from './NumberInput.svelte';
  import ColorInput from './ColorInput.svelte';
  import Menu from './Menu.svelte';
  import Editor from './Editor.svelte';
  import PanelLeft from './PanelLeft.svelte';
  import Button from './Button.svelte';
  import AssetsForm from './forms/AssetsForm.svelte';
  import ContentForm from './forms/ContentForm.svelte';

  export let slug: string;
  export let assets: string[];

  let selectedTrack = 0;

  function onSave() {
    fetch('/mixes/' + slug + '.json', {
      method: 'PUT',
      body: JSON.stringify($post),
    });
  }

  function selectImage(url: string) {
    $post.image = url;
  }

  let images = assets.filter(file => ['jpg', 'png'].includes(file.split('.').pop() as string));
  console.log(images);

  function onSelectTrack(track: number) {
    selectedTrack = track;
  }

  let selected: any = undefined;

  const menuItems = [
    {name: 'Content', icon: 'article'},
    {name: 'Assets', icon: 'perm_media'}, 
    {name: 'Tracks', icon: 'queue_music'},
    {name: 'Style', icon: 'format_paint'}
  ];
</script>

<Editor bind:pageTitle={$post.title} onSave={onSave}>
  <ul class="my-8 flex mx-8 border-b border-stone-400">
    <li class="px-2 text-stone-800"><a href="/">Home</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-stone-800"><a href="/mixes">Mixes</a></li>
    <li class="px-2">/</li>
    <li class="px-2 text-stone-500">{slug}</li>
  </ul>

  <PanelLeft show={selected === undefined}>
    <div class="my-4 flex gap-4">
      <Button label="Draft" icon="edit_document" onClick={() => {}}/>
      <Button label="Publish" icon="send" onClick={() => {}}/>
    </div>

    <Menu items={menuItems} onSelect={item => {selected = item}}/>
  </PanelLeft>

  <PanelRight show={selected === 'Content'} title="Content" onBack={() => {selected = undefined}}>
    <ContentForm bind:post={$post} />
  </PanelRight>

  <PanelRight show={selected === 'Assets'} title="Assets" onBack={() => {selected = undefined}}>
    <AssetsForm bind:post={$post} assets={assets} />
  </PanelRight>

  <PanelRight show={selected === 'Tracks'} title="Tracks" onBack={() => {selected = undefined}}>
    <TextInput id="track-name" label="Name" bind:value={$post.tracks[selectedTrack].name} />
    <TextInput id="track-artist" label="Artist" bind:value={$post.tracks[selectedTrack].artist} />
    <NumberInput id="track-year" label="Year" bind:value={$post.tracks[selectedTrack].year} />
  </PanelRight>

  <PanelRight show={selected === 'Tags'} title="Tags" onBack={() => {selected = undefined}}>
    <ul>
    </ul>
  </PanelRight>

  <PanelRight show={selected === 'Style'} title="Style" onBack={() => {selected = undefined}}>
    <ColorInput id="color-primary" label="Primary color" bind:value={$post.colors[0]} />
    <ColorInput id="color-secondary" label="Secondary color" bind:value={$post.colors[1]} />
  </PanelRight>

  <div slot="preview"><slot/></div>
</Editor>

