import { ElementType } from "react";

// Observe component props
export interface IProps {
  options?: IntersectionObserverInit; // Intersection observer options
  triggersOnce?: boolean; // Boolean props which would say if observer must unsubcribe after first isIntersecting event
  as?: ElementType; // Element type which will surround to children props
  // Function that It will be executed every time element is intersecting root element
  isIntersecting?(entry: IntersectionObserverEntry): void;
  // Function that It will be executed every time element is not longer intersecting root element
  isNotIntersecting?(entry: IntersectionObserverEntry): void;
  // Boolean function which it will say if target element will not observe the target element anymore
  unobserve?(entry: IntersectionObserverEntry): boolean;
  onEndObserving?(entry: IntersectionObserverEntry): void;
}
