---
templateKey: blog-post
title: create-react-appでSassやCSS-moduleを使う方法
date: 2019-02-07T02:22:19.992Z
featuredpost: true
description: 2018年10月のcreate-react-app v2のリリースで色々簡単になったようなので軽くメモ
tags:
  - JavaScript
  - React
  - create-react-app
  - CSS
  - Sass
  - CSS-Module
---

少し前まで
[create-react-app で SASS ファイルを使う方法](https://qiita.com/chieeeeno/items/1dda5c47d4f1e36408e8)
こちらの方法で sass を使っていたのですが、今はよりシンプルに使えるようになったようなので、自分用にまとめておきます。

## プロジェクトフォルダを生成

Node.js が入っていれば下記のコマンドを叩いてすぐにスタートできます。(node.js のインストールは割愛します）

```
$ npx create-react-app my-project
```

\*npx コマンドは npm version5.2 以降から利用できます。
ローカルに create-react-app をインストールしていなくても、npm レジストリから最新版パッケージを取得してプロジェクトを生成してくれるとのことです。（詳細は[公式ドキュメント](https://github.com/facebook/create-react-app)を参照。）

## Sass をインストール

```
$ cd my-project #プロジェクトフォルダに移動
$ yarn add -D node-sass
```

yarn でなく`npm i -D node-sass`でも ok です。

以前は他にも色々インストールしたり webpack の config いじったりで環境設定に時間がかかったわけですが、今は node-sass 入れるだけで OK なので話が早いです。

## 既存の css ファイルを scss にリネーム

`./src/App.css`を`./src/App.scss`にリネームします。

それが終わったら、`./src/App.js`の 3 行目にある`import './App.css'`の拡張子も併せて`import './App.scss'`に変更します。

これだけでもう sass が使える状態になったので、下記コマンドでアプリを起動してみましょう。

```
$ yarn start
```

デフォルトの react テンプレートが確認できると思います。

あとは`./src/_variables.scss`など作成して`App.scss`から読み込んでみたり、色々試してみるとちゃんと使えるのが確認できると思います。

## ベンダープレフィックスについて

ベンダープレフィックスは create-react-app で build した際に autoprefixer が自動でつけてくれます。

autoprefix のコンフィグは`package.json`の`"browserslist"`に記載されていますので、追記して IE10 などに対応することもできます。

```package.json
...
"browserslist": [
  ">0.2%",
  "not dead",
  "not ie <= 11",
  "not op_mini all"
]
...
```

## CSS Module を使う方法

`[name].module.css`または`[name].module.scss`のようにファイル名を付ければモジュール化されます。

css モジュールのスタイルのアウトプットは`[filename]_[classname]__[hash]`のような命名規則で変換されます。

---

至ってシンプルで使いやすくて助かります

参考：[How to use Sass and CSS Modules with create-react-app](https://blog.bitsrc.io/how-to-use-sass-and-css-modules-with-create-react-app-83fa8b805e5e)（英語）
