interface IIntersectionObserverUtilities {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
}

function buildObserver(settings: IIntersectionObserverUtilities) {
  const { callback, options } = settings;

  const observer = new IntersectionObserver(callback, options);

  return {
    observer,
  };
}

export { buildObserver };
