<script lang="ts">
  import { TextInput } from "src/editor";

  export let post: any;
</script>

<label for="title" class="text-xs">H1</label>
<TextInput id="title" bind:value={post.title} placeholder="Title"/>

<label for="subtitle" class="text-xs">H2</label>
<TextInput id="subtitle" bind:value={post.subtitle} placeholder="Subtitle"/>
