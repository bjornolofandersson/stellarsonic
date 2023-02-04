<script lang="ts">
  export let onClick: () => void;
  export let icon: string;
</script>

<button on:click={onClick} class="text-stone-500 hover:text-stone-700 disabled:text-stone-400 mr-4 last:mr-0">
  <span class="material-symbols-outlined">{icon}</span>
</button>