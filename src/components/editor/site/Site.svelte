<script lang="ts">
  import Navigation from "./Navigation.svelte";
  import Pages from "./Pages.svelte";

  import CreateArticle from '@modules/article/article.form.svelte';
  import type { ModuleDescription } from "@lib/interfaces";
    import Scrollable from "src/editor/Scrollable.svelte";
    import ExpandRight from "src/editor/ExpandRight.svelte";

  export let site: any;
  export let panel: string;

  let showAddModal: string | undefined = undefined;

</script>

<Scrollable>
  <Pages bind:panel={panel} onAdd={type => { showAddModal = type}} />
</Scrollable>
<ExpandRight icon="explore" label="Navigation" on:click={() => {panel = 'navigation'}}></ExpandRight>


<!--<CreateArticle show={showAddModal === 'article'} />-->

<!--
<CreatePageModal show={showAddModal === 'page'} />
<CreateMixModal show={showAddModal === 'mix'} />
-->