<script lang="ts">
  export let title: string;
  export let onSave: () => void;
  
  let edit = true;

</script>

{#if !edit}
  <button class="fixed right-0 w-20 h-20 z-10 p-2 text-white" on:click={() => {edit = true}}>
    <span class="material-symbols-outlined text-3xl">tune</span>
  </button>
{/if}

<div class="w-full absolute shadow-2xl" style={ edit ? 'width: calc(100vw - 570px); top: 2rem; right: 2rem; bottom: 6rem' : ''}>
  {#if edit}
    <div class="w-full bg-white px-8 py-2 flex justify-between">
      <div class="font-editor">
        <button class="p-2 text-stone-500 bg-white hover:text-stone-700" on:click={onSave}>
          <span class="material-symbols-outlined text-3xl">save_as</span>
        </button>
      </div>
      <div class="font-editor mt-4">{title}</div>
      <div class="font-editor">
        <button class="p-2 text-stone-500 bg-white hover:text-stone-700" on:click={() => {edit = false}}>
          <span class="material-symbols-outlined text-3xl">fullscreen</span>
        </button>
      </div>
    </div>
  {/if}

  <div class="overflow-y-scroll {edit ? 'h-full' : 'h-screen'}">
    <slot/>
  </div>
</div>
