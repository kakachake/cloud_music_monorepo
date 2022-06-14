import { FunctionComponent } from "react";
import { SideBarItemType } from "../type";
interface SideBarItemProps extends SideBarItemType {
    children?: React.ReactNode;
}
declare const SideBarItem: FunctionComponent<SideBarItemProps>;
export default SideBarItem;
