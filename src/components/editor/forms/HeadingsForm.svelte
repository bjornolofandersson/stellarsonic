<script lang="ts">
  import { Input } from "src/editor";

  export let post: any;
</script>

<label for="title" class="text-xs">H1</label>
<Input type="text" id="title" bind:value={post.title} placeholder="Title"/>

<label for="subtitle" class="text-xs">H2</label>
<Input type="text" id="subtitle" bind:value={post.subtitle} placeholder="Subtitle"/>
