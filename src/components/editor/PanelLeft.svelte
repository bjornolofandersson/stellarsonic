<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div class="absolute w-full px-8" transition:fly={{ x: -512, duration: 500, easing: quintOut }}>
  <slot/>
</div>
