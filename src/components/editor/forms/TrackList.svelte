<script lang="ts">
  import Button from "../common/Button.svelte";

  export let post: any;
  export let selected: number = 0;
  export let onSelect: (track: number) => void;
  export let onAdd: () => void;
</script>

<Button label="Add" icon="add" onClick={onAdd} />

<ul class="mt-8">
  {#each post.tracks as track, i}
    <li class="px-4 rounded-md {selected === i ? 'bg-[#ffffff60]' : 'hover:bg-[#ffffff40]'}">
      <button on:click={() => onSelect(i)} class="w-full py-3 text-left">{i + 1}. {track.name}</button></li>
  {/each}
</ul>
