<script lang="ts">
  import Editor from '@components/editor/common/Editor.svelte';
  //import Menu from './common/Menu.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';
  import SubPanel from '@components/editor/common/SubPanel.svelte';
  import TextInput from '@components/editor/common/TextInput.svelte';
  import { settings } from '@lib/SettingsStore';

  function onSave() {}

  let selected: any = undefined;
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
    <div class="h-full flex flex-col flex-auto">
      <div class="flex mt-8">
        <button class="text-stone-400 hover:text-stone-700" on:click={() => {}}>
          <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
        </button>
      </div>

      <div class="flex justify-between text-xl">
        <h2 class="mt-8 text-lg font-[500]">SITE</h2>
        <div class="flex">
          <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4">
            <span class="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>
    </div>
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
