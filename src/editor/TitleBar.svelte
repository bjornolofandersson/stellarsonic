<script lang="ts">
  export let title: string;
</script>

<div class="flex justify-between text-xl">
  <h2 class="mt-8 text-lg font-[500]">{title.toUpperCase()}</h2>
  <div class="flex">
    <slot/>
  </div>
</div>
