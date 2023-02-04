<script lang="ts">
  export let options: string[];
  //export let onClick: (option: string) => void;
  export let selected: string = options[0];
</script>

<div class="w-full flex">
  {#each options as option}
    <button on:click={() => {selected = option}}
      class="w-full p-4 first:rounded-l-lg last:rounded-r-lg {selected === option ? 'bg-[#ffffff60]': 'bg-[#00000010] opacity-70'}">
      <span>{option}</span>
    </button>
  {/each}
</div>
