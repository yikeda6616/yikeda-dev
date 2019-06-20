---
templateKey: blog-post
title: 【React Hooks】カスタムフックの作り方
date: 2019-06-20 12:58:53
featuredpost: false
featuredimage: /img/og-image.jpg
description: React v16.8で追加されたReact Hooks APIのフックを自作する流れについて
tags:
  - React
  - React-Hooks
  - TypeScript
  - Custom-Hooks
---

<!-- TODO: Add featuredimage -->

React Hooks API を使ってカスタムフックを作るまでの流れをめちゃくちゃシンプルに書きます

とりあえず普通に Functional Component に全部書き、

その後、それらをまとめる処理をカスタムフックとして作り画面と分離するという流れで行います。

**ベースとなるコード src/App.tsx**

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

ここからロジックと画面を以下のように分離する

**src/components/App.tsx(画面, スタイル)**

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

**src/container/App.tsx(ロジック)**

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

フックの部分にコメントで説明つけるとこんな具合

```tsx
const useSomething = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const someFunc = () => {
    // just a example
  };

  useEffect(() => {
    // 第一引数に無名関数
    // componentDidMount && componentDidUpdateの処理
    return () => {
      // 戻り値は省略可能
      // componentWillUnmountの処理
    };
  }, []); // 再レンダリング時に配列内の要素をwatchして内容が変わっていなければ第一引数の無名関数を実行しない
  // 空の配列を渡すと初回のみ実行
  // 省略すると毎回実行

  return [state, someFunc];
};
```
