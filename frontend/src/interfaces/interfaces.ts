export interface Video {
    name: string;
    duration: string;
    videoId: string;
}

export interface State {
  playList: Video[];
}