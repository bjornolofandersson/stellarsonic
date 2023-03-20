<script lang="ts">
  export let onClick: () => void;
  export let icon: string;
</script>

<button {...$$restProps} on:click={onClick} class="enabled:hover:text-stone-700 dark:text-stone-200 enabled:dark:hover:text-stone-50 disabled:opacity-40 mr-4 last:mr-0">
  <span class="material-symbols-outlined mt-1">{icon}</span>
</button>