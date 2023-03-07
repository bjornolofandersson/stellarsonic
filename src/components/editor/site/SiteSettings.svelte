<script lang="ts">
  import { Input } from "src/editor";

  export let site: any;
</script>

<ul class="mt-8">
  <li>
    <label for="title" class="text-xs opacity-50">Site title</label>
    <Input type="text" id="title" bind:value={site.title}/>
  </li>
  <li>
    <label for="description" class="text-xs opacity-50">Description</label>
    <Input type="text" id="description" bind:value={site.description}/>
  </li>
  <li>
    <label for="url" class="text-xs opacity-50">URL</label>
    <Input type="text" id="url" bind:value={site.url}/>
  </li>
</ul>
