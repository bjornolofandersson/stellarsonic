<script lang="ts">
  import { loadEntity } from "@lib/store";

  const modules = import.meta.glob('../../modules/*/*.editor.svelte', {eager: true});

  export let module: string;
  export let props: any;

  const { entity, ...restProps } = props;

  const content = loadEntity(entity);

	const Editor = (modules[`../../modules/${module}/${module}.editor.svelte`] as any).default;
</script>

<svelte:component this={Editor} bind:content={$content.data} {...restProps}>
  <slot/>
</svelte:component>
