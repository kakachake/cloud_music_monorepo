import React from "react";
import { FunctionComponent } from "react";
interface SideBarGroupProps {
    title?: string;
    children: React.ReactElement<any, any>[] | React.ReactElement<any, any>;
    activeId?: number | string;
    route?: boolean;
}
declare const SideBarGroup: FunctionComponent<SideBarGroupProps>;
export default SideBarGroup;
