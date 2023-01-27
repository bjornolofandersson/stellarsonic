<script lang="ts">
  import Button from "../common/Button.svelte";

  export let post: any;
  export let context: {selectedTrack: number};
</script>

<Button label="Add" icon="add" onClick={() => {}} />

<ul class="mt-8 h-[600px] overflow-y-auto -mr-8 -ml-8 p-8">
  {#each post.tracks as track, i}
    <li class="px-4 rounded-md {context.selectedTrack === i ? 'bg-[#ffffff60]' : 'hover:bg-[#ffffff40]'}">
      <button on:click={() => {context.selectedTrack = i}} class="w-full py-3 text-left flex">
        <span class="inline-block p-2 w-10 mr-4 bg-stone-700 rounded text-stone-100 text-center">{i + 1}</span>
        <span class="inline-block">{track.name}</span>
      </button>
    </li>
  {/each}
</ul>

<style>
  ::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
