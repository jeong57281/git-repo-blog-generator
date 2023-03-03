import React from 'react';
import loadable from '@loadable/component';
import { getRelativeDate } from '@utils/date';
import { DAY_OF_THE_WEEK } from '@constants';
import { color } from '@styles';
import { LineChartLayout } from './Style';

const LoadableChart = loadable(() => import('react-apexcharts'));

interface LineChartProps {
  countOfDates: Map<string, number>;
}

interface LineDataType {
  x: number;
  y: number;
}

interface LineSeriesType {
  data: LineDataType[];
}

function LineChart({ countOfDates }: LineChartProps) {
  const today = new Date();

  const series: LineSeriesType[] = [{ data: [] }];

  for (let i = 0; i < 7; i += 1) {
    const prevDate = getRelativeDate(-i, today);

    series[0].data.push({
      x: prevDate.getTime(),
      y: countOfDates.get(prevDate.toDateString()) || 0,
    });
  }

  return (
    <LineChartLayout>
      <LoadableChart
        type="line"
        width="100%"
        height="100%"
        series={series}
        options={{
          chart: {
            id: 'activityLineChart',
            toolbar: {
              show: false,
              tools: {
                zoom: false,
                zoomout: false,
                pan: false,
              },
            },
            events: {
              markerClick: (
                event,
                chartContext,
                { seriesIndex, dataPointIndex, w }
              ) => {
                const { x, y } = series[seriesIndex].data[dataPointIndex];
                console.log(x, y);
              },
            },
          },
          stroke: {
            width: 3,
          },
          markers: {
            size: 4,
            colors: ['#ffffff'],
            strokeWidth: 3,
            strokeColors: color.PRIMARY,
            hover: {
              sizeOffset: 2,
            },
          },
          colors: [color.PRIMARY],
          xaxis: {
            tooltip: {
              enabled: false,
            },
            labels: {
              formatter: (value: string) => {
                const date = new Date(value);

                return date.getDay() === today.getDay()
                  ? '오늘'
                  : DAY_OF_THE_WEEK[date.getDay()];
              },
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          grid: {
            padding: {
              top: 30,
              left: 30,
              right: 30,
              bottom: 30,
            },
            yaxis: {
              lines: {
                show: false,
              },
            },
          },
          tooltip: {
            x: {
              show: false,
            },
            y: {
              formatter: (_, { seriesIndex, dataPointIndex }) => {
                const { data } = series[seriesIndex] as LineSeriesType;
                const { x, y } = data[dataPointIndex];

                const date = new Date(x);

                return `${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDate()}일 ${
                  DAY_OF_THE_WEEK[date.getDay()]
                }요일 : ${y}개`;
              },
              title: {
                formatter: () => '',
              },
            },
            marker: {
              show: false,
            },
          },
        }}
      />
    </LineChartLayout>
  );
}

export default LineChart;
