<script lang="ts">
  export let value: number;
  export let label: string;
  export let unit: string | undefined = undefined;
  export let min: number;
  export let max: number;
  export let step: number = 1;
</script>

<div class="relative mb-4">
  <label for="range" class="-mb-5 text-sm text-stone-600 py-4 w-full flex justify-between">
    <span>{label}</span>
    <span>{value} {unit ? unit : ''}</span>
  </label>
  <input id="range" type="range" min={min} max={max} step={step} bind:value={value}
    class="w-full h-0.5 bg-stone-400 rounded-lg appearance-none cursor-pointer dark:bg-stone-700 accent-stone-500"/>
</div>
