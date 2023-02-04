<script lang="ts">
  import { Accordion, AccordionItem, Action, Editor, MainPanel, Scrollable, SubPanel, Input, TitleBar} from 'src/editor';
  import { SiteStore } from './site';

  export let data: any;

  let {site} = SiteStore.instance(data);
  let panel: string | undefined = undefined;

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

<Editor pageTitle={$site.title} onSave={onSave} bind:panel={panel}>
  <MainPanel>
    <TitleBar title="pages">
      <Action icon="settings" onClick={() => {}} />
    </TitleBar>

    <Scrollable>
      <Accordion>
        {#each $site.pages as page}
          <AccordionItem icon="line_start" name={page.path}>
            <h1>{page.type}</h1>
            <a href={page.path}>/{page.path}</a>
          </AccordionItem>
        {/each}
      </Accordion>
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

  <div slot="preview"><slot/></div>
</Editor>
