<script lang="ts">
  import Navigation from "./Navigation.svelte";
  import Pages from "./Pages.svelte";

  export let sitemap: any;
  export let site: any;

  function onAddLink(link: any) {
    site.navigation = [...site.navigation, link];
  }

  function onDeleteLink() {

  }
</script>

<Pages sitemap={sitemap} onAdd={() => {}} />
<Navigation links={site.navigation} onAdd={onAddLink} onDelete={onDeleteLink}/>


<!--
<CreatePageModal show={showAddModal === 'page'} />
<CreateMixModal show={showAddModal === 'mix'} />
-->