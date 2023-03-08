<script lang="ts">
  import Navigation from "./Navigation.svelte";
  import Pages from "./Pages.svelte";

  import CreateArticle from '@modules/article/article.form.svelte';
  import type { ModuleDescription } from "@lib/interfaces";

  export let sitemap: any;
  export let site: any;
  export let modules: Record<string, ModuleDescription>;

  let showAddModal: string | undefined = undefined;

  function onAddLink(link: any) {
    site.navigation = [...site.navigation, link];
  }

  function onDeleteLink() {

  }
</script>

<Pages sitemap={sitemap} modules={modules} onAdd={type => { showAddModal = type}} />
<Navigation links={site.navigation} onAdd={onAddLink} onDelete={onDeleteLink}/>

<!--<CreateArticle show={showAddModal === 'article'} />-->

<!--
<CreatePageModal show={showAddModal === 'page'} />
<CreateMixModal show={showAddModal === 'mix'} />
-->