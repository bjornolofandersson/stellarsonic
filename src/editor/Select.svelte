<script lang="ts">
  import ButtonExpand from "./ButtonExpand.svelte";

  export let value: any;
  export let label: string;
  export let options: any[];
  export let singleRow: boolean = false;

  let selected: any = undefined;
  $: {
    selected = options.find(o => o.value === value);
  }
</script>

<ButtonExpand label={label} icon={selected?.icon}>
  <div slot="value">
    <span class="capitalize">{selected?.name}</span>
  </div>
  <div class="flex justify-start w-full gap-4 {!singleRow ? 'flex-wrap': ''}">
    {#each options as o}
      <button on:click={() => {value = o.value}} class="{singleRow ? 'w-full' : ''} flex gap-4 p-4 shadow rounded {o.value === value ? 'bg-stone-100 shadow-lg' : 'bg-stone-200'}">
        {#if o.icon}
          <span class="material-symbols-outlined text-sm">{o.icon}</span>
        {/if}
        <span class="text-sm">{o.name}</span>
      </button>
    {/each}
  </div>
</ButtonExpand>
