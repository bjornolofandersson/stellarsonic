<script lang="ts">
  import * as store from '@lib/SettingsStore';

  export let settings: any;

  store.settings.set(settings);
</script>
