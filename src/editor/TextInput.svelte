<script lang="ts">
  export let value: string | undefined;
</script>

<input class="mb-4 w-full p-4 pb-2 bg-transparent border-b border-[#00000020] placeholder-stone-400 rounded focus:outline-none focus:border-stone-700 focus:text-stone-700 dark:border-[#ffffff60]"
   bind:value={value} {...$$restProps}>
