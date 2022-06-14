export declare const useClick: ({ clickFn, doubleFn }: {
    clickFn: (...args: any[]) => void;
    doubleFn: (...args: any[]) => void;
}, delay?: number) => ((this: any, ...args: any[]) => void)[];
