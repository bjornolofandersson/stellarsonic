<script lang="ts">
  import Editor from './Editor.svelte';

  function onSave() {}
</script>

<Editor pageTitle="Home" onSave={onSave}>
  <div class="px-8 mb-8">
    <div class="border-b border-[#00000020] p-8">
      <h1 class="text-2xl">
        <span class="material-symbols-outlined">queue_music</span>
        <a class="text-cyan-700" href="/mixes">Mixes</a>
      </h1>
      <p class="mt-4 text-sm">Posts with a single audio file annotated with several tracks to form a playlist</p>
    </div>
  </div>

  <div class="px-8 mb-8">
    <div class="border-b border-[#00000020] p-8">
      <h1 class="text-2xl">
        <span class="material-symbols-outlined">library_music</span>
        Albums / Playlists
      </h1>
      <p class="mt-4 text-sm">Posts with a multiple audio files annotated as tracks to form a playlist</p>
    </div>
  </div>

  <div class="px-8 mb-8">
    <div class="border-b border-[#00000020] p-8">
      <h1 class="text-2xl">
        <span class="material-symbols-outlined">music_note</span>
        Recording
      </h1>
      <p class="mt-4 text-sm">Posts with a single audio file</p>
    </div>
  </div>

  <div class="px-8 mb-8">
    <div class="border-b border-[#00000020] p-8">
      <h1 class="text-2xl">
        <span class="material-symbols-outlined">podcasts</span>
        Podcasts
      </h1>
      <p class="mt-4 text-sm">Posts with a single audio file with or without timestamp annotations</p>
    </div>
  </div>

  <div slot="preview"><slot/></div>
</Editor>
