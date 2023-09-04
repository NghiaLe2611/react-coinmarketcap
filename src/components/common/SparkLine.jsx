import { memo } from 'react';
import { Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SparkLine = ({ data, color }) => {
	const options = {
		title: {
			text: null,
		},
        plotOptions: {
            series: {
                lineWidth: 1,
                enableMouseTracking: false,
            }
        },
        chart: {
			backgroundColor: 'transparent',
            type: 'line',
            width: 130,
            height: 60
        },
		series: [
			{
				// type: 'line',
                color: color,
				data: data,
				showInLegend: false,
			},
		],
		xAxis: {
			visible: false,
		},
		yAxis: {
			visible: false,
		},
		credits: {
			enabled: false,
		},
        tooltip: {
            enabled: false,
        },
		accessibility: {
			enabled: false
		}
	};

	return (
		<Box display='flex' justifyContent='flex-end'>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</Box>
	);
};

export default memo(SparkLine);
