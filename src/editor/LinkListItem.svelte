<script lang="ts">
  export let icon: string;
  export let url: string | undefined;
</script>

<li class="-ml-8 -mr-8 px-8 py-2 h-12 flex justify-between text-stone-600">
  <a class="flex" href={url}>
    <span class="mr-4 material-symbols-outlined">{icon}</span>
    <slot/>
  </a>
  <div class="flex">
    <slot name="actions"/>
  </div>
</li>
