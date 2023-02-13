<script lang="ts">
  export let colors: string[];

  //let selected: number | undefined = undefined;
  let inputs: any[] = [];

  for (let c of colors) {
    inputs.push(undefined);
  }

  function selectColor(i: number) {
    //selected = i;
    inputs[i].click();
  }
</script>

<ul class="flex overflow-hidden justify-between rounded-lg shadow-md">
  {#each colors as color, i}
    <li class="w-full relative">
      <button on:click={() => {selectColor(i)}} class="block w-full h-20" style="background-color: {color}"></button>
      <input type="color" class="absolute" bind:this={inputs[i]} bind:value={color}>
    </li>
  {/each}
</ul>
<ul class="flex justify-between">
  {#each colors as color}
    <li class="w-full relative p-4 text-xs opacity-50">
      {color}
    </li>
  {/each}
</ul>
