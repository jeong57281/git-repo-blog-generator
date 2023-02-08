import * as React from 'react';
import { graphql } from 'gatsby';

const Post = (props: any) => {
  console.log(props);

  return <div>Post page</div>;
};

export default Post;

export const pageQuery = graphql`
  query ($slug: String!, $slugNoExt: String!) {
    file(relativePath: { eq: $slug }) {
      fields {
        content
      }
    }
    markdownRemark(fields: { slug: { eq: $slugNoExt } }) {
      html
    }
  }
`;