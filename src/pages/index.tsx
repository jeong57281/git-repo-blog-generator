import * as React from 'react';
import { graphql, PageProps } from 'gatsby';

// You can also use https://github.com/dotansimha/graphql-code-generator
// to generate types from a GraphQL schema
interface IndexPageProps {
  site: {
    siteMetadata: {
      siteName: string;
      sourceUrl: string;
    };
  };
  allFile: {
    edges: {
      node: {
        name: string;
        relativePath: string;
      };
    };
  };
  pageContext: any;
}

const Index = ({
  pageContext,
  data: { site, allFile },
}: PageProps<IndexPageProps>) => {
  console.log('page context', pageContext);
  console.log('graph ql filesystem', allFile);

  return (
    <main>
      <h1>{site.siteMetadata.siteName}</h1>
      <p className="custom-text">
        This example is hosted on{' '}
        <a href={site.siteMetadata.sourceUrl}>GitHub</a>. Continue reading{' '}
        <a href="https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/">
          TypeScript and Gatsby documentation
        </a>{' '}
        to learn more.
      </p>
    </main>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
        sourceUrl
      }
    }
    allFile {
      edges {
        node {
          name
          relativePath
        }
      }
    }
  }
`;
