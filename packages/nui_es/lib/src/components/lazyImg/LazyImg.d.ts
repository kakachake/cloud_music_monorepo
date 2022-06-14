import { FC } from 'react';
interface LazyLoadProps {
    placeholder?: React.ReactNode;
    src: string;
    className?: string;
    threshold?: number;
}
declare const LazyImg: FC<LazyLoadProps>;
export default LazyImg;
