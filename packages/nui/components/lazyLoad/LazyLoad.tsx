import React, { useEffect, useRef } from "react";
import { FC } from "react";

interface LazyLoadProps {
  children: React.ReactNode;
  onIntersecting?: () => void;
}

const LazyLoad: FC<LazyLoadProps> = (props) => {
  const { children, onIntersecting } = props;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    //监听元素是否出现在视口中
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("在视口", entry.target);
          onIntersecting && onIntersecting();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(ref.current);
  }, []);
  return <div ref={ref}>{children}</div>;
};

export default LazyLoad;
