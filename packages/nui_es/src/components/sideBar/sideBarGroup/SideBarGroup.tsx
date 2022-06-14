import React from "react";
import { FunctionComponent } from "react";
import style from "./SideBarGroup.module.css";
interface SideBarGroupProps {
  title?: string;
  children: React.ReactElement<any, any>[] | React.ReactElement<any, any>;
  activeId?: number | string;
  route?: boolean;
}

const SideBarGroup: FunctionComponent<SideBarGroupProps> = (props) => {
  const { title, activeId, route } = props;
  let { children } = props;
  if (!Array.isArray(children)) {
    children = [children];
  }
  children = children?.map((o, i) => {
    return React.cloneElement(o, {
      activeId,
      active: route
        ? activeId === o.props.href || o.props.regPath?.test(activeId)
        : activeId === o.props.id,
    });
  });
  return (
    <div className={style.groupWrap}>
      <div className={style.groupTitle}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default SideBarGroup;
