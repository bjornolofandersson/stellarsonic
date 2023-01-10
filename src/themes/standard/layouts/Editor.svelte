<script lang="ts">
  import { title, subtitle, description } from './MixStore';
</script>

<div class="bg-stone-300 flex py-12 pr-8">
  <div class="w-[32rem]">
    <div class="p-4 px-8">
      <label for="title" class="text-xs text-stone-700 font-primary">Title</label>
      <input id="title" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$title}>
    </div>
    <div class="p-4 px-8">
      <label for="subtitle" class="text-xs text-slate-700 font-primary">Subtitle</label>
      <input id="subtitle" class="w-full bg-[#ffffff60] p-2 font-primary" type="text" bind:value={$subtitle}>
    </div>
    <div class="p-4 px-8">
      <label for="description" class="text-xs text-slate-700 font-primary">Description</label>
      <textarea id="description" class="w-full bg-[#ffffff60] p-4 font-primary" rows="20" bind:value={$description} />
    </div>
  </div>

  <div class="w-full shadow-lg">
    <slot/>
  </div>
</div>
