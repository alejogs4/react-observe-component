import React from "react";
import { IProps } from "./types";
import { useObserve } from "./useObserve";

function cleanObserveProps(observeProps: IProps): object {
  const propsClone: IProps = { ...observeProps };

  delete propsClone.isIntersecting;
  delete propsClone.isNotIntersecting;
  delete propsClone.options;
  delete propsClone.triggersOnce;
  delete propsClone.unobserve;
  delete propsClone.onEndObserving;
  delete propsClone.as;

  return propsClone;
}

/**
 * Component which will abstract intersection observer behaviour
 * @param props
 */
const Observe: React.FC<IProps> = (props) => {
  const { as: Component = "div", children, ...restProps } = props;

  const cleanedObserverProps = cleanObserveProps(restProps);
  const { elementRef } = useObserve(props);

  return (
    <Component ref={elementRef} {...cleanedObserverProps}>
      {children}
    </Component>
  );
};

export { Observe };
