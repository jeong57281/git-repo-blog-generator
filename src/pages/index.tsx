import * as React from 'react';
import { graphql, PageProps } from 'gatsby';

import Card from '@components/Shell/Card';

import DonutChart from '@components/Chart/DonutChart';
import HeatmapChart from '@components/Chart/HeatmapChart';
import WeeklyActivityChart from '@components/Chart/WeeklyActivityChart';

import styled from 'styled-components';

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

  /**
   * 확장자 파일 개수 count
   */
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

  /**
   * 날짜별 파일 개수 count
   */
  const countOfDates = new Map<string, number>();

  allFile.nodes.forEach((value) => {
    if (!value.fields.stampObject) {
      return;
    }

    const date = new Date(value.fields.stampObject.created * 1000);
    const key = date.toDateString();
    const count = countOfDates.get(key);
    countOfDates.set(key, count ? count + 1 : 1);
  });

  return (
    <main>
      <ContentBox>
        <Card title="언어 분포" maxWidth="33.3%">
          <DonutChart labels={labels} series={series} />
        </Card>
        <Card title="주간 활동량" maxWidth="66.6%">
          <WeeklyActivityChart countOfDates={countOfDates} />
        </Card>
        <Card>
          <HeatmapChart countOfDates={countOfDates} />
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
      </ContentBox>
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

const ContentBox = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
`;
