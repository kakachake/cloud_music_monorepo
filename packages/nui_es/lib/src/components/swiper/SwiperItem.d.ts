import React from "react";
import { FunctionComponent } from "react";
interface SwiperItemProps {
    children: React.ReactElement<any, any>[] | React.ReactElement<any, any> | string | (string | JSX.Element)[];
    index?: number;
    curIndex?: number;
    style?: any;
}
declare const SwiperItem: FunctionComponent<SwiperItemProps>;
export default SwiperItem;
