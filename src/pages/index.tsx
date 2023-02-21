import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import DonutChart from '@components/DonutChart';
import Card from '@components/Card';

import styled, { css } from 'styled-components';
import { mixin } from '@styles';

interface IndexPageProps {
  site: {
    siteMetadata: {
      siteName: string;
      sourceUrl: string;
    };
  };
  allFile: {
    nodes: {
      name: string;
      relativePath: string;
      ext: string;
    }[];
  };
  pageContext: any;
}

function Index({
  pageContext,
  data: { site, allFile },
}: PageProps<IndexPageProps>) {
  console.log('page context', pageContext);
  console.log('graph ql filesystem', allFile);

  const tmp = new Map<string, number>();

  allFile.nodes.forEach(({ name, relativePath, ext }) => {
    const count = tmp.get(ext);

    if (typeof count !== 'number') {
      tmp.set(ext, 1);
    } else {
      tmp.set(ext, count + 1);
    }
  });

  const labels = [...tmp.keys()];
  const series = [...tmp.values()];

  return (
    <main>
      <ColumnBox>
        <RowBox>
          <Card title="언어 분포" maxWidth="33%">
            <DonutChart labels={labels} series={series} />
          </Card>
          <Card title="활동량 그래프" maxWidth="66%"></Card>
        </RowBox>
        <RowBox>
          <Card>
            <div>
              <h1>{site.siteMetadata.siteName}</h1>
              <p className="custom-text">
                This example is hosted on{' '}
                <a href={site.siteMetadata.sourceUrl}>GitHub</a>. Continue
                reading{' '}
                <a href="https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/">
                  TypeScript and Gatsby documentation
                </a>{' '}
                to learn more.
              </p>
            </div>
          </Card>
        </RowBox>
      </ColumnBox>
    </main>
  );
}

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
      nodes {
        name
        relativePath
        ext
      }
    }
  }
`;

const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;

  ${mixin.mobile(css`
    flex-direction: column;
  `)}
`;
