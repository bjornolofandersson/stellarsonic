<script lang="ts">
  import Editor from './common/Editor.svelte';
  import SubPanel from './common/SubPanel.svelte';
  import Menu from './common/Menu.svelte';
  import MainPanel from './common/MainPanel.svelte';
  import Breadcrumbs from './common/Breadcrumbs.svelte';
  import PostForm from './forms/PostForm.svelte';

  export let collection: string;
  export let slug: string;
  export let data: any;
  export let assets: string[];

  import {createPostEditor} from './factory';

  let {editor, layout} = createPostEditor(collection, slug, data, assets);
  const post = editor.post;

  let selected: any = undefined;

  const breadcrumbs = [
    {label: 'Home', href: '/'},
    {label: editor.collection, href: `/${editor.collection}`},
    {label: editor.slug},
  ]
</script>

<Editor 
  bind:pageTitle={$post.title}
  onSave={() => editor.save()}
  showPreview={layout.find(i => i.name === selected && i.view !== undefined) === undefined}
>
  <Breadcrumbs trail={breadcrumbs} />

  <MainPanel show={selected === undefined}>
    <PostForm>
      <Menu items={layout} onSelect={item => {selected = item}}/>
    </PostForm>
  </MainPanel>

  {#each layout as item}
    {#if item.panel}
      <SubPanel show={selected === item.name} title={item.name} onBack={() => {selected = undefined}}>
        <svelte:component this={item.panel} bind:post={$post} bind:context={editor} />
      </SubPanel>
    {/if}
    {#if item.view && selected === item.name}
      <div class="fixed top-0 right-0 bottom-0 left-[512px] bg-stone-800">
        <svelte:component this={item.view} bind:post={$post} bind:context={editor} />
      </div>
    {/if}
  {/each}

  <div slot="preview"><slot/></div>
</Editor>