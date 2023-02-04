<script lang="ts">
  import Scrollable from "./Scrollable.svelte";

  export let show: boolean = false;
  export let expand: boolean = false;
</script>

{#if show}
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 {expand ? 'w-[90vw] h-[90vh]' : 'w-[60vw] h-[70vh]'}">
        <div class="h-full grid {expand ? 'grid-cols-[512px_1fr]' : 'grid-cols-[1fr_2fr]'}">
          <div class="flex flex-col flex-auto text-stone-400 p-8 bg-stone-100 {expand ? 'h-[90vh]' : 'h-[70vh]'}">
            <div class="pb-4">
              <slot name="header"/>
            </div>
            <Scrollable>
              <slot name="sidebar"/>
            </Scrollable>
            {#if $$slots.footer}
              <div class="pt-4">
                <slot name="footer"/>
              </div>
            {/if}
          </div>
          <div class="flex-col">
            <slot name="content"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
