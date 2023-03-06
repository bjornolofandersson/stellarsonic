<script lang="ts">
  export let icon: string;
  export let onClick: () => any;
</script>

<button class="text-primary-invert bg-primary-invert hover:bg-accent-invert p-2 w-14 h-14 rounded-full transition-all" on:click={onClick}>
  <span class="material-symbols-outlined mt-2">{icon}</span> 
</button>
