import React from 'react';

import Layout from '../../components/Layout';
import BlogRoll from '../../components/BlogRoll';

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className='full-width-image-container margin-top-0'
          // style={{
          //   backgroundImage: `url('/img/blog-index.jpg')`,
          // }}
        >
          <h1
            className='has-text-weight-bold is-size-1 heading-primary'
            // style={{
            //   boxShadow: '0.5rem 0 0 #171717, -0.5rem 0 0 #171717',
            //   backgroundColor: '#171717',
            //   color: 'white',
            //   padding: '1rem'
            // }}
          >
            Latest Posts
          </h1>
        </div>
        <section className='section'>
          <div className='container'>
            <div className='content'>
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
