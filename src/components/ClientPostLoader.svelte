<script lang="ts">
  import { Stellarsonic } from '@lib/media/Stellarsonic';
  import * as store from '@lib/MixStore';

  export let collection: string;
  export let slug: string;

  Stellarsonic.post(collection, slug).then(p => store.post.set(p));
</script>
