<script lang="ts">
  import Editor from './common/Editor.svelte';
  //import Menu from './common/Menu.svelte';
  import MainPanel from './common/MainPanel.svelte';
  import SubPanel from './common/SubPanel.svelte';
  import TextInput from './common/TextInput.svelte';
  import { settings } from '@lib/SettingsStore';

  function onSave() {}

  let selected: any = undefined;
  const menuItems = [
    {name: 'Content', icon: 'article'},
    {name: 'Settings', icon: 'settings'}, 
  ];
  const contentCollections = [
    {
      name: 'Mixes',
      icon: 'queue_music',
      href: '/mixes',
      description: 'Posts with a single audio file annotated with several tracks to form a playlist',
    },
    {
      name: 'Albums / Playlists',
      icon: 'library_music',
      description: 'Posts with a multiple audio files annotated as tracks to form a playlist',
    },
    {
      name: 'Recordings',
      icon: 'music_note',
      description: 'Posts with a single audio file',
    },
    {
      name: 'Podcasts',
      icon: 'podcasts',
      description: 'Posts with a single audio file with or without timestamp annotations',
    },
  ];
</script>

<Editor pageTitle={$settings.title} onSave={onSave}>
  <MainPanel show={selected === undefined}>
    <!--<Menu items={menuItems} onSelect={item => {selected = item}} />-->
  </MainPanel>

  <SubPanel show={selected === 'Content'} title="Content" onBack={() => {selected = undefined}}>
    {#each contentCollections as item}
    <div class="mb-4">
      <div class="border-b border-[#00000020] p-8">
        <h1 class="text-2xl">
          <span class="mr-4 material-symbols-outlined">{item.icon}</span>
          <a class="text-cyan-700" href={item.href}>{item.name}</a>
        </h1>
        <p class="pl-12 mt-4 text-sm">{item.description}</p>
      </div>
    </div>
    {/each}
  </SubPanel>

  <SubPanel show={selected === 'Settings'} title="Settings" onBack={() => {selected = undefined}}>
    <h2>Site</h2>
    <TextInput id="name" label="Title" bind:value={$settings.title}/>
    <TextInput id="description" label="Description" bind:value={$settings.description}/>
    <TextInput id="url" label="URL" bind:value={$settings.url}/>
  </SubPanel>

  <div slot="preview"><slot/></div>
</Editor>
