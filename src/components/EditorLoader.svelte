<script lang="ts">
  const modules = import.meta.glob('../modules/*/*.editor.svelte', {eager: true});

  export let module: string;
  export let props: any;

	const Editor = (modules[`../modules/${module}/${module}.editor.svelte`] as any).default;
</script>

<svelte:component this={Editor} {...props}>
  <slot/>
</svelte:component>
