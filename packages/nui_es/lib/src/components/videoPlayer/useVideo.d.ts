/// <reference types="react" />
declare type UseVideoProps = [
    React.MutableRefObject<HTMLVideoElement | null>,
    {
        percent: number;
        currentTime: number;
        duration: number;
        isPlaying: boolean;
        isAdjust: React.MutableRefObject<boolean>;
        bufferProgress: number;
        onChangePercent: (per: number) => void;
        handleTogglePlay: () => void;
        loading: boolean;
        handleSetVolume: (volume: number) => void;
        handleToggleMute: (mute?: boolean) => void;
        ismuted: boolean;
        volume: number;
    }
];
export declare const useVideo: () => UseVideoProps;
export {};
