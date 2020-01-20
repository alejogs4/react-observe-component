import 'babel-polyfill'; // Reason for this code https://github.com/babel/babel-preset-env/issues/112
// packages
import { render, wait } from "@testing-library/react"
import React from "react"
// components
import { Observe } from "../src"
import { buildIntersectionObserverMock } from "../src/tests-utils"

afterEach(() => {
  jest.resetAllMocks()
})

describe("<Observe />", () => {
  it("should render a div to contain children element", () => {
    global.IntersectionObserver = () => buildIntersectionObserverMock()

    const { getByText } = render(<Observe>Element</Observe>)
    const element = getByText("Element")
    expect(element.tagName.toLowerCase()).toBe("div")
  });

  it("should render an article if as prop it\'s article", () => {
    global.IntersectionObserver = () => buildIntersectionObserverMock()

    const { getByText } = render(<Observe as="article">Element</Observe>)
    const element = getByText("Element")
    expect(element.tagName.toLowerCase()).toBe("article")
  })

  it("should call observer disconnect method as soon as the component is unmount", async () => {
    const observer = buildIntersectionObserverMock()

    global.IntersectionObserver = () => {
      return observer
    }

    const { unmount } = render(<Observe>Element</Observe>)

    unmount()

    await wait(() => {
      expect(observer.disconnect).toHaveBeenCalledTimes(1)
    })
  })

  it("should execute isIntersecting callback if entry.isIntersecting it\'s true", async () => {
    const isIntersectingfn = jest.fn()
    global.IntersectionObserver = (c) => {
      c([{ isIntersecting: true }])
      return buildIntersectionObserverMock()
    }

    render(<Observe isIntersecting={isIntersectingfn}>Element</Observe>)

    await wait(() => {
      expect(isIntersectingfn).toHaveBeenCalledWith({ isIntersecting: true })
    })
  })

  it("should execute onEndObserving and isIntersecting when intersecting and triggersOnce props was set as true", async () => {
    const isIntersecting = jest.fn()
    const onEndObserving = jest.fn()
    const observer = buildIntersectionObserverMock()

    global.IntersectionObserver = (callback) => {
      callback([{ isIntersecting: true }], observer)
      return observer
    }

    render(<Observe isIntersecting={isIntersecting} onEndObserving={onEndObserving} triggersOnce>Element</Observe>)

    await wait(() => {
      expect(isIntersecting).toHaveBeenCalledTimes(1)
      expect(onEndObserving).toHaveBeenCalledTimes(1)
      expect(observer.disconnect).toHaveBeenCalled()
    })
  })

  it("should execute isNotIntersecting if entry object has isIntersecting property in false", async () => {
    const isNotIntersecting = jest.fn()

    global.IntersectionObserver = (callback) => {
      callback([{ isIntersecting: false }])
      return buildIntersectionObserverMock()
    }

    render(<Observe isNotIntersecting={isNotIntersecting}>Element</Observe>)

    await wait(() => {
      expect(isNotIntersecting).toHaveBeenCalledTimes(1)
    })
  })

  it("should call both onEndObserving and observer disconnect method if unobserve predicate is evaluated as true", async () => {
    const observer = buildIntersectionObserverMock()
    const onEndObserving = jest.fn()

    global.IntersectionObserver = (callback) => {
      callback([{ isIntersecting: false, intersectionRatio: 0.4 }], observer)
      return observer
    }

    render(
      <Observe onEndObserving={onEndObserving} unobserve={(entry) => entry.intersectionRatio > 0.3}>
        Element
      </Observe>
    )

    await wait(() => {
      expect(observer.disconnect).toHaveBeenCalled()
      expect(onEndObserving).toHaveBeenCalled()
    })
  })
})
