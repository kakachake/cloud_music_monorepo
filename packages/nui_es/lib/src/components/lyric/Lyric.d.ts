import { FunctionComponent } from 'react';
interface LyricProps {
    lrc: {
        lrc: string;
        time: number;
    }[];
    currentTime: number;
    _uid: string;
    mode?: 'white' | 'black';
    itemHeight?: number;
    itemFontSize?: number;
    showControl?: boolean;
    height?: number;
    control: {
        setCurrentTime: (time: number) => void;
        play: () => void;
    };
}
declare const Lyric: FunctionComponent<LyricProps>;
export default Lyric;
