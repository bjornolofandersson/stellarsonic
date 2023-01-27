<script lang="ts">
  import TagsForm from "./TagsForm.svelte";

  export let post: any;
  export let context: any;

</script>

<TagsForm bind:post={post} title="GENRES" key="genres" />
<TagsForm bind:post={post} title="TAGS" key="tags" />
