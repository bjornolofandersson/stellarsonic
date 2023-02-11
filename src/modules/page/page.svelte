<script lang="ts">
  import Page from '@theme/Page.svelte';
  import Content from '@components/common/Content.svelte';
  import { PageStore } from './page';

  export let data: any;
  export let baseStyle: any;
  export let sitemap: any;

  let store = PageStore.instance(data, baseStyle);
  let {page, base} = store;
</script>

<Page bind:data={$page.data} sitemap={sitemap}>
  <Content style={$page.data.style} baseStyle={$base}>
    <slot/>
  </Content>
</Page>
