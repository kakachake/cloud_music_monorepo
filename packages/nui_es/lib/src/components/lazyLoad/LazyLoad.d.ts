import React from "react";
import { FC } from "react";
interface LazyLoadProps {
    children: React.ReactNode;
    onIntersecting?: () => void;
}
declare const LazyLoad: FC<LazyLoadProps>;
export default LazyLoad;
