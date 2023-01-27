<script lang="ts">
  export let page: any;
  export let path: string;

  const pageRange = [...Array(page.lastPage).keys()].map(k => k + 1);

  const isCurrentPage = (i: number) => {
    return i === page.currentPage
  }
</script>

<ul class="flex justify-center">
  {#each pageRange as k}
    <li class={`text-md m-2 text-center ${isCurrentPage(k) ? 'bg-light-accent text-white' : ''}`} style="border: 1px solid #00000030">
      <a class="block py-4 w-12" href={`${path}/${k === 1 ? "" : k}`}>{k}</a>
    </li>
  {/each}
</ul>
