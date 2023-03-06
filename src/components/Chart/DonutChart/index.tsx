import React, { useContext } from 'react';
import loadable from '@loadable/component';
import { DonutChartLayout } from './Styles';

import * as ACTION_TYPES from '../../../store/actions/actionsType';
import Context from '../../../contexts/context';

const LoadableChart = loadable(() => import('react-apexcharts'));

interface DonutChartProps {
  countOfExts: Map<string, number>;
}

function DonutChart({ countOfExts }: DonutChartProps) {
  const { dispatchFilterReducer } = useContext(Context);

  const labels = [...countOfExts.keys()];
  const series = [...countOfExts.values()];

  const sum = series.reduce((acc, cur) => acc + cur, 0);

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
                  const { dataPointIndex } = options;

                  dispatchFilterReducer({
                    type: ACTION_TYPES.UPDATE_FILTER.CHANGE_EXT,
                    ext: labels[dataPointIndex],
                  });
                } catch (err) {
                  console.error(err);
                }
              },
            },
          },
          tooltip: {
            y: {
              formatter: (value) => `${Math.round((value / sum) * 1000) / 10}%`,
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
