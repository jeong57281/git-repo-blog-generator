import React, { useReducer } from 'react';
import { graphql, PageProps } from 'gatsby';

import Card from '@components/Shell/Card';

import DonutChart from '@components/Chart/DonutChart';
import HeatmapChart from '@components/Chart/HeatmapChart';
import WeeklyActivityChart from '@components/Chart/WeeklyActivityChart';

import styled from 'styled-components';

import * as filterReducer from '../store/reducers/filterReducer';
import Context from '../contexts/context';

interface IndexPageProps {
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
}

function Index({ data: { allFile } }: PageProps<IndexPageProps>) {
  const [stateFilterReducer, dispatchFilterReducer] = useReducer(
    filterReducer.reducer,
    filterReducer.initialState
  );
  /**
   * 확장자 파일 개수 count
   */
  const countOfExts = new Map<string, number>();

  allFile.nodes.forEach(({ ext }) => {
    const count = countOfExts.get(ext);
    countOfExts.set(ext, count ? count + 1 : 1);
  });

  /**
   * 날짜별 파일 개수 count
   */
  const countOfDates = new Map<string, number>();

  allFile.nodes.forEach(({ fields }) => {
    if (!fields.stampObject) {
      return;
    }

    const date = new Date(fields.stampObject.created * 1000);
    const key = date.toDateString();
    const count = countOfDates.get(key);
    countOfDates.set(key, count ? count + 1 : 1);
  });

  return (
    <main>
      <Context.Provider
        value={{
          stateFilterReducer,
          dispatchFilterReducer,
        }}
      >
        <ContentBox>
          <Card title="언어 분포" maxWidth="33.3%">
            <DonutChart countOfExts={countOfExts} />
          </Card>
          <Card title="주간 활동량" maxWidth="66.6%">
            <WeeklyActivityChart countOfDates={countOfDates} />
          </Card>
          <Card>
            <HeatmapChart countOfDates={countOfDates} />
          </Card>
        </ContentBox>
      </Context.Provider>
    </main>
  );
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
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
