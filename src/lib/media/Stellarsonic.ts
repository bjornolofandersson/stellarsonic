import { MediaPlayer, MusicMix } from "@lib/interfaces";
import { AudioPlayer } from "./AudioPlayer";
import { MixPlaylist } from "./MixPlaylist";

let audioPlayer: MediaPlayer;
let mixPlaylists: Record<string, MixPlaylist> = {};
let mixes: Record<string, Promise<MusicMix>> = {};

async function fetchJson(path: string) {
  const resp = await fetch(path);
  return resp.json();
}

export const Stellarsonic = {
  audioPlayer(): MediaPlayer {
    if (!audioPlayer) {
      audioPlayer = new AudioPlayer();
    }
    return audioPlayer;
  },

  async mixPost(slug: string): Promise<MusicMix> {
    if (!mixes[slug]) {
      mixes[slug] = fetchJson(`/mixes/${slug}.json`);
    }
    return mixes[slug];
  },

  async mixPlaylist(postOrSlug: MusicMix | string): Promise<MixPlaylist> {
    let post;
    if (typeof postOrSlug === 'string') {
      post = await this.mixPost(postOrSlug);
    } else {
      post = postOrSlug;
    }
    let src = post.audio;

    if (!mixPlaylists[src]) {
      mixPlaylists[src] = new MixPlaylist(Stellarsonic.audioPlayer(), src, post.tracks);
    }
    return mixPlaylists[src];
  }
}
