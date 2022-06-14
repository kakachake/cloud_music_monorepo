import { FC } from 'react';
interface VideoPlayerProps {
    width?: number;
    height?: number;
    src?: string;
    urls?: {
        url: string;
        type: string;
        id: string;
        br: string;
    }[];
    defaultId?: string | number;
    poster?: string;
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
    onCanPlay?: () => void;
    onCanPlayThrough?: () => void;
    onEnded?: () => void;
    onError?: () => void;
    onPause?: () => void;
    onPlay?: () => void;
    onPlaying?: () => void;
    onSeeked?: () => void;
    onSeeking?: () => void;
    onStalled?: () => void;
    onWaiting?: () => void;
}
declare const VideoPlayer: FC<VideoPlayerProps>;
export default VideoPlayer;
