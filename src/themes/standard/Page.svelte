<script lang="ts">
  import Content from '@components/common/Content.svelte';

  export let page: any;
</script>

<div class="bg-white container mx-auto min-h-full">
  <div class="page-content px-8">
    <Content style={page.style}>
      <slot/>
    </Content>
  </div>
</div>
