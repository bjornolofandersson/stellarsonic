<script lang="ts">
  import Page from '@theme/Page.svelte';
  import Content from '@components/common/Content.svelte';
  import { PageStore } from './page';

  export let data: any;

  let { page } = PageStore.instance(data);
</script>

<Page bind:page={$page}>
  <Content style={$page.style}>
    <slot/>
  </Content>
</Page>
