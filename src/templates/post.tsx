import * as React from 'react';
import { graphql } from 'gatsby';

function Post(props: any) {
  console.log(props);

  return <div>Post page</div>;
}

export default Post;

export const query = graphql`
  query ($slug: String!, $slugNoExt: String!) {
    file(relativePath: { eq: $slug }) {
      fields {
        content
        stampObject {
          modified
          created
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slugNoExt } }) {
      html
    }
  }
`;
