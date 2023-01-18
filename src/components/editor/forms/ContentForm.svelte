<script lang="ts">
  import TextArea from '../common/TextArea.svelte';
  import TextInput from '../common/TextInput.svelte';

  export let post: any;
</script>

<TextInput id="title" label="Title" bind:value={post.title} />
<TextInput id="subtitle" label="Subtitle" bind:value={post.subtitle} />
<TextArea id="description" label="Description" rows={20} bind:value={post.description} />
