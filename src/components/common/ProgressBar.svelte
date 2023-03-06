<script lang="ts">
  export let progress: number;
  export let onSeek: (progress: number) => void;

  let seekWidth: number = 0;
</script>

<button 
  bind:clientWidth={seekWidth}
  on:click={ev => onSeek(ev.offsetX / seekWidth)}
  class="w-full h-1 overflow-hidden absolute rounded-full bottom-0 bg-[#00000010]">
    <div class="h-full" style="width: {100 * (progress)}%; background: var(--theme-text-accent);"></div>
</button>
