import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState, useRef, useEffect, memo } from 'react';
import useStyles from './styles';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { series } from './data';
// import DarkUnica from 'highcharts/themes/dark-unica';

import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

// Highcharts.setOptions({
//   lang: {
//     numericSymbols: ["k", "M", "B", "T", "P", "E"]
//   }
// });

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

const options = {
	chart: {
		type: 'line',
        renderTo: 'chart'
	},
	title: {
		text: '',
	},
	rangeSelector: {
		buttons: [
			{
				type: 'day',
				count: 1,
				text: '1d',
			},
			{
				type: 'day',
				count: 7,
				text: '7d',
			},
			{
				type: 'month',
				count: 1,
				text: '1m',
			},
			{
				type: 'all',
				text: 'All',
			},
		],
		selected: 4,
	},
	yAxis: {
		title: {
			text: '',
		},
		plotLines: [
			{
				color: 'orange',
				width: 2,
				value: 20500,
				dashStyle: 'Dot',
				// https://api.highcharts.com/class-reference/Highcharts#.DashStyleValue
			},
		],
	},
	xAxis: {
		type: 'datetime',
	},
	plotOptions: {
		area: {
			threshold: 20500,
			// negativeFillColor: 'rgba(234,57,67,0.2)',
			// fillColor: 'rgba(22,199,132,0.2)',
			negativeFillColor: {
				linearGradient: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 1,
				},
				stops: [
					[0, '#ea394312'],
					[1, '#fff'],
				],
			},
			fillColor: {
				linearGradient: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 1,
				},
				stops: [
					[0, '#16c5820d'],
					[1, '#fff'],
				],
			},
			// fillColor: {
			//     linearGradient: {
			//         x1: 0,
			//         y1: 0,
			//         x2: 0,
			//         y2: 1
			//     },
			//     stops: [
			//         [0, Highcharts.getOptions().colors[0]],
			//         [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
			//     ]
			// },
			states: {
				hover: {
					lineWidth: 2,
				},
			},
		},
		series: {
			negativeColor: '#ea3943',
			color: '#16c784',
			threshold: 20500,
			states: {
				hover: {
					lineWidth: 2,
				},
			},
		},
	},
	series: [
		{
			type: 'area',
			showInLegend: false,
			data: series,
		},
	],
	credits: {
		enabled: false,
	},
	accessibility: {
		enabled: false,
	},
};

const darkTheme = {
	chart: {
		type: 'line',
        // renderTo: 'chart',
        backgroundColor: '#333',
	},
	title: {
		text: '',
	},
	rangeSelector: {
		buttons: [
			{
				type: 'day',
				count: 1,
				text: '1d',
			},
			{
				type: 'day',
				count: 7,
				text: '7d',
			},
			{
				type: 'month',
				count: 1,
				text: '1m',
			},
			{
				type: 'all',
				text: 'All',
			},
		],
		selected: 4,
	},
	yAxis: {
		title: {
			text: '',
		},
		plotLines: [
			{
				color: 'orange',
				width: 2,
				value: 20500,
				dashStyle: 'Dot',
				// https://api.highcharts.com/class-reference/Highcharts#.DashStyleValue
			},
		],
	},
	xAxis: {
		type: 'datetime',
	},
	plotOptions: {
		area: {
			threshold: 20500,
			// negativeFillColor: 'rgba(234,57,67,0.2)',
			// fillColor: 'rgba(22,199,132,0.2)',
			negativeFillColor: {
				linearGradient: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 1,
				},
				stops: [
					[0, '#ea394312'],
					[1, '#fff'],
				],
			},
			fillColor: {
				linearGradient: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 1,
				},
				stops: [
					[0, '#16c5820d'],
					[1, '#fff'],
				],
			},
			states: {
				hover: {
					lineWidth: 2,
				},
			},
		},
		series: {
			negativeColor: '#ea3943',
			color: '#16c784',
			threshold: 20500,
			states: {
				hover: {
					lineWidth: 2,
				},
			},
		},
	},
	series: [
		{
			type: 'area',
			showInLegend: false,
			data: series,
		},
	],
	credits: {
		enabled: false,
	},
	accessibility: {
		enabled: false,
	},
};

const dark = {
	chart: {
        backgroundColor: '#333',
	},
};

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1
const CoinChart = () => {
    const classes = useStyles();
	const [chartType, setChartType] = useState(0);

    const chartRef = useRef(null);

    useEffect(() => {
        Highcharts.chart('chart', options);
    }, []);

	const handleChangeType = (e, newValue) => {
		setChartType(newValue);
	};

    const test = () => {
        // Highcharts.chart.setOptions(dark)
        Highcharts.chart('chart', darkTheme);
    };

	return (
		<div>
			<button onClick={test}>Change</button>
			<Tabs
				value={chartType}
				onChange={handleChangeType}
				className={classes.tabs}
				TabIndicatorProps={{
					style: { display: 'none' },
				}}>
				<Tab label='Price' />
				<Tab label='Tradingview' />
			</Tabs>

			<TabPanel value={chartType} index={0}>
				<div id="chart">

                </div>
				{/* <HighchartsReact
					key={chartKey}
					highcharts={Highcharts}
					options={options}
					ref={chartRef}
				/> */}
			</TabPanel>
			<TabPanel value={chartType} index={1}>
				tab 2
			</TabPanel>
		</div>
	);
};

export default memo(CoinChart);
