<script lang="ts">
  import ListItem from "../common/ListItem.svelte";
  import TextInput from "../common/TextInput.svelte";

  export let post: any;
  export let key: string;
  export let title: string;

  let tag: string = "";
  let isValid = false;

  function remove(tag: string) {
    post[key] = post[key].filter((t: string) => t !== tag);
  }
  function add() {
    if (tag !== "") {
      post[key] = [...post[key], tag];
    }
  }

  $: {
    isValid = tag !== "" && !post[key].includes(tag);
  }

</script>

<div class="">
  <div class="flex justify-between text-xl">
    <h2 class="mt-8 text-lg">{title}</h2>
    <button on:click={() => add()} class="text-stone-700 disabled:text-stone-400 -mb-8 mr-4" disabled={!isValid}>
      <span class="material-symbols-outlined">add</span>
    </button>
  </div>
  <TextInput bind:value={tag}/>
  <ul class="py-2">
    {#each post[key] as tag}
      <ListItem icon="tag">
        {tag}
        <button slot="actions" on:click={() => remove(tag)} class="text-stone-700">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </ListItem>
    {/each}
  </ul>
</div>
