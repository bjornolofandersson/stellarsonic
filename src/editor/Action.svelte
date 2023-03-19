<script lang="ts">
  export let onClick: () => void;
  export let icon: string;
</script>

<button {...$$restProps} on:click={onClick} class="enabled:hover:text-stone-700 enabled:dark:hover:text-stone-200 disabled:opacity-40 mr-4 last:mr-0">
  <span class="material-symbols-outlined">{icon}</span>
</button>