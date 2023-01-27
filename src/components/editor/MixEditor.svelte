<script lang="ts">
  import { MixStore } from '@lib/media/Stellarsonic';
  import PostEditor from './PostEditor.svelte';
  import AssetsForm from './forms/AssetsForm.svelte';
  import ContentForm from './forms/ContentForm.svelte';
  import StyleForm from './forms/StyleForm.svelte';
  import TrackList from './forms/TrackList.svelte';
  import TagsPanel from './forms/TagsPanel.svelte';
  import MusicMixView from './forms/MusicMixView.svelte';

  export let slug: string;
  export let data: any;
  export let assets: string[];

  let {post, playlist, save} = MixStore.instance(slug, data);
  let context = {
    assets,
    playlist,
    save,
    selectedTrack: 0,
  }

  const menuItems = [
    {name: 'Content', icon: 'article', panel: ContentForm},
    {name: 'Tags', icon: 'tag', panel: TagsPanel}, 
    {name: 'Assets', icon: 'perm_media', panel: AssetsForm}, 
    {name: 'Tracks', icon: 'queue_music', panel: TrackList, view: MusicMixView},
    {name: 'Style', icon: 'format_paint', panel: StyleForm},
  ];

  const breadcrumbs = [
    {label: 'Home', href: '/'},
    {label: 'Mixes', href: '/mixes'},
    {label: slug},
  ]
</script>

<PostEditor bind:post={$post} bind:context={context} breadcrumbs={breadcrumbs} menuItems={menuItems}>
  <slot/>
</PostEditor>
