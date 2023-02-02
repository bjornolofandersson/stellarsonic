<script lang="ts">
  export let onClick: () => void;
</script>

<div class="flex mt-8">
  <button class="text-stone-400 hover:text-stone-700" on:click={onClick}>
    <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
  </button>
</div>
