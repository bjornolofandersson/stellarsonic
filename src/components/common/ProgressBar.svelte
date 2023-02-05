<script lang="ts">
  export let progress: number;
  export let onSeek: (progress: number) => void;
  export let colorProgress: string;

  let seekWidth: number = 0;
</script>

<button 
  bind:clientWidth={seekWidth}
  on:click={ev => onSeek(ev.offsetX / seekWidth)}
  class="w-full h-3 overflow-hidden absolute bottom-0 bg-[#ffffff06]">
    <div class="h-full" style="width: {100 * (progress)}%; background: {colorProgress};"></div>
</button>
