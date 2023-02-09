<script lang="ts">
  export let title: string;
</script>

<div class="flex justify-between text-xl mb-4">
  <h2 class="text-lg font-[500]">{title.toUpperCase()}</h2>
  <div class="flex">
    <slot/>
  </div>
</div>
