import { useEffect, useRef } from "react";

interface IntersectionObserverProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  callback: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = ({
  ref,
  callback,
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
}: IntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          callback();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.current.observe(ref.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref, callback, root, rootMargin, threshold]);
};

export default useIntersectionObserver;
