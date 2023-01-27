<script lang="ts">
  import MenuBar from './MenuBar.svelte';
  import {settings} from '@lib/SettingsStore';
</script>

<div class="w-full bg-white">
  <div class="relative container mx-auto">
    <MenuBar bind:settings={$settings}/>
  </div>
</div>
