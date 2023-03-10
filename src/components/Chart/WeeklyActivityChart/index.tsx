import React from 'react';
import loadable from '@loadable/component';
import { getRelativeDate } from '@utils/date';
import { DAY_OF_THE_WEEK } from '@constants/time';
import { color } from '@styles';
import { WeeklyActivityChartLayout } from './Style';

const LoadableChart = loadable(() => import('react-apexcharts'));

interface WeeklyActivityChartProps {
  countOfDates: Map<string, number>;
}

interface LineChartDataType {
  x: number;
  y: number;
}

interface LineChartSeriesType {
  data: LineChartDataType[];
}

function WeeklyActivityChart({ countOfDates }: WeeklyActivityChartProps) {
  const today = new Date();

  const series: LineChartSeriesType[] = [{ data: [] }];

  for (let i = 0; i < 7; i += 1) {
    const prevDate = getRelativeDate(-i, today);

    series[0].data.push({
      x: prevDate.getTime(),
      y: countOfDates.get(prevDate.toDateString()) || 0,
    });
  }

  return (
    <WeeklyActivityChartLayout>
      <LoadableChart
        type="line"
        width="100%"
        height="100%"
        series={series}
        options={{
          chart: {
            id: 'activityWeeklyActivityChart',
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
                  ? '??????'
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
            xaxis: {
              lines: {
                show: true,
              },
            },
          },
          tooltip: {
            x: {
              show: false,
            },
            y: {
              formatter: (_, { seriesIndex, dataPointIndex }) => {
                const { data } = series[seriesIndex] as LineChartSeriesType;
                const { x, y } = data[dataPointIndex];

                const date = new Date(x);

                return `${date.getFullYear()}??? ${
                  date.getMonth() + 1
                }??? ${date.getDate()}??? ${
                  DAY_OF_THE_WEEK[date.getDay()]
                }?????? : ${y}???`;
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
    </WeeklyActivityChartLayout>
  );
}

export default WeeklyActivityChart;
