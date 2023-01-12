<script lang="ts">
  export let label: string;
  export let icon: string | undefined;
  export let onClick: () => void;
</script>

<button on:click={onClick}
  class="w-full p-4 bg-stone-200 shadow-md flex justify-between hover:bg-stone-100" 
  style="transition: background-color 0.2s">
  <span>{label}</span>
  {#if icon}
    <span class="block -mb-2 material-symbols-outlined">{icon}</span>
  {/if}
</button>
