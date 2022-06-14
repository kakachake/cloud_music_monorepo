export declare function parseSecondToTime(second: number): string;
export declare function pad(num: number): string | number;
export declare function formatNumber(num: number): string | number;
export declare function formatTime(time: number | string, format?: string): string;
export declare function onDoubleClick(): ({ singleClick, doubleClick }: {
    singleClick: () => void;
    doubleClick: () => void;
}) => void;
export declare const parseLrc: (lrc: string) => {
    lrc: string;
    time: number;
}[];
export declare function throttle(fn: (...args: any) => void, delay: number): (this: any, ...args: any[]) => void;
export declare function debounce(fn: (...args: any) => void, delay: number): (this: any, ...args: any[]) => void;
export declare function mainContentScroll(to: number): void;
export declare function isScrollBottom(el: Element): boolean;
export declare function n2br(str: string): string;
export declare function splitN(str: string): string[];
export declare function parseBr(br: number): "超清" | "高清" | "标清" | "流畅" | "";
