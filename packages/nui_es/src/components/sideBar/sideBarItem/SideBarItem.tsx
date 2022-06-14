import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarItemType } from "../type";
import style from "./SideBarItem.module.css";
interface SideBarItemProps extends SideBarItemType {
  children?: React.ReactNode;
}

const SideBarItem: FunctionComponent<SideBarItemProps> = (props) => {
  const { children, id, href, onClick, name, activeId, icon, active } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      href && navigate(href);
    }
  };

  return (
    <div onClick={handleClick}>
      <div className={`${style.sideBarItem} ${active ? style.active : ""}`}>
        <div className={style.icon}>{icon}</div>
        <div className="line1">{name}</div>
      </div>
    </div>
  );
};

export default SideBarItem;
