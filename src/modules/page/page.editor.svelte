<script lang="ts">
  import {
    Action,
    BackArrow,
    Editor,
    MainPanel,
    TitleBar
  } from 'src/editor';

  export let data: any;
</script>

<Editor pageTitle={data.title} onSave={() => {}} panel="main">
  <MainPanel>
    <BackArrow onClick={() => {}}/>

    <TitleBar title={data.title}>
      <Action icon="tune" onClick={() => {}}/>
      <Action icon="settings" onClick={() => {}}/>
    </TitleBar>

  </MainPanel>

  <div slot="preview"><slot/></div>
</Editor>
