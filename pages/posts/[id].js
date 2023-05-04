import Layout from '../../components/layout';

import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

import Head from 'next/head';
import Date from '../../components/date';


// Implementing getStaticProps
// The post page is now using the getPostData function in getStaticProps to get the post data and return it as props.
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id); // getPostData() is a async function
  return {
    props: {
      postData,
    },
  };
}


//Finally, we'll import the getAllPostIds function and use it inside getStaticPaths. 
// returns an array of possible values for id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
} //If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.



// Like getStaticProps, getStaticPaths can fetch data from any data source. 
// In our example, getAllPostIds (which is used by getStaticPaths) may fetch from an external API endpoint:

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }