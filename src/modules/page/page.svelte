<script lang="ts">
  import Page from '@theme/Page.svelte';
  import Content from '@components/common/Content.svelte';
  import { PageStore } from './page';

  export let data: any;
  export let sitemap: any;

  let { page } = PageStore.instance(data);
</script>

<Page bind:data={$page.data} sitemap={sitemap}>
  <Content style={$page.data.style}>
    <slot/>
  </Content>
</Page>
