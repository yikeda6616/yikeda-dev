---
templateKey: blog-post
title: Intro to Framer X
date: 2019-07-21 10:19:33
featuredpost: false
featuredimage: /img/framerx/og-framerx.jpg
description: Framer Xのハンズオンmeetupに参加してきました。
tags:
  - meetup
  - UI/UX
  - Design
  - FramerX
---

個人的にかなり使い勝手が好きでよかったけど Sketch から乗り換えるかと言われるとまだ怪しい

![eyecatch](/img/framerx/og-framerx.jpg)

7 月 21 日に [Intro to Framer X(for beginners)](https://www.meetup.com/Get-together-learn-and-make-some-design/events/263145321/) に参加してきた記録です。

<br>

### 公式サイト

[framer.com](https://www.framer.com/)

<br>

### Framer X と Sketch の比較

|              |         Framer X         |           Sketch           |
| ------------ | :----------------------: | :------------------------: |
| Price        | \$12(USD)/Mo(個人プラン) | \$99(USD)/1 year of update |
| Live Preview |         &check;          |          &check;           |
| Cloud Share  |         &cross;          |          &check;           |
| Animation    |         &check;          |         &triangle;         |

<br>

### 今回作ったプロトタイプ

- ホーム画面
- ハンバーガーメニュー（引き出しのアニメーション有）
- スライドショー（アニメーション有）
- レコメンデーション（横スクロール有）

![demo](/img/framerx/ss/demo.jpg)

### Packages

豊富なアドオンがありサクッとインストールしてすぐ使えます。

![](/img/framerx/ss/plugins.jpg)

##### 今回使ったものは以下：

- iPhoneX Kit

  iPhoneX の UI キット。画面上部のステータスバーや画面下部のメニューバーはここから取ってきました。

- Unsplash

  Sketch にあるのと似たような感じ。Unsplash のイメージをランダムに入れてくれる。

- Youtube

  Youtube 動画埋め込み用。プレビューすると**実際にプレイヤーが表示され再生もできる**。

  ![youtube](/img/framerx/ss/youtube.jpg)

- Icon Generator

  各種アイコンサービスからアイコンを使える。メニューアイテムに使用。

他にもたくさんパッケージがあるようで、いろいろ便利っぽいです。

<br>

### Frame という概念

Frame というのは簡単に言うとどのデザインツールにもよくある四角い箱やら丸やらを作るツールなんですが、使ってて驚いたのが、**勝手に要素が入れ子になる**こと

`⌘ + G`とかで要素をグルーピングしてコンポーネントごとに整理するっていうのはどのデザインツールでも行うんだけど、Framer の場合その作業が不要でした。

Frame を作ってその中で例えばテキスト入力などを行うと、自動的に その Frame の中に入れ子構造でグルーピングされる。

Frame のなかにさらに Frame を作る場合は `G`で**Drawing Mode**に入ることでその中に作った要素がグルーピングされる。

<br>

##### 以下画像は Drawing Mode で再生ボタンを作っているところ

![](/img/framerx/ss/button.jpg)

このあたりの使い勝手は非常に良くて、デザインの時点でコンポーネント指向がかなり簡単に実現されている印象。

### Component

`⌘ + K`で Frame を**コンポーネント化**しインスタンスを生成することができます。

こちらは Sketch やイラレでいう**シンボル**と同等の機能なので特筆すべきことはなし。

強いて言えばコンポーネントを作成するとサイドバーに登録されるので他のアプリよりも使いやすかったかもしれない。

### Stacks

おそらく Framer の特有の目玉機能。

スタックの中にまとめられた要素は`display: flex;`の要領でうまいこと配置してくれます。

スタックエリアを作り
![stack](/img/framerx/ss/stack-1.jpg)

要素を放り込んで並び方を指定して
![stack](/img/framerx/ss/stack-2.jpg)

使いたい場所に移動する(ここでは Overflow: hidden;を指定しています)
![stack](/img/framerx/ss/stack-3.jpg)

もちろんオプションで space-around や space-between などの flex 用のプロパティを変更できます。

個人的にこれはめちゃくちゃ使いやすかった。

### Page

ページ機能はスライドショー部分で使いました。

スタックと同じような手順でページエリアを作り、その中に入れたい Frame を放り込んでいくといい感じに並べてくれて、アニメーションもオプションから選んでつけることができる。超簡単。

これもシンプルで使いやすかったので高評価。

### Link

クリックしたら画面遷移やメニューの開閉と言った動作を実装することももちろん可能。

ただこの辺は XD のプロトタイピングとほとんど同じなので割愛。

### Live Preview

Framer X には **Live Preview**機能がありリアルタイムでデザインを確認・シェアできる。

QR コードも発行してくれるのでスマホでも簡単に開ける。

ただし、**Framer X を閉じると共有リンクも切れてしまう**

Sketch Cloud の場合だとクラウド上にアップロードすれば PC を閉じても共有が続けられ、フィードバックなども残せて便利なんだけど、Framer X にも Cloud Upload は欲しいですが、もしかするとプラグインとか探したら追加できるのかも。

共有についてはやっぱり Sketch Cloud が今の所一番理想系かな。

### 結論

まだ数時間しか使っていないので全容は理解できていないかもしれないけど、**とにかくシンプルで使いやすかった**

アニメーション周りのプロトタイプの実現で魅力的ではあったけど、わざわざ月額サブスク購入して乗り換えるほどでは無いかなという感じ。

あと細かいところだけど真っ白 UI 苦手なので**ダークモードが欲しい**。
