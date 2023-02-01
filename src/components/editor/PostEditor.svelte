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

  /*
  let {editor, layout, views} = createPostEditor(collection, slug, data, assets);
  const post = editor.post;

  let selected: any = undefined;

  const breadcrumbs = [
    {label: 'Home', href: '/'},
    {label: editor.collection, href: `/${editor.collection}`},
    {label: editor.slug},
  ]
  */
</script>

<!--
<Editor 
  bind:pageTitle={$post.title}
  onSave={() => editor.save()}
  showPreview={selected === undefined}
>

  <MainPanel show={selected === undefined}>
    <div class="flex">
      <button class="text-stone-400 hover:text-stone-700" on:click={() => {}}>
        <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
      </button>
    </div>

    <div class="flex justify-between text-xl">
      <h2 class="mt-8 text-lg font-[500]">{$post.title.toUpperCase()}</h2>
      <div class="flex">
        <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4">
          <span class="material-symbols-outlined">tune</span>
        </button>
        {#each views as view}
          <button on:click={() => {selected = view.name}} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4">
            <span class="material-symbols-outlined">{view.icon}</span>
          </button>
        {/each}
      </div>
    </div>

    <Menu bind:post={$post} bind:context={editor} items={layout} onSelect={item => {selected = item}}/>
  </MainPanel>

  {#each views as item}
    {#if item.panel}
      <SubPanel show={selected === item.name} title={item.name} onBack={() => {selected = undefined}}>
        <svelte:component this={item.panel} bind:post={$post} bind:context={editor} />
      </SubPanel>
    {/if}
    {#if item.component && selected === item.name}
      <div class="fixed top-0 right-0 bottom-0 left-[512px] bg-stone-800">
        <svelte:component this={item.component} bind:post={$post} bind:context={editor} />
      </div>
    {/if}
  {/each}

  <div slot="preview"><slot/></div>
</Editor>
-->
