---
templateKey: blog-post
title: 【React Hooks】How to use Custom Hook
date: 2019-06-21 12:58:53
featuredpost: false
featuredimage: /img/og-image.jpg
description: Newly added feature React Hooks API released from React v16.8
tags:
  - React
  - React-Hooks
  - TypeScript
  - Custom-Hooks
---

<!-- TODO: Add featuredimage -->

<br>

Here I wrote an example of the implementation of simple way to organize your own hook.

<br>

At first, write every code in a FC Component, including state manipulation and style.

Then, break them into two separate files to organize presentational component and container component.

<div style="margin-bottom: 100px"></div>

**Starting code src/App.tsx**

```tsx
const App: FC = () => {
  const [someValue, setSomeValue] = useState(INITIAL_STATE);

  const someFunc = () => {
    // just an example
  };

  useEffect(() => {
    // componentDidMount && componentDidUpdate
    return () => {
      // componentWillUnmount
    };
  }, []);

  return (
    <div>
      <button onClick={someFunc}>{state}</button>
    </div>
  );
};
```

<div style="margin-bottom: 100px"></div>

Now separate all logics and styles.

<br>

**src/components/App.tsx(Presentational Component)**

```tsx
interface AppProps {
  someValue: number;
  someFunc: () => void;
}

const AppComponent: FC<AppProps> = ({ someValue, someFunc }) => (
  <div>
    <button onClick={props.someFunc}>props.state</button>
  </div>
);
```

<div style="margin-bottom: 100px"></div>

**src/container/App.tsx(Container Component)**

```tsx
const useSomething = () => {
  const [someValue, setSomeValue] = useState(INITIAL_STATE);

  const someFunc = () => {
    // just a example
  }

  useEffect(()=>{
    // componentDidMount && componentDidUpdate
    return ()=> {
      // componentWillUnmount
    }
  }, []);

  return [someValue, someFunc];
}

const AppContainer = () => {
  [someValue, someFunc] = useSomething;

  return <AppComponent someValue={someValue}, someFunc={someFunc}>;
}
```

<div style="margin-bottom: 100px"></div>

Some comments to explain useEffect

```tsx
const useSomething = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const someFunc = () => {
    // just a example
  };

  useEffect(() => {
    // Anonymous func as a first parameter
    // componentDidMount && componentDidUpdate
    return () => {
      // return value is optional
      // componentWillUnmount
    };
  }, []);
  // Pass an empty array as a second argument.
  // This tells React that the effect doesn't depend on any values from props or state, so it never needs to re-run.
  // This way, the props and state inside the effect will always have their initial values.
  // See more detail at https://reactjs.org/docs/hooks-effect.html

  return [state, someFunc];
};
```

In this way the component is more maintainable and scalable.
