import { useRef } from "react";

export default function useIntersectionObserver(callback: () => void) {
  const observer = useRef(
    new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 } //요소가 완전히 보일 때 가시성 변화를 감지
    )
  );

  // Element는 DOM 요소를 나타내는 타입임
  const observe = (element: Element) => {
    observer.current.observe(element);
  };

  const unobserve = (element: Element) => {
    observer.current.unobserve(element);
  };

  return [observe, unobserve];
}
