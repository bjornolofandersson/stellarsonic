<script lang="ts">
  import Page from '@theme/Page.svelte';
  import Content from '@components/common/Content.svelte';
  import { PageStore, TemplateStore } from './page';
  import { Entity } from '@lib/interfaces';

  export let entity: Entity<any>;
  export let template: Entity<any>;
  export let sitemap: any;

  let {entity: page} = PageStore.instance(entity);
  let {entity: storedTemplate} = TemplateStore.instance(template);
</script>

<Page bind:data={$page.data} sitemap={sitemap}>
  <Content style={$storedTemplate.data}>
    <slot/>
  </Content>
</Page>
