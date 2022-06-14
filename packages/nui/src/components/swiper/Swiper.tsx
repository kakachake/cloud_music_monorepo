import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import style from "./Swiper.module.css";

interface SwiperProps {
  children: React.ReactElement<any, any>[] | React.ReactElement<any, any>;
}

const Swiper: FC<SwiperProps> = (props) => {
  const { children: child } = props;
  const [curIndex, setCurIndex] = useState(5);

  const timerRef = useRef<NodeJS.Timer | null>(null);
  let children = (Array.isArray(child) ? child : [child]) as React.ReactElement<
    any,
    any
  >[];
  useEffect(() => {
    if (children.length) {
      timerRef.current = setInterval(() => {
        handleChangeIndex(1);
      }, 3000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [curIndex, children]);
  const [swiperWidth, setSwiperWidth] = useState(
    document.getElementById("swiper")?.clientWidth || 0
  );
  const onResize = useCallback(() => {
    setSwiperWidth(document.getElementById("swiper")?.clientWidth || 0);
  }, []);
  useEffect(() => {
    setSwiperWidth(document.getElementById("swiper")?.clientWidth || 0);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
  children = children?.map((o, i) => {
    return React.cloneElement(o, {
      index: i,
      curIndex,
      style: {
        ...(i !== (curIndex + children.length + 1) % children.length
          ? {
              transform: `translate3d(-50%,0, -10px)`,
              zIndex: 1,
              left: "50%",
            }
          : {}),
        ...(i === (curIndex + children.length - 1) % children.length
          ? {
              left: 0,
              transform: "rotate3d(0,1,0,2deg)",
              transformOrigin: "left center",
              zIndex: 2,
            }
          : {}),
        ...(i === (curIndex + children.length + 1) % children.length
          ? {
              left: swiperWidth - 540 + "px",
              zIndex: 2,
              transform: " rotate3d(0,1,0,-2deg)",
              transformOrigin: "right center",
            }
          : {}),
        ...(i === curIndex
          ? { transform: `translate3d(-50%, 0, 5px)`, zIndex: 3, left: "50%" }
          : {}),
      },
    });
  });
  const handleChangeIndex = (index: number) => {
    setCurIndex((curIndex + index) % children.length);
  };
  return (
    <div id="swiper" className={style.swiperWrap}>
      <div className={style.dot}>
        {/* 遍历生成div */}
        {children.map((o, i) => {
          return (
            <div
              key={i}
              className={`${style.dotItem} ${
                i === curIndex ? style.active : ""
              }`}
              onMouseEnter={() => {
                setCurIndex(i);
              }}
            ></div>
          );
        })}
      </div>
      <div className={style.swiper}>
        <div className={style.btn}>
          <div onClick={() => handleChangeIndex(-1)} className={style.left}>
            <LeftOutlined />
          </div>
          <div onClick={() => handleChangeIndex(1)} className={style.right}>
            <RightOutlined />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Swiper;
