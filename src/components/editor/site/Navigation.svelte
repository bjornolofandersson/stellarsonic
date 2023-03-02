<script lang="ts">
  import { Action, ExpandAdd, Input, LinkListItem, List, Scrollable, SettingsModal, SettingsPanel, TitleBar } from "src/editor";
  import { quintOut } from "svelte/easing";
  import { fly, slide } from "svelte/transition";

  export let links: any;
  export let onDelete: (link: any) => void;

  let link: any = { title: '', url: '' };
  let addDisabled = false;

  let showAdd = false;
</script>

<TitleBar title="navigation">
  <Action icon={showAdd ? 'expand_less' : 'add'} onClick={() => {showAdd = !showAdd}}/>
</TitleBar>

<ExpandAdd show={showAdd}>
  <Input placeholder="Title" bind:value={link.title} />
  <Input placeholder="URL" bind:value={link.url} />
</ExpandAdd>

<List class="mb-8">
  {#each links as link}
    <LinkListItem icon="link" url={link.url}>
      {link.title}
      <Action slot="actions" icon={"delete"} onClick={() => onDelete(link)}/>
    </LinkListItem>
  {/each}
</List>

