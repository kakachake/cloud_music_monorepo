import React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
interface SwiperItemProps {
  children:
    | React.ReactElement<any, any>[]
    | React.ReactElement<any, any>
    | string
    | (string | JSX.Element)[];
  index?: number;
  curIndex?: number;
  style?: any;
}

const SwiperItem: FunctionComponent<SwiperItemProps> = (props) => {
  let { children } = props;
  const { index, curIndex } = props;
  if (!Array.isArray(children)) {
    children = [children];
  }
  children = children?.map((o, i) => {
    return React.cloneElement(o as React.ReactElement, {
      key: i,
    });
  });
  return <SwiperItemWrap style={{ ...props.style }}>{children}</SwiperItemWrap>;
};

export default SwiperItem;

const SwiperItemWrap = styled.div`
  width: 540px;
  height: 200px;
  display: inline-block;
  position: absolute;
  z-index: 1;
  transition: all 0.5s ease-in-out;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
