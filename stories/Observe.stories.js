import React from 'react';
import { action } from '@storybook/addon-actions';
import { Observe } from "../src"
import { Card } from './Components/Card'

export default {
  title: 'Observe',
};

export const notifyWhenAppears = () => {
  const [intersected, setIntersected] = React.useState(false)

  function onIsIntersecting(entry) {
    setIntersected(true)
  }

  return (
    <>
      <Card>
        1
      </Card>
      <Card>
        2
      </Card>
      <Card>
        3
      </Card>
      <Card>
        4
      </Card>
      <Card>
        5
      </Card>
      <Card>
        6
      </Card>
      <Observe
        options={{ threshold: 0 }}
        isIntersecting={onIsIntersecting}
        triggersOnce
      >
        <Card>
          {intersected ? 'Intersected' : 7}
        </Card>
      </Observe>
      <Card>
        8
      </Card>
      <Card>
        9
      </Card>
      <Card>
        10
      </Card>
    </>
  );
}

export const notifyRatio = () => {
  const [first, setFirst] = React.useState(0)
  const [second, setSecond] = React.useState(0)

  return (
    <>
      <Card>
        1
      </Card>
      <Card>
        2
      </Card>
      <Card>
        3
      </Card>
      <Observe
        options={{
          threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }}
        unobserve={(entry) => entry.intersectionRatio > 0.99}
        isIntersecting={(entry) => setFirst(Math.ceil(entry.intersectionRatio * 100))}
      >
        <Card blue>
          4 is {first}
        </Card>
      </Observe>
      <Observe
        options={{
          threshold: [0, 0.25, 0.5, 0.75, 1]
        }}
        unobserve={(entry) => entry.intersectionRatio > 0.99}
        isIntersecting={(entry) => setSecond(Math.ceil(entry.intersectionRatio * 100))}
      >
        <Card blue>
          5 is {second}
        </Card>
      </Observe>
      <Card>
        6
      </Card>
    </>
  )
}

notifyWhenAppears.story = {
  name: 'Notify when appears',
};

notifyRatio.story = {
  name: 'Notify every time given element has passed for ratio',
};
