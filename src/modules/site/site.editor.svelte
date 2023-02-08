<script lang="ts">
  import { Action, MainPanel, Scrollable, SubPanel, Input, TitleBar} from 'src/editor';
  import LinkListItem from 'src/editor/LinkListItem.svelte';
  import List from 'src/editor/List.svelte';
  import Sidebar from 'src/editor/Sidebar.svelte';
  import { SiteStore } from './site';

  export let data: any;
  export let sitemap: any;

  let {site} = SiteStore.instance(data);
  let panel: string | undefined = undefined;

  function onSave() {}

  console.log(sitemap);

  const pageIcon = (page: any) => {
    switch (page.type) {
      case 'blog': return 'library_books';
      case 'page': return 'draft';
      case 'playlist': return 'queue_music';
      case 'container': return 'display_external_input';
    }
    return 'draft';
  }

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

<Sidebar bind:panel={panel}>
  <MainPanel>
    <div class="mt-12"></div>
    <TitleBar title="pages">
      <Action icon="settings" onClick={() => {}} />
    </TitleBar>

    <Scrollable>
      <List>
        {#each sitemap.pages as page}
          <LinkListItem icon={pageIcon(page)} url={page.path}>
            {page.path}
          </LinkListItem>
        {/each}
        </List>
      <ul class="w-full p-8">
      </ul>
    </Scrollable>
  </MainPanel>

  <SubPanel name="content">
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

  <SubPanel name="settings">
    <h2>Site</h2>
    <Input type="text" id="name" label="Title" bind:value={$site.title}/>
    <Input type="text" id="description" label="Description" bind:value={$site.description}/>
    <Input type="text" id="url" label="URL" bind:value={$site.url}/>
  </SubPanel>
</Sidebar>
