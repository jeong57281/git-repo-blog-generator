import React from 'react';
import loadable from '@loadable/component';
import { DonutChartLayout } from './Styles';

const LoadableChart = loadable(() => import('react-apexcharts'));

interface DonutChartProps {
  countOfExts: Map<string, number>;
}

function DonutChart({ countOfExts }: DonutChartProps) {
  const labels = [...countOfExts.keys()];
  const series = [...countOfExts.values()];

  return (
    <DonutChartLayout>
      <LoadableChart
        type="donut"
        series={series}
        options={{
          labels,
          legend: { show: false },
          chart: {
            id: 'extDonutGraph',
            events: {
              dataPointSelection: (e, chart, options) => {
                try {
                  const {
                    w: {
                      globals: { selectedDataPoints },
                    },
                    dataPointIndex,
                  } = options;

                  /**
                   * 필터링 옵션을 저장하는 전역 상태를 업데이트 하는 코드가 추가 될 예정
                   */
                  console.log(selectedDataPoints, dataPointIndex);
                } catch (err) {
                  console.error(err);
                }
              },
            },
          },
          tooltip: {
            y: {
              formatter: (value) =>
                `${
                  Math.round(
                    (value / series.reduce((acc, cur) => acc + cur, 0)) * 1000
                  ) / 10
                }%`,
            },
          },
          plotOptions: {
            pie: {
              expandOnClick: false,
              donut: {
                size: '55%',
              },
            },
          },
          dataLabels: {
            formatter: (value, { seriesIndex }) => labels[seriesIndex],
          },
          states: {
            active: {
              filter: {
                type: 'none',
              },
            },
          },
        }}
      />
    </DonutChartLayout>
  );
}

export default DonutChart;
