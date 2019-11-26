---
templateKey: blog-post
title: Puppeteer.jsを使いターミナルから1コマンドでGitHubリポジトリを作成する
date: 2019-11-26 17:23:46
featuredpost: false
featuredimage: /img/og191126.png
description: 新しいプロジェクトを始める際に行う一連の手順をNode.jsで自動化してみました。
tags:
  - Node.js
  - Puppeteer.js
  - TypeScript
---

Puppeteer とシェルスクリプトの練習の一環として実装してみました。

なお Node.js のバージョンは 12.13.0 で実行しています。

## GitHub リポジトリ

[https://github.com/yikeda6616/create-gh](https://github.com/yikeda6616/create-gh)

## 公式ドキュメント

[Puppeteer](https://pptr.dev/)

[Node.js](https://nodejs.org/)

## 概要

コマンドラインから`create my-project-name`というコマンドを叩いた際に、以下を実行します。

**ヘッドレスブラウザ(Puppeteer)**

1. GitHub にアクセス
2. ログイン
3. GitHub リポジトリ作成画面に遷移
4. input に<my-project-name>を入力しリポジトリ作成

**ターミナル**

1. 特定のディレクトリにクローン
2. クローンしたディレクトリに移動
3. README.md を作成
4. ステージング、コミット、master にプッシュ
5. VSCode でプロジェクトを開く

という操作を一括で実行します。

## 手順

```
cd ~
git clone https://github.com/yikeda6616/create-gh
cd ~/create-gh
yarn
```

## `.env`を編集

```
vi ~/create-gh/.env # Edit .env
```

GitHub アカウント情報を入れます。

```
USERNAME=hogehoge
PASSWORD=fugafuga
```

## `.create-gh.sh`を編集

```
vi ~/create-gh/.create-gh.sh # Edit .create-gh.sh
```

シェルスクリプトのクローン先 URL のユーザー名を変更します。

```
function create() {
    cd ~/create-gh # Change directory as you like
    yarn start $1
    cd ~/Desktop # Change directory as you like
    git clone https://github.com/<github-username>/$1 # Change here to your GitHub username
    cd $1
    echo \# $1 > README.md
    git add .
    git commit -m "Initial commit"
    git push
    code .
}
```

## シェルから`.create-gh.sh`を読み込む

`.zshrc` または `.bash_profile` に以下を追加

```
source ~/create-gh/.create-gh.sh
```

上記編集後はターミナルの再起動が必要なので以下コマンドでリログ

```
$ exec $SHELL -l
```

## 使い方

```
create <your-project-name>
```

---

まだ改善点が色々あるんですがとりあえず動くところまでできました。

この後はディレクトリの選択や、Public/Private の選択など追加したいです（未定）
