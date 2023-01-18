<script lang="ts">
  import Button from "../common/Button.svelte";
</script>

<div class="my-4 flex gap-4">
  <Button label="Draft" icon="edit_document" onClick={() => {}}/>
  <Button label="Publish" icon="send" onClick={() => {}}/>
</div>

<slot/>