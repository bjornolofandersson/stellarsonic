<script lang="ts">
  export let back: string;
</script>

<div class="flex justify-between text-xl mb-4 mt-8">
  <a class="text-stone-400 hover:text-stone-700" href={back}>
    <span class="material-symbols-outlined text-4xl">keyboard_backspace</span>
  </a>
  <div class="flex">
    <slot/>
  </div>
</div>
