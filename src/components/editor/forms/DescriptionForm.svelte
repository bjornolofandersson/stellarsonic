<script lang="ts">
  import ExpandSelect from "src/editor/ExpandSelect.svelte";

  export let post: any;
</script>

<ExpandSelect icon="subject" label="Description">
  <textarea id="description" class="text-sm mt-4 w-full bg-transparent placeholder-stone-400 focus:outline-none focus:text-stone-700" rows={10} bind:value={post.description} />
</ExpandSelect>

