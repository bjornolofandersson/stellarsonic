import StyleForm from './forms/StyleForm.svelte';
import TrackList from './forms/TrackList.svelte';
import TagsPanel from './forms/TagsPanel.svelte';
import MusicMixView from './forms/MusicMixView.svelte';
import { Writable } from 'svelte/store';
import { MixPlaylist } from '@lib/media/MixPlaylist';
import { MusicMixPost } from '@lib/interfaces';
import { PostEditor } from './interfaces';
import ImageForm from './forms/ImageForm.svelte';
import DescriptionForm from './forms/DescriptionForm.svelte';
import HeadingsForm from './forms/HeadingsForm.svelte';

export default class MixEditor extends PostEditor<MusicMixPost> {
  public static layout = [
    {name: 'Headings', icon: 'title', panel: HeadingsForm},
    {name: 'Description', icon: 'description', panel: DescriptionForm},
    //{name: 'Tags', icon: 'tag', panel: TagsPanel}, 
    {name: 'Image', icon: 'image', panel: ImageForm}, 
    //{name: 'Tracks', icon: 'queue_music', panel: TrackList, view: MusicMixView},
    {name: 'Style', icon: 'format_paint', panel: StyleForm},
  ];

  public static views = [
    {name: 'Tracks', icon: 'queue_music', panel: TrackList, component: MusicMixView}
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
