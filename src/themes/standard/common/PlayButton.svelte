<script lang="ts">
  export let icon: string;
  export let onClick: () => any;
</script>

<button class="p-2 w-14 h-14 rounded-full bg-white text-stone-900" style="border: 1px solid #ffffff30" on:click={onClick}>
  <span class="material-symbols-outlined mt-2">{icon}</span> 
</button>
