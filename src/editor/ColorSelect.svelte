<script lang="ts">
  export let value: number;
  export let label: string;
  export let palette: string[];
</script>

<div class="relative">
  <label class="absolute font-semi-bold mt-4 ml-4 pointer-events-none flex gap-4" for={label}>
    <span class="inline-block w-6 h-6 rounded border border-stone-700" style="background-color: {palette[value]};"></span>
    <span>{label}</span>
  </label>
  <select id={label} bind:value={value} class="text-right mb-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700 dark:text-stone-300 dark:focus:text-stone-100 dark:border-[#ffffff80] dark:focus:border-[#ffffff]">
    {#each palette as color, i}
      <option value={i} style="background-color: {color}">
        {color}
      </option>
    {/each}
  </select>
</div>