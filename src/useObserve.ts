import React from "react";
import { IProps } from "./types";

function useObserve(useObserveOptions: IProps) {
  const {
    isIntersecting = () => {},
    isNotIntersecting = () => {},
    onEndObserving = () => {},
    options,
    triggersOnce = false,
    unobserve = () => false,
  } = useObserveOptions;

  /**
   * Reference which will contain element to observe
   */
  const elementRef = React.useRef<HTMLDivElement>(null);

  /**
   * Callback to listen for changes in element intersection state
   * @param entries
   * @param observer
   */
  function onIntersectionObserverEvent(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) {
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
    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersectionObserverEvent,
      options,
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    /**
     * Disconnect observer as soon as component unmount
     */
    return () => {
      observer.disconnect();
    };
  }, [elementRef.current]);

  return { elementRef };
}

export { useObserve };
