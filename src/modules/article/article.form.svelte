<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import type { Article } from "@modules/article/article.server";
  import type { Page } from "src/content/config";
  import Input from "src/editor/Input.svelte";
  import List from "src/editor/List.svelte";
  import ListItem from "src/editor/ListItem.svelte";
  import SplitModal from "src/editor/SplitModal.svelte";
  import TitleBar from "src/editor/TitleBar.svelte";

  //export let show: boolean = false;

  let page: Entity<Page> = {
    id: '',
    collection: 'pages',
    slug: '',
    data: {
      context: 'standalone',
      palette: ['#874356', '#C65D7B', '#F68989', '#F6E7D8'],
      draft: true,
      content: {
        collection: 'articles',
        id: '',
      },
    },
  };

  let article: Entity<Article> = {
    id: '',
    collection: 'articles',
    slug: '',
    data: {
      title: '',
      description: '',
      image: '',
    },
  }

  async function onCreate() {
    await fetch(`/pages.json`, {
      method: 'POST',
      body: JSON.stringify({...page, id: page.slug}),
    });
  }
</script>

<!--
<SplitModal bind:show={show}>
  <div slot="header">
    <TitleBar title="page">
    </TitleBar>
  </div>

  <div slot="sidebar">
    <List>
      <ListItem icon="">New page</ListItem>
    </List>
  </div>

  <div slot="footer">
    <button on:click={onCreate}>Create</button>
  </div>

  <div slot="content" class="p-8">
  -->
    <ul>
      <li>
        <label for="title" class="text-xs opacity-50">Title</label>
        <Input type="text" id="title" placeholder="Page title" bind:value={article.data.title}/>
      </li>
      <li>
        <label for="slug" class="text-xs opacity-50">Slug</label>
        <Input type="text" id="slug" placeholder="eg: my-new-page" bind:value={page.slug}/>
      </li>
    </ul>
    <!--
  </div>
</SplitModal>
-->
