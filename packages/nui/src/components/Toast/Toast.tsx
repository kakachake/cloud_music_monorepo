import { FunctionComponent } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import style from "./Toast.module.css";
import { globalControl, useQueue } from "./useQueue";
import "./transition.css";
const Toast: FunctionComponent = () => {
  const [queue] = useQueue();
  return (
    <div className={style.toast}>
      <TransitionGroup>
        {queue.map((el) => (
          <CSSTransition key={el._tid} classNames="slide" timeout={500}>
            <div
              className={`${style.item} ${style[el.type]}`}
              onClick={() => globalControl.rm(el._tid)}
            >
              <div className={`${style.itemContent}`}>{el.message}</div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Toast;
