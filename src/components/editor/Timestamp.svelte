<script lang="ts">
  import { hours, minutes, seconds } from "@lib/utils";

  export let onUpdate: (amount: number) => void;
  export let label: string;
  export let time: number;
  export let timerId: any;
  export let editable: boolean = true;

  function onDown(amount: number) {
    timerId = setTimeout(() => {
      timerId = setInterval(() => onUpdate(amount), 100);
    }, 400);
  }

  function pad(value: number) {
    return value < 10 ? '0' + value : value;
  }
</script>


<div class="bg-[#000000010] rounded-md mt-10 relative overflow-hidden">
  {#if editable}
    <div class="absolute right-0 h-full bg-[#00000010] text-white">
      <div class="flex flex-col h-full">
        <button class="p-6 h-1/2 hover:bg-[#ffffff20]" on:mousedown={() => onDown(1)} on:click={() => onUpdate(1)}>
          <span class="material-symbols-outlined">expand_less</span>
        </button>
        <button class="p-6 h-1/2 hover:bg-[#ffffff20]" on:mousedown={() => onDown(-1)} on:click={() => onUpdate(-1)}>
          <span class="material-symbols-outlined">expand_more</span>
        </button>
      </div>
    </div>
  {/if}
  <div class="p-10">
    <h3 class="text-sm opacity-50">{label}</h3>
    <div class="flex gap-2 text-5xl">
      <span>{pad(hours(time))}</span>
      <span>:</span>
      <span>{pad(minutes(time))}</span>
      <span>:</span>
      <span>{pad(seconds(time))}</span>
    </div>
  </div>
</div>
