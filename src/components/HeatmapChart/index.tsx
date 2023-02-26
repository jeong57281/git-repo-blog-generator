import React, { useCallback } from 'react';
import Chart from 'react-apexcharts';
import { size, color } from '@styles';

interface HeatmapChartProps {
  numberOfFilesCreatedOnDate: Map<string, number>;
}

interface HeatmapDataType {
  x: string;
  y: number;
  meta: {
    count: number;
    date: Date;
  };
}

interface HeatmapSeriesType {
  name: string;
  data: HeatmapDataType[];
}

const DAY_OF_THE_WEEK = Object.freeze([
  '일',
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
]);
const RANGE_SIZE = 5;
const RANGE_COUNT = 4;
const MAX_COUNT = RANGE_SIZE * RANGE_COUNT;

function HeatmapChart({ numberOfFilesCreatedOnDate }: HeatmapChartProps) {
  const createSeries = useCallback((): HeatmapSeriesType[] => {
    const series: HeatmapSeriesType[] = Array.from(Array(7), (_, index) => ({
      name: DAY_OF_THE_WEEK[index],
      data: [],
    }));

    const today = new Date();
    const sundayOfThisWeek = today.getDate() - today.getDay();

    for (let day = 0; day < 7; day += 1) {
      const date = new Date();
      date.setDate(sundayOfThisWeek + day);

      for (let j = Math.floor(365 / 7); j >= 0; j -= 1) {
        const prevNWeek = new Date(date);
        prevNWeek.setDate(prevNWeek.getDate() - 7 * j);

        if (prevNWeek.getTime() > Date.now()) {
          continue;
        }

        const fileCount =
          numberOfFilesCreatedOnDate.get(prevNWeek.toDateString()) || 0;

        series[day].data.push({
          /**
           * x label이 보이기 위해서 정확히 몇개의 x값을 가진 항목이 열에 존재해야하는지는 정확히 모르겠음.
           * 요일이 7개이므로 1일부터 7일까지 x값을 주었더니 일단은 제대로 작동함.
           */
          x: prevNWeek.getDate() <= 7 ? `${prevNWeek.getMonth() + 1}월` : '',
          y: fileCount > MAX_COUNT ? MAX_COUNT : fileCount,
          meta: {
            count: fileCount,
            date: prevNWeek,
          },
        });
      }
    }

    series.reverse();

    return series;
  }, [numberOfFilesCreatedOnDate]);

  const series = createSeries();

  const heatmapRanges = Array(RANGE_COUNT)
    .fill(null)
    .map((_, index) => {
      const times = index + 1;
      const opacity = Math.floor((0xff / RANGE_COUNT) * times).toString(16);

      return {
        from: 1 + RANGE_SIZE * (times - 1),
        to: RANGE_SIZE * times,
        color: color.PRIMARY + opacity,
      };
    });

  return (
    <div>
      <Chart
        type="heatmap"
        options={{
          chart: {
            id: 'fileHeatMap',
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          plotOptions: {
            heatmap: {
              enableShades: false,
              radius: 3,
              colorScale: {
                ranges: [
                  {
                    from: 0,
                    to: 0,
                    color: color.GRAPH_BG,
                  },
                  ...heatmapRanges,
                ],
              },
            },
          },
          grid: {
            show: false,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            labels: {
              rotate: 0,
            },
            tooltip: {
              enabled: false,
            },
            crosshairs: {
              show: false,
            },
          },
          tooltip: {
            x: {
              show: false,
            },
            y: {
              formatter: (_, { seriesIndex, dataPointIndex }) => {
                if (series[seriesIndex] === undefined) {
                  return '';
                }

                const { data } = series[seriesIndex];
                const {
                  meta: { count, date },
                } = data[dataPointIndex];

                return `${count}개 ${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDate()}일 ${DAY_OF_THE_WEEK[date.getDay()]}요일`;
              },
              title: {
                formatter: () => '',
              },
            },
          },
        }}
        series={series}
        width={size.CONTENTS_MAX_WIDTH}
        height={180}
      />
    </div>
  );
}

export default HeatmapChart;
