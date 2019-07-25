---
templateKey: blog-post
title: React HelmetでOGP対応
date: 2019-07-24 16:35:04
featuredpost: false
featuredimage: /img/1907/og-ogp.jpg
description: Gatsby + Netlify CMS StarterでOGP対応する方法。
tags:
  - React
  - React-Helmet
  - OGP
  - Gatsby
  - GraphQL
---

前回の記事をツイッターでシェアした時に ogp 対応してないことに気づいたので、早速対応しました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">ブログを更新しました。 <a href="https://t.co/twXW6BNlL7">https://t.co/twXW6BNlL7</a></p>&mdash; yikeda (@yikeda6616) <a href="https://twitter.com/yikeda6616/status/1153975340244410370?ref_src=twsrc%5Etfw">July 24, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">React helmet にogpのメタタグ入れ忘れてたことに今気付き(ﾉД`)</p>&mdash; yikeda (@yikeda6616) <a href="https://twitter.com/yikeda6616/status/1153981102295408643?ref_src=twsrc%5Etfw">July 24, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

GraphQL にろくに触れたことがなく少し手間取ったのでシェアします。

<br>

#### まずは画像パスの確認

`http://localhost:8000/___graphql`にアクセスし、どこから画像パスが取れるか確認してみました。

<br>

![graphql](/img/1907/graphql.jpg)

<br>

どうやら frontmatter.featuredimage.relativePath で取れるっぽいのでそれを`blog-post.js`の pageQuery に記述します。

##### blog-post.js

```js
export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          relativePath
        }
      }
    }
  }
`;
```

<br>

これで BlogPostTemplate 内部で`post.frontmatter.featuredimage.relativePath`で画像パスにアクセスできるようになりました。

<br>

#### **Helmet のメタタグに諸々の OGP 情報を追加**

`blog-post.js`->`BlogPost`コンポーネント-> Helmet にメタタグを記述します。

必要な OGP 情報は title, description, image なのでそれを meta タグに追加します。

画像パスは長くなってしまったので以下

```js
const image = `https://yikeda.dev/img/${post.frontmatter.featuredimage.relativePath}`;
```

を定義し記述量が短くなるようにしました。

<br>

##### blog-post.js

```js
const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const image = `https://yikeda.dev/img/${post.frontmatter.featuredimage.relativePath}`;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={image}
        helmet={
          <Helmet
            titleTemplate='%s | Blog'
            title={post.frontmatter.title}
            meta={[
              { name: 'description', content: post.frontmatter.description },
              {
                property: 'og:title',
                content: post.frontmatter.title
              },
              {
                property: 'og:description',
                content: post.frontmatter.description
              },
              {
                property: 'og:image',
                content: image
              }
            ]}
          />
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};
```

<br>

`image` を定義したのは OG メタタグだけでなく、BlogPost コンポーネントの Props に渡す際にも使うのでこのようにしました。

<br>

また、今まで全ての記事でアイキャッチイメージを使っているにも関わらずマークダウンの img タグを書いていたので、そこも修正。

`BlogPostTemplate`コンポーネントの Props で `featuredimage` を受け取り、全ての記事のトップでその記事の `featuredimage` を表示するように変更しました。

具体的には、p タグの description の下に img タグを追加しアイキャッチ画像を表示させるように変更。

##### blog-post.js

```js
export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  featuredimage,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className='section'>
      {helmet || ''}
      <div className='container content'>
        <div className='columns'>
          <div className='column is-10 is-offset-1'>
            <h1 className='title is-size-2 has-text-weight-bold is-bold-light heading-primary'>
              {title}
            </h1>
            <p>{description}</p>
            <p>
              <img src={featuredimage} alt='featuedimage' />
            </p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className='taglist'>
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
```

<br>

これで Twitter や Slack などに貼り付けた時にいい感じに OGP 情報が表示されるようになりました。

<br>

![ogp-example](/img/1907/ogp-example.jpg)

<br>

めでたしめでたし。
