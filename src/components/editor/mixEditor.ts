import AssetsForm from './forms/AssetsForm.svelte';
import ContentForm from './forms/ContentForm.svelte';
import StyleForm from './forms/StyleForm.svelte';
import TrackList from './forms/TrackList.svelte';
import TagsPanel from './forms/TagsPanel.svelte';
import MusicMixView from './forms/MusicMixView.svelte';
import { Writable } from 'svelte/store';
import { MixPlaylist } from '@lib/media/MixPlaylist';
import { MusicMixPost } from '@lib/interfaces';
import { PostEditor } from './interfaces';

export default class MixEditor extends PostEditor<MusicMixPost> {
  public static layout = [
    {name: 'Content', icon: 'article', panel: ContentForm},
    {name: 'Tags', icon: 'tag', panel: TagsPanel}, 
    {name: 'Assets', icon: 'perm_media', panel: AssetsForm}, 
    {name: 'Tracks', icon: 'queue_music', panel: TrackList, view: MusicMixView},
    {name: 'Style', icon: 'format_paint', panel: StyleForm},
  ];

  public selectedTrack: number = 0;
  public readonly collection = 'mixes';

  public constructor(
    post: Writable<any>,
    slug: string,
    assets: string[],
    public readonly playlist: MixPlaylist,
  ) { super(post, slug, assets); }
}
