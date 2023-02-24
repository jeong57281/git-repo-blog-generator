import React from 'react';
import Chart from 'react-apexcharts';
import { size, color } from '@styles';

interface HeatmapChartProps {
  fileCreateDates: Map<string, number>;
}

const WEEK = Object.freeze(['토', '금', '목', '수', '화', '월', '일']);
const PADDING = 5;
const EMPTY = 2;

function HeatmapChart({ fileCreateDates }: HeatmapChartProps) {
  let series: any = Array.from(Array(7), () => []);

  const today = new Date();

  for (let i = 0; i < 7; i += 1) {
    const date = new Date();

    date.setDate(today.getDate() + 7 - today.getDay() - i);

    for (let j = 0; j < 365 / 7; j += 1) {
      const prev7Date = new Date(date);

      prev7Date.setDate(prev7Date.getDate() - 7 * j);

      const key = `${prev7Date.getFullYear()}-${prev7Date.getMonth()}-${prev7Date.getDate()}`;

      /**
       * apexcharts 라이브러리의 heatmap은 데이터 값(y)이 0일 경우 cell이 투명하게 보이고, 1이상일 경우에만 색이 나타남.
       * 중간에 구멍이 뚫린 것 같은 grid형태가 되지 않도록 데이터가 0일 경우에도 1이상의 값을 부여함.
       * 또 값이 존재하는 cell의 경우 배경색과 뚜렷하게 구분되도록 패딩값을 더해줌.
       */
      const tmp = fileCreateDates.get(key);

      const count = tmp ? tmp + PADDING : EMPTY;

      if (prev7Date.getTime() > Date.now()) {
        continue;
      }

      /**
       * x label이 보이기 위해서 정확히 몇개의 x값을 가진 항목이 열에 존재해야하는지는 정확히 모르겠음.
       * 요일이 7개이므로 1일부터 7일까지 x값을 주었더니 일단은 제대로 작동함.
       */
      series[i].push({
        x: prev7Date.getDate() <= 7 ? `${prev7Date.getMonth() + 1}월` : '',
        y: count,
      });
    }
  }

  series = series.map((value, index) => ({
    name: WEEK[index],
    data: value.reverse(),
  }));

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
          colors: [color.PRIMARY],
          plotOptions: {
            heatmap: {
              shadeIntensity: 1,
              radius: 3,
            },
          },
          grid: {
            show: false,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
            tooltip: {
              enabled: false,
            },
          },
          tooltip: {
            x: {
              show: false,
            },
            y: {
              formatter: (value) => `${value - EMPTY}개`,
              title: {
                formatter: () => '',
              },
            },
            z: {
              title: 'hi',
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
