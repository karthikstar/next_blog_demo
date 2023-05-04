import Layout from '../../components/layout';

import { getAllPostIds, getPostData } from '../../lib/posts';

// Implementing getStaticProps
// The post page is now using the getPostData function in getStaticProps to get the post data and return it as props.
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}


//Finally, we'll import the getAllPostIds function and use it inside getStaticPaths. 
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
      <Layout>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
      </Layout>
    );
  }