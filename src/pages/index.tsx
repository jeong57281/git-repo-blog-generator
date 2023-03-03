import * as React from 'react';
import { graphql, PageProps } from 'gatsby';

import Card from '@components/Card';

import DonutChart from '@components/DonutChart';
import HeatmapChart from '@components/HeatmapChart';
import LineChart from '@components/LineChart';

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
      fields: {
        stampObject?: {
          created: number;
        };
      };
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

  const numberOfFilesCreatedOnDate = new Map<string, number>();

  allFile.nodes.forEach((value) => {
    if (!value.fields.stampObject) {
      return;
    }

    const date = new Date(value.fields.stampObject.created * 1000);
    const key = date.toDateString();
    const count = numberOfFilesCreatedOnDate.get(key);
    numberOfFilesCreatedOnDate.set(key, count ? count + 1 : 1);
  });

  return (
    <main>
      <ColumnBox>
        <RowBox>
          <Card title="언어 분포" maxWidth="33%">
            <DonutChart labels={labels} series={series} />
          </Card>
          <Card title="주간 활동량" maxWidth="66%">
            <LineChart
              numberOfFilesCreatedOnDate={numberOfFilesCreatedOnDate}
            />
          </Card>
        </RowBox>
        <Card>
          <HeatmapChart
            numberOfFilesCreatedOnDate={numberOfFilesCreatedOnDate}
          />
        </Card>
        <Card>
          <div>
            <h1>{site.siteMetadata.siteName}</h1>
            <p className="custom-text">
              This example is hosted on{' '}
              <a href={site.siteMetadata.sourceUrl}>GitHub</a>. Continue reading{' '}
              <a href="https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/">
                TypeScript and Gatsby documentation
              </a>{' '}
              to learn more.
            </p>
          </div>
        </Card>
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
        fields {
          stampObject {
            created
          }
        }
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
