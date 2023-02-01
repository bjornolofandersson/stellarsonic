<script lang="ts">
  import Editor from '@components/editor/common/Editor.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';
  import { MixStore } from './playlist';

  export let slug: string;
  export let data: any;

  let {post, playlist} = MixStore.instance(slug, data);
</script>

<Editor pageTitle={$post.title} onSave={() => {}}>
  <MainPanel>
    <div class="h-full flex flex-col flex-auto">
      <div class="flex mt-8">
        <button class="text-stone-400 hover:text-stone-700" on:click={() => {}}>
          <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
        </button>
      </div>

      <div class="flex justify-between text-xl">
        <h2 class="mt-8 text-lg font-[500]">{$post.title.toUpperCase()}</h2>
        <div class="flex">
          <button on:click={() => {}} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4">
            <span class="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>
    </div>
  </MainPanel>
  <div slot="preview"><slot/></div>
</Editor>
