<script lang="ts">
  export let icon: string;
  export let onClick: () => any;
</script>

<button class="mt-2 p-2 w-14" style="border: 1px solid #ffffff30" on:click={onClick}>
  <span class="material-symbols-outlined mt-1">{icon}</span> 
</button>
