<script lang="ts">
  import Input from "src/editor/Input.svelte";
  import List from "src/editor/List.svelte";
  import ListItem from "src/editor/ListItem.svelte";
  import SplitModal from "src/editor/SplitModal.svelte";
  import TitleBar from "src/editor/TitleBar.svelte";

  export let show: boolean = false;

  let page = {
    title: '',
    slug: '',
    context: 'page',
    content: {
      collection: 'mixes',
      id: '',
      type: 'playlist',
    }
  };
  let mixes: any[] = [];

  async function loadMixes() {
    const resp = await fetch('/mixes.json')
    mixes = await resp.json();
  }

  async function onCreate() {
    await fetch(`/pages.json`, {
      method: 'POST',
      body: JSON.stringify(page),
    });
  }

  function onSelect(mix: any) {
    page.title = mix.data.title;
    page.slug = mix.slug;
    page.content.id = mix.id;
  }

  loadMixes();
</script>

<SplitModal bind:show={show}>
  <div slot="header">
    <TitleBar title="mix">
    </TitleBar>
  </div>

  <div slot="sidebar">
    <List>
      <ListItem onClick={() => {console.log('click')}} icon="add_circle">Create new</ListItem>
    </List>
    <span class="text-sm my-8 block">or use existing content</span>
    <List>
      {#each mixes as mix}
        <ListItem onClick={() => onSelect(mix)} icon="queue_music">{mix.data.title}</ListItem>
      {/each}
    </List>
  </div>

  <div slot="footer">
    <button on:click={onCreate}>Create</button>
  </div>

  <div slot="content" class="p-8">
    <ul>
      <li>
        <label for="title" class="text-xs opacity-50">Title</label>
        <Input type="text" id="title" placeholder="Page title" bind:value={page.title}/>
      </li>
      <li>
        <label for="slug" class="text-xs opacity-50">Slug</label>
        <Input type="text" id="slug" placeholder="eg: my-new-page" bind:value={page.slug}/>
      </li>
    </ul>
  </div>
</SplitModal>