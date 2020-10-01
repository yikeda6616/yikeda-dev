---
templateKey: blog-post
title: 【Node.js入門】Expressで初めてのフルスタックWebアプリ開発
date: 2020-10-01 23:41:16
featuredpost: false
featuredimage: /img/og-image.jpg
description: 友人に教えた際に書いたドキュメントをちょっと清書しただけのもの
tags:
  - Node.js
  - Express.js
  - API
---

## ABOUT

バックエンドにランダムなパスワードを生成しjsonで返すAPIを立て、フロントからリクエストを送り、受け取ったjsonの内容をフロントにて表示する簡単なアプリを作ります。

Node.jsの実行環境は整っている前提で進めます。

### Table of Contents

1. **Static Part**
- Create Project
- Create Static Files

2. **Express Part**

- Install Express.js
- Serve Static Files

3. **API Part**

- Install password-generator
- Create API
- ~~Install Axios~~
- Fetch json data from API
- Display data on Front-end

---

### Create Project

```bash
mkdir my-express
cd my-express
yarn init -y # npm init -y と同じ
```

`git commit -m "Initialize Project"`

### Create Static Files

```bash
mkdir public
touch public/index.html
touch public/css/style.css
touch public/js/index.js
```

**public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <title>Password Generator</title>
</head>
<body>
	<h1>Password Generator</h1>
  <button>Generate</button>
  <script src="js/index.js"></script>
</body>
</html>
```

**style.css**

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

h1 {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
}

button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
}
```

`index.js` は取りえあず空白で大丈夫です。

`git commit -m "Add static files"`

### Install Express.js

ここからはバックエンドなのでプロジェクトルート直下で

```bash
yarn add express # npm install expressと同じ
```

`git commit -m "chore: Add express"`

### Serve Static Files

```bash
touch index.js
```

プロジェクトルートにindex.jsを作成します。

```jsx
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
})
```

`git commit -m "feat: Add entry point"`

[localhost:3000](http://localhost:3000)/ にアクセスすると、`public/index.html`の内容が表示されるかと思います。

### Create API

[localhost:3000/api/password/](http://localhost:3000/api/password/) を叩いた際にパスワードを生成してjson形式で返すAPIを作ります。

簡単にするためパスワードを生成するnpmパッケージを入れます。

```jsx
yarn add password-generator
```

`git commit -m "chore: Add password-generator"`

```jsx
// API Endpoints
app.get('/api/password', (req, res) => {
  const password = generatePassword();
  res.json(password);
  console.log(`Generated a password`);
})
```

`git commit -m "feat: Add Password API endpoint"`

それ以外のリクエストが来た際はindex.htmlを返すようにします

```jsx
// For any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})
```

`git commit -m "Add catchall handler"`

### Call API from Frontend

**public/js/index.js**

```jsx
fetch('/api/password')
	.then(response => {
		return response.json();
	})
	.then(result => {
		console.log(result);
	})
```

### Add Event Listener To the Button

**public/index.html**

```html
<button id="call-api">Generate</button>
<p id="password-text">Password is going to be here.</p>
```

**public/js/index.js**

```jsx
const button = document.getElementById('call-api');
const text = document.getElementById('password-text');

button.addEventListener('click', () => {
  fetch('/api/password')
	.then(response => {
		return response.json();
	})
	.then(result => {
		text.innerHTML = result;
  });
})
```

**public/css/style.css**

```css
p {
  font-weight: 300;
  font-size: 24px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  letter-spacing: 2px;
}
```



以上で、パスワードAPIにリクエストを送り、受け取ったデータでフロントエンドを書き換えるアプリの完成です。

極めてシンプルですが、一連の流れを理解するには有効なのではないかと思っています。

しっかりしたCRUDのチュートリアルはたくさんネット上にあるのでやってみれば良いと思います。
