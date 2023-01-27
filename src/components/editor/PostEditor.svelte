<script lang="ts">
  import Editor from './common/Editor.svelte';
  import SubPanel from './common/SubPanel.svelte';
  import Menu from './common/Menu.svelte';
  import MainPanel from './common/MainPanel.svelte';
  import Breadcrumbs from './common/Breadcrumbs.svelte';
  import PostForm from './forms/PostForm.svelte';

  export let post: any;
  export let context: any;
  export let breadcrumbs: any;
  export let menuItems: any[];

  let selected: any = undefined;
</script>

<Editor 
  bind:pageTitle={post.title}
  onSave={() => context.save()}
  showPreview={menuItems.find(i => i.name === selected && i.view !== undefined) === undefined}
>
  <Breadcrumbs trail={breadcrumbs} />

  <MainPanel show={selected === undefined}>
    <PostForm>
      <Menu items={menuItems} onSelect={item => {selected = item}}/>
    </PostForm>
  </MainPanel>

  {#each menuItems as item}
    {#if item.panel}
      <SubPanel show={selected === item.name} title={item.name} onBack={() => {selected = undefined}}>
        <svelte:component this={item.panel} bind:post={post} bind:context={context} />
      </SubPanel>
    {/if}
    {#if item.view && selected === item.name}
      <div class="fixed top-0 right-0 bottom-0 left-[512px] bg-stone-800">
        <svelte:component this={item.view} bind:post={post} bind:context={context} />
      </div>
    {/if}
  {/each}

  <div slot="preview"><slot/></div>
</Editor>