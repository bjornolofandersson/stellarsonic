<script lang="ts">
  export let icon: string | undefined = undefined;
</script>

<div class="border border-[#00000010] p-4 rounded flex gap-4">
  {#if icon}
    <span class="material-symbols-outlined opacity-30">{icon}</span>
  {/if}
  <span class="text-sm opacity-50">
    <slot/>
  </span>
</div>