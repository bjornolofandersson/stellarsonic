<script lang="ts">
  import { SettingsModal, SettingsPanel } from "src/editor";
  import Navigation from "./Navigation.svelte";
  import Pages from "./Pages.svelte";

  export let sitemap: any;

  let showSettings = false;

  async function onSaveSettings() {

  }

  function onDeleteLink() {

  }
</script>

<Pages sitemap={sitemap} onAdd={() => {}} />
<Navigation links={[{title: 'About', url: '/about'}]} onDelete={onDeleteLink}/>

<SettingsModal bind:show={showSettings} onSave={onSaveSettings}>
  <SettingsPanel name="Site">
    <ul class="mt-8">
      <!--
      <li>
        <label for="title" class="text-xs opacity-50">Site title</label>
        <Input type="text" id="title" bind:value={$site.title}/>
      </li>
      <li>
        <label for="description" class="text-xs opacity-50">Description</label>
        <Input type="text" id="description" bind:value={$site.description}/>
      </li>
      <li>
        <label for="url" class="text-xs opacity-50">URL</label>
        <Input type="text" id="url" bind:value={$site.url}/>
      </li>
  -->
    </ul>
  </SettingsPanel>
</SettingsModal>

<!--
<CreatePageModal show={showAddModal === 'page'} />
<CreateMixModal show={showAddModal === 'mix'} />
-->