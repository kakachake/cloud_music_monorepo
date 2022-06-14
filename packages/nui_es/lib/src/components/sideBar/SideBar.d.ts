import React, { FC } from "react";
interface SideBarProps {
    children: React.ReactElement<any, any>[] | React.ReactElement<any, any>;
    activeId?: number | string;
    route?: boolean;
}
declare const SideBar: FC<SideBarProps>;
export default SideBar;
