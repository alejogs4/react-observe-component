import React, { ElementType } from "react";

// Observe component props
interface IProps {
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

/**
 * Component which will abstract intersection observer behaviour
 * @param props
 */
const Observe: React.FC<IProps> = (props) => {
  const {
    as: Component = "div",
    children,
    isIntersecting = () => {},
    isNotIntersecting = () => {},
    onEndObserving = () => {},
    options,
    triggersOnce = false,
    unobserve = () => false,
    ...restProps
  } = props;
  /**
   * Reference which will contain element to observe
   */
  const elementRef = React.useRef<HTMLDivElement>(null);

  /**
   * Callback to listen for changes in element intersection state
   * @param entries
   * @param observer
   */
  function onIntersectionObserverEvent(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      isIntersecting(entry);
      // Give a truthy triggersOnce we disconnect observer after first isIntersecting call
      if (triggersOnce) {
        onEndObserving(entry);
        observer.disconnect();
      }
    } else {
      isNotIntersecting(entry);
    }
    // If unobserve function returns true we disconnect observer
    if (unobserve(entry)) {
      onEndObserving(entry);
      observer.disconnect();
    }
  }

  React.useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(onIntersectionObserverEvent, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    /**
     * Disconnect observer as soon as component unmount
     */
    return () => {
      observer.disconnect();
    };
  }, []);

  return <Component ref={elementRef} {...restProps}>{children}</Component>;
};

export { Observe };
