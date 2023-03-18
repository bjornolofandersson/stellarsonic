<script lang="ts">
  import { Input } from "src/editor";

  export let post: any;
</script>

<Input type="text" icon="title" bind:value={post.title} placeholder="Title"/>
<Input type="text" icon="title" bind:value={post.subtitle} placeholder="Subtitle"/>
