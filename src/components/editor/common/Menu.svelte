<script lang="ts">
  export let items: any[];
  export let onSelect: (item: string) => void;
</script>

<ul class="font-primary mt-8 text-2xl text-stone-500">
  {#each items as item}
    <li class="py-2">
      <button on:click={() => onSelect(item.name)} class="hover:text-stone-700 w-full text-left p-4">
        <span class="material-symbols-outlined mr-4">{item.icon}</span>
        {item.name}
      </button>
    </li>
  {/each}
</ul>


