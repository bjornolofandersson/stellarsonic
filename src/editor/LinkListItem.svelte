<script lang="ts">
  export let icon: string;
  export let url: string | undefined;
</script>

<li class="px-4 py-2 w-full flex justify-between my-2 h-12">
  <a class="flex" href={url}>
    <span class="mr-4 material-symbols-outlined">{icon}</span>
    <slot/>
  </a>
  <div class="flex">
    <slot name="actions"/>
  </div>
</li>
