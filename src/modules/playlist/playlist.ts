import type { Entity } from "@lib/interfaces";
import { Stellarsonic } from "@lib/media/Stellarsonic";
import { EntityStore } from "@lib/store";
import { writable, Writable } from "svelte/store";
import type { MusicMix } from './playlist.server';
import { parse, toSeconds } from 'iso8601-duration';
import { MediaPlayer, Playlist } from '@lib/interfaces';
import type { MusicMixTrack } from './playlist.server';

export class MixStore extends EntityStore<MusicMix> {
  private static mixes: Record<string, MixStore> = {}

  public constructor(
    entity: Writable<Entity<MusicMix>>,
    public readonly playlist: MixPlaylist
  ) {
    super('mixes', entity);
  }

  public static instance(entity: Entity<MusicMix>): MixStore {
    if (!this.mixes[entity.id]) {
      this.mixes[entity.id] = new MixStore(
        writable(entity), new MixPlaylist(Stellarsonic.audioPlayer(), entity.data.audio, entity.data.tracks)
      );
    }
    return this.mixes[entity.id];
  }
}

export class MixPlaylist implements Playlist<MusicMixTrack> {
  private breakpoints: number[] = [];
  public tracks: MusicMixTrack[] = [];

  public constructor(
    public readonly player: MediaPlayer,
    public readonly audio: string,
    tracks: MusicMixTrack[],
  ) {
    this.setTracks(tracks);
  }

  public load() {
    this.player.load(this.audio);
  }

  public setTracks(tracks: MusicMixTrack[]) {
    this.breakpoints = [0];
    this.tracks = tracks;
    for (let i=0; i<tracks.length; i++) {
      this.breakpoints.push(this.duration + toSeconds(parse(this.tracks[i].duration)));
    }
  }

  public get isPlaying(): boolean {
    return this.player.src === this.audio && !this.player.isPaused;
  }

  public get currentTrack() {
    const t = this.player.progress;
    for (let i=0; i<this.breakpoints.length; i++) {
      if (t < this.breakpoints[i]) {
        return i - 1;
      }
    }
    return this.tracks.length - 1;
  }

  public play(track?: number) {
    if (track !== undefined) {
      if (track === this.currentTrack && this.player.isPaused) {
        this.player.play(this.audio);
      } else {
        this.player.skipTo(this.breakpoints[track] + 0.01);
        this.player.play(this.audio);
      }
    } else {
      this.player.play(this.audio);
    }
  }

  public skipNext() {
    if (this.currentTrack >= this.tracks.length - 1) {
      this.player.skipTo(0);
      this.player.pause();
    } else {
      this.play(this.currentTrack + 1);
    }
  }

  public skipPrev() {
    if (this.currentTrack > 0) {
      this.play(this.currentTrack - 1);
    } else {
      this.skipTrackTo(0);
    }
  }

  public skipTrackTo(seconds: number) {
    this.player.skipTo(this.breakpoints[this.currentTrack] + seconds);
  }

  public get duration(): number {
    return this.breakpoints.length > 0
      ? this.breakpoints[this.breakpoints.length - 1]
      : 0;
  }

  public get currentTrackDuration() {
    return this.trackDuration(this.currentTrack);
  }

  public get currentTrackProgress() {
    return this.player.progress - this.breakpoints[this.currentTrack];
  }

  public get currentTrackData() {
    return this.tracks[this.currentTrack];
  }

  public trackBegin(track: number, time?: number) {
    if (time) {
      this.breakpoints[track] = time;
    }
    return this.breakpoints[track];
  }

  public trackEnd(track: number, time?: number) {
    return this.trackBegin(track + 1, time);
  }

  public trackDuration(track: number) {
    return this.trackEnd(track) - this.trackBegin(track);
  }
}
