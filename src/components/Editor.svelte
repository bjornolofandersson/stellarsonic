<script lang="ts">
  import { Editor } from "src/editor";
</script>

<Editor pageTitle="Hello" onSave={() => {}}>
  <slot name="sidebar" slot="sidebar"/> 
  <slot name="preview" slot="preview" />
</Editor>
