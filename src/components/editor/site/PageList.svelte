<script lang="ts">
  import type { Entity, ModuleDescription } from "@lib/interfaces";
  import type { Page } from "src/content/config";
  import { Action, LinkListItem, List } from "src/editor";
  import * as api from '@lib/api';

  export let panel: string;
  export let pages: Entity<Page>[] = [];
  export let modules: Record<string, ModuleDescription> = {}

  let path = window.location.pathname;

  function isActive(slug: string) {
    return '/' + slug === path || slug === 'index' && path === '/';
  }

  function onDeletePage(page: Entity<Page>) {
    api.deleteEntity('pages', page.id);
  }

  const pageIcon = (page: Page) => {
    return modules[page.type] ? modules[page.type].icon : '';
  }
</script>

<List class="mb-8">
  {#each pages.sort((a, b) => a.slug > b.slug ? 1 : -1) as page}
    <LinkListItem icon={pageIcon(page.data)} url="/{page.slug}" active={isActive(page.slug)}>
      <span>{page.slug}</span>
      <div class="dark" slot="actions">
        <Action icon={"edit_square"} onClick={() => {panel = 'page'}}/>
        <Action icon={"delete"} onClick={() => onDeletePage(page)}/>
      </div>
    </LinkListItem>
  {/each}
</List>
