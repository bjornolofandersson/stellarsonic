<script lang="ts">
  export let icon: string;
  export let onClick: () => any;
</script>

<button class="text-primary hover:text-accent mt-1 p-2 w-10 h-10" on:click={onClick}>
  <span class="material-symbols-outlined mt-1">{icon}</span> 
</button>
