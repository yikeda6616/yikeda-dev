---
templateKey: blog-post
title: Gulp v4.0 でHTML5(Pug) + CSS3(Sass)の爆速コーディング環境構築
date: 2019-04-24T09:30:00.000Z
featuredpost: true
featuredimage: /img/gulp-pug-sass.png
description: gulp v4 を使いPugとSassでコーディングする際のスターターを作りました。
tags:
  - gulp
  - gulp-v4
  - Pug
  - Sass
  - Frontend
  - Markup
---

![gulp-sass-pug](/img/gulp-pug-sass.png)

普段マークアップをする際 gulp を使って pug, sass, js minify, css autoprefix, 画像圧縮などを諸々一括で行なっているのですが、gulp のバージョンがいつの間にか 4.0 になり色々変わっていたので重い腰をあげてリファクタリングしました。

`.task`が非推奨になったことで書き方が大幅に変わっており
その際に gulp v4 の gulpfile.js のサンプルがググってもあまり出てこなかったので、自分の設定を紹介します。

Pug や Sass の学習コストは低いのでまだ使ったことがないという人にもこれを機にぜひさわっていただきたいです。

特に Pug は html の閉じタグが不要なので恩恵が非常に大きいです。コード量が圧倒的に短くなります。

## この記事の対象読者

- マークアップをする機会が多い方
- Pug や Sass といったプリプロセッサーで冗長なマークアップを効率化したい方

## この設定で自動化している項目

- Pug->HTML5 ファイル保存時自動コンパイル(HTML は整形された状態で出力）
- Pug コンパイルエラー時 notification 表示
- Sass->CSS3 ファイル保存時自動コンパイル
- CSS3 コンパイル時 ベンダープリフィックス自動補完
- CSS3 コンパイル時 minify したファイルを別途保存(html からは minify した方を読み込んでいます)
- JS 保存時 minify
- IMG フォルダに画像を放り込むと自動で圧縮
- BrowserSync ファイル変更時オートリロード

## 実行環境

```shell
$ gulp -v
CLI version 2.1.0
Local version 4.0.0

$ node -v
v10.15.3
```

## 使い方

[GitHub リポジトリ](https://github.com/yikeda6616/gulp-static-starter-v4)からダウンロードまたは`git clone`できます

```shell
$ git clone https://github.com/yikeda6616/gulp-static-starter-v4
$ mv gulp-static-starter-v4 my-project # フォルダをリネーム
$ cd my-project # プロジェクトフォルダに移動
```

プロジェクトフォルダに移動したらパッケージをインストールします。

gulp のグローバルインストールが済んでいないかたは

```shell
$ npm i -g gulp # gulp cliのグローバルインストール
```

```shell
$ npm install
```

プロジェクトフォルダ内で`gulp`コマンドを叩いてプロジェクトを開始できます

```shell
$ gulp
```

## ディレクトリ構成

`node_module/`は省略しています。

```shell
~/my-project ❯❯❯ tree
.
├── dist # コンパイル後の出力されるファイル群
│   ├── css
│   │   ├── main.css
│   │   └── main.min.css
│   ├── img
│   │   └── logo.png
│   ├── index.html
│   └── js
│       └── main.min.js
├── gulpfile.js # gulpの設定ファイル
│   ├── index.js
│   └── modules.js
├── package-lock.json
├── package.json
├── readme.md
└── src # 実際に編集するファイル群
    ├── img
    │   └── logo.png
    ├── js
    │   └── main.js
    ├── pug
    │   ├── _layout.pug
    │   ├── include
    │   │   └── _includetest.pug
    │   └── index.pug
    └── scss
        ├── _reset.scss
        └── main.scss

11 directories, 17 files
```

`dist/`はコンパイル後のアウトプットが出力されるディレクトリです。
`src/`が実際に pug, sass, js などを編集していくことになるディレクトリです。

`gulpfile.js/`フォルダには設定の内容が入っています。

module が多いので`gulpfile.js`をディレクトリ化し、中に`index.js`と`modules.js`に分割しています。

**gulpfile.js/index.js**

```js
const { src, dest, parallel, watch } = require('gulp');
const $ = require('./modules.js');
const uglify = $.composer($.uglifyes, $.composer);

function html() {
  return src(['./src/pug/*.pug', '!./src/pug/**/_*.pug'])
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      $.pug({
        pretty: true
      })
    )
    .pipe(dest('./dist'))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true
      })
    );
}

function css() {
  return src('./src/scss/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .on('error', $.sass.logError)
    .pipe(
      $.autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe($.sourcemaps.write())
    .pipe(dest('./dist/css'))
    .pipe(
      $.rename({
        suffix: '.min'
      })
    )
    .pipe($.minifyCSS())
    .pipe(dest('./dist/css'))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true
      })
    );
}

function js() {
  return src('./src/js/*.js', { sourcemaps: true })
    .pipe($.plumber())
    .pipe(uglify({ output: { comments: /^!/ } }))
    .pipe(
      $.concat('main.min.js', {
        newLine: '\n'
      })
    )
    .pipe(dest('./dist/js', { sourcemaps: true }))
    .pipe(
      $.browserSync.reload({
        stream: true,
        once: true
      })
    );
}

function img() {
  return src('./src/img/**')
    .pipe($.changed('./dist/img/'))
    .pipe(
      $.imagemin({
        optimizationLevel: 3
      })
    )
    .pipe(dest('./dist/img/'));
}

function bs() {
  $.browserSync.init({
    server: {
      baseDir: './dist/'
    },
    notify: true,
    xip: false
  });
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.bs = bs;
exports.img = img;

exports.default = parallel([html, css, js, img, bs], () => {
  watch('./src/pug/**', html);
  watch('./src/scss/**', css);
  watch('./src/js/**', js);
  watch('./src/img/**', img);
});
```

**gulpfile.js/modules.js**

```js
module.exports = {
  pug: require('gulp-pug'),
  sass: require('gulp-sass'),
  minifyCSS: require('gulp-csso'),
  concat: require('gulp-concat'),
  browserSync: require('browser-sync'),
  plumber: require('gulp-plumber'),
  notify: require('gulp-notify'),
  autoprefixer: require('gulp-autoprefixer'),
  sourcemaps: require('gulp-sourcemaps'),
  rename: require('gulp-rename'),
  imagemin: require('gulp-imagemin'),
  changed: require('gulp-changed'),
  uglifyes: require('uglify-es'),
  composer: require('gulp-uglify/composer')
};
```

## Pug について

頭にアンダースコア`_`を入れた pug ファイルは`dist/`に html ファイルとして作成されません。
パーツに切り分けてインクルードするファイルはアンダースコアをつけてください(`_header.js`, `_footer.js`など)

これを忘れると\_header.html など不要なファイルが dist に出力されてしまいます。

Pug の実際の記法は[公式ドキュメント](https://pugjs.org/api/getting-started.html)で確認すると良いと思います。

## Sass について

こちらも同様にインクルードするファイルにはアンダースコア`_`を名前の先頭につけてください。

---

質問や改善案などありましたら Twitter[@yikeda6616](https://twitter.com/yikeda6616)までご指摘下さい m(\_\_)m
