<script lang="ts">
  import Editor from '@components/editor/common/Editor.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';
  import TextInput from '@components/editor/common/TextInput.svelte';
  import { MixStore } from '@lib/media/Stellarsonic';

  export let slug: string;
  export let data: any;

  let {post, playlist} = MixStore.instance(slug, data);
</script>

<Editor pageTitle={"Hello"} onSave={() => {}}>
  <MainPanel>
    <TextInput bind:value={$post.title} />
  </MainPanel>
  <div slot="preview"><slot/></div>
</Editor>
