<script lang="ts">
  import {
    Action,
    BackArrow,
    MainPanel,
    TitleBar
  } from 'src/editor';
  import Sidebar from 'src/editor/Sidebar.svelte';

  export let data: any;
</script>

<Sidebar>
  <MainPanel>
    <BackArrow url={data.parent ? `/${data.parent}` : '/'}/>

    <TitleBar title="page">
      <Action icon="tune" onClick={() => {}}/>
      <Action icon="settings" onClick={() => {}}/>
    </TitleBar>

    <p class="mb-20">Some things related to page</p>
    <slot/>
  </MainPanel>
</Sidebar>
