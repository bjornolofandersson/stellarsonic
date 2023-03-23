<script lang="ts">
  let edit = true;
</script>

<div
  class="w-full absolute shadow-2xl"
  style={ edit ? 'width: calc(100vw - 420px - 1rem); top: 1rem; right: 1rem; bottom: 1rem' : ''}
>
  <div class="edit-page-preview bg-stone-800 overflow-y-scroll {edit ? 'h-full' : 'h-screen'}">
    <slot/>
  </div>
</div>
