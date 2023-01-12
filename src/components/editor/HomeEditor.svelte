<script lang="ts">
  import Editor from './Editor.svelte';
  import Menu from './Menu.svelte';
  import PanelLeft from './PanelLeft.svelte';
  import PanelRight from './PanelRight.svelte';
    import TextInput from './TextInput.svelte';

  export let settings: any;

  function onSave() {}

  let selected: any = undefined;
  const menuItems = [
    {name: 'Content', icon: 'article'},
    {name: 'Settings', icon: 'settings'}, 
  ];
</script>

<Editor pageTitle="Home" onSave={onSave}>
  {#if selected === undefined}
    <PanelLeft>
      <Menu items={menuItems} onSelect={item => {selected = item}} />
    </PanelLeft>
  {/if}

  {#if selected === 'Content'}
    <PanelRight title="Content" onBack={() => {selected = undefined}}>
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
    </PanelRight>
  {/if}

  {#if selected === 'Settings'}
    <PanelRight title="Settings" onBack={() => {selected = undefined}}>
      <h2>Site</h2>
      <TextInput id="name" label="Title" bind:value={settings.title}/>
      <TextInput id="description" label="Description" bind:value={settings.description}/>
      <TextInput id="url" label="URL" bind:value={settings.url}/>
    </PanelRight>
  {/if}

  <div slot="preview"><slot/></div>
</Editor>
