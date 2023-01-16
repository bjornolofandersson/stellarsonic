<script lang="ts">
  import Editor from './Editor.svelte';
  import Menu from './Menu.svelte';
  import MainPanel from './MainPanel.svelte';
  import SubPanel from './SubPanel.svelte';
  import TextInput from './TextInput.svelte';
  import { settings } from '@lib/SettingsStore';

  function onSave() {}

  let selected: any = undefined;
  const menuItems = [
    {name: 'Content', icon: 'article'},
    {name: 'Settings', icon: 'settings'}, 
  ];
</script>

<Editor pageTitle={$settings.title} onSave={onSave}>
  <MainPanel show={selected === undefined}>
    <Menu items={menuItems} onSelect={item => {selected = item}} />
  </MainPanel>

  <SubPanel show={selected === 'Content'} title="Content" onBack={() => {selected = undefined}}>
    <div class="mb-4">
      <div class="border-b border-[#00000020] p-8">
        <h1 class="text-2xl">
          <span class="mr-4 material-symbols-outlined">queue_music</span>
          <a class="text-cyan-700" href="/mixes">Mixes</a>
        </h1>
        <p class="pl-12 mt-4 text-sm">Posts with a single audio file annotated with several tracks to form a playlist</p>
      </div>
    </div>

    <div class="mb-4">
      <div class="border-b border-[#00000020] p-8">
        <h1 class="text-2xl">
          <span class="mr-4 material-symbols-outlined">library_music</span>
          Albums / Playlists
        </h1>
        <p class="pl-12 mt-4 text-sm">Posts with a multiple audio files annotated as tracks to form a playlist</p>
      </div>
    </div>

    <div class="mb-4">
      <div class="border-b border-[#00000020] p-8">
        <h1 class="text-2xl">
          <span class="mr-4 material-symbols-outlined">music_note</span>
          Recordings
        </h1>
        <p class="pl-12 mt-4 text-sm">Posts with a single audio file</p>
      </div>
    </div>

    <div class="mb-4">
      <div class="border-b border-[#00000020] p-8">
        <h1 class="text-2xl">
          <span class="mr-4 material-symbols-outlined">podcasts</span>
          Podcasts
        </h1>
        <p class="pl-12 mt-4 text-sm">Posts with a single audio file with or without timestamp annotations</p>
      </div>
    </div>
  </SubPanel>

  <SubPanel show={selected === 'Settings'} title="Settings" onBack={() => {selected = undefined}}>
    <h2>Site</h2>
    <TextInput id="name" label="Title" bind:value={$settings.title}/>
    <TextInput id="description" label="Description" bind:value={$settings.description}/>
    <TextInput id="url" label="URL" bind:value={$settings.url}/>
  </SubPanel>

  <div slot="preview"><slot/></div>
</Editor>
