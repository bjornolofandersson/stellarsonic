<script lang="ts">
  export let title: string;
  export let onSave: () => void;
  
  let active: boolean = true;
</script>

<div class="w-full shadow-lg absolute" style="width: calc(100vw - 570px); top: 6rem; right: 2rem;">
  <div class="w-full bg-white px-8 py-2 flex justify-between">
    <div class="font-editor">
      <button class="p-2 text-stone-500 bg-white hover:text-stone-700" on:click={onSave}>
        <span class="material-symbols-outlined text-3xl">save_as</span>
      </button>
    </div>
    <div class="font-editor mt-4">{title}</div>
    <div class="font-editor">
      <button class="p-2 text-stone-500 bg-white hover:text-stone-700" on:click={() => active = !active}>
        <span class="material-symbols-outlined text-3xl">fullscreen</span>
      </button>
    </div>
  </div>
  <slot/>
</div>
