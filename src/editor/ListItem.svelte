<script lang="ts">
  export let icon: string;
</script>

<li class="px-4 py-2 w-full flex justify-between text-stone-600 rounded-md hover:bg-stone-200">
  <div class="flex">
    <span class="mr-4 material-symbols-outlined">{icon}</span>
    <slot/>
  </div>
  <div class="flex">
    <slot name="actions"/>
  </div>
</li>
