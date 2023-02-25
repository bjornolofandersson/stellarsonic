<script lang="ts">
  export let value: any;
</script>

<option value={value} class="bg-stone-200 p-4">
  <slot/>
</option>