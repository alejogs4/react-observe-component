# Observe
Observe is a React component which makes use of [Intersection Observer API](https://ed.team) to notify through a declarative interface when the children element has been detected by the observer.

## Instalation

Install using yarn
```bash
yarn add react-observe-component
```

or using NPM
```bash
npm install react-observe-component
```

### Props
| Props        | Type           | Default | Required | Description |
| ------------- |:-------------:| :-----:| :--------:|------: |
| isIntersecting | `(entry) => void` 				| () => {} | false | Function which it will be executed if children element it is intersected |
| isNotIntersecting      | `(entry) => void`     |   () => {}| false | Function which it will be executed if children element it is not longer intersected |
| as      | string      |  div | false | Says which HTML tag it will be rendered by Observe component |
| onEndObserving | `() => void` | () => {} | false | Function which it will be executed as soon as the Observe component has left to observe children element |
| triggersOnce | Boolean      | false | false | Boolean value which indicates if after first isIntersecting execution Observer must no longer observe children element |
| unobserve | `(entry) => boolean`   | () => false | false | Boolean function that if returns true will make that Observe component left to observe children element |
| options | Intersection Observer options | {} | false | Intersection Observer options object |

### Options

| Name            | Type               | Default | Required |
| --------------- | ------------------ | ------- | -------- |
| root      | Element            | window  | false    |
| rootMargin  | string             | '0px'   | false |
| threshold   | number \| number[] | 0       | false

> For more information visit [Intersection observer docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## Usage
```javascript
import React from "react"
import { Observe } from "react-observe-component"

function YourComponent() {
  function isIntersecting(entry) {

  }

  function isNotIntersecting(entry) {

  }

  function onEndObserving() {

  }

  const unobserve = (entry) => entry.intersectionRatio > 0.3

  return (
    <section>
      <article>1</article>
      <article>2</article>
      <article>3</article>
      <Observe
        as="article"
        className="your-classname"
        isIntersecting={isIntersecting}
        isNotIntersecting={isNotIntersecting}
        unobserve={unobserve}
        onEndObserving={onEndObserving}
      >
        4
      </Observe>
      <article>5</article>
    </section>
  )
}
```

> This component receives every valid props which HTML tag defined in as prop can receive, An example of this is className prop in the above example