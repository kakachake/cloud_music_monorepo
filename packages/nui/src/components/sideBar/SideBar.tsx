import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import style from "./SideBar.module.css";
interface SideBarProps {
  children: React.ReactElement<any, any>[] | React.ReactElement<any, any>;
  activeId?: number | string;
  route?: boolean;
}

const SideBar: FC<SideBarProps> = (props) => {
  const { route = false } = props;
  let activeId = props.activeId;
  let children = props.children;
  activeId = route ? useLocation().pathname : activeId;
  if (!Array.isArray(children)) {
    children = [children];
  }

  children = children?.map((o, i) => {
    return React.cloneElement(o, {
      activeId,
      route,
    });
  });
  return <div className={style.sideBar}>{children}</div>;
};

export default SideBar;
