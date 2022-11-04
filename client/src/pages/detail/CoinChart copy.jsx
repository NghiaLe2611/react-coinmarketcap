import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState, useRef, useEffect, memo } from 'react';
import useStyles from './styles';
// import Highcharts from 'highcharts';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { series } from './data';
import 'assets/styles/chart.scss';
// import 'highcharts/css/highcharts.css';
// import DarkUnica from 'highcharts/themes/dark-unica';

// init the module export
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

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
		renderTo: 'chart',
		// styledMode: true
	},
	title: {
		text: '',
	},
	rangeSelector: {
		enabled: false,
		// allButtonsEnabled: true,
		// buttons: [
		// 	{
		// 		type: 'day',
		// 		count: 1,
		// 		text: '1D',
		// 		events: {
		// 			click: function() {
		// 				alert('Clicked button');
		// 			}
		// 		}
		// 	},
		// 	{
		// 		type: 'day',
		// 		count: 7,
		// 		text: '7D',
		// 	},
		// 	{
		// 		type: 'month',
		// 		count: 1,
		// 		text: '1M',
		// 	},
		// 	{
		// 		type: 'year',
		// 		count: 1,
		// 		text: '1Y'
		// 	}
		// ],
		// selected: 4,
	},
	yAxis: {
		title: {
			text: '',
		},
		labels: {
			style: {
				color: 'var(--color-sub-txt)',
				fontWeight: 500,
			},
		},
		gridLineColor: 'var(--border-table)',
		plotLines: [
			{
				color: 'var(--bg-neutral-2)',
				width: 2,
				value: 20500,
				dashStyle: 'Dot',
				// https://api.highcharts.com/class-reference/Highcharts#.DashStyleValue
			},
		],
	},
	xAxis: {
		type: 'datetime',
		labels: {
			style: {
				color: 'var(--color-sub-txt)',
				fontWeight: 500,
			},
		},
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
					[0, 'rgba(234,57,67,0.08)'],
					[1, 'rgba(255,255,255,0.3)'],
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
					[0, 'rgba(22,197,130,0.05)'],
					[1, 'rgba(255,255,255,0.3)'],
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
	scrollbar: { enabled: false },
	// navigator: {
	// 	enabled: false
	// },
	exporting: {
		enabled: false,
		// buttons: {
		// 	contextButton: {
		// 		symbol: 'url(../images/ellpsis-solid.svg)',
		// 		menuItems: ['viewFullscreen', 'downloadPNG', 'downloadJPEG'],
		// 	},
		// },
	},
};

const darkTheme = {
	chart: {
		type: 'line',
		renderTo: 'chart',
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
		gridLineColor: 'var(--border-table)',
		plotLines: [
			{
				color: 'var(--bg-neutral-2)',
				width: 2,
				value: 20500,
				dashStyle: 'Dot',
			},
		],
	},
	xAxis: {
		type: 'datetime',
	},
	plotOptions: {
		area: {
			threshold: 20500,
			negativeFillColor: {
				linearGradient: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 1,
				},
				stops: [
					[0, '#ea394312'],
					[1, '#ffffff4d'],
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
					[1, '#ffffff4d'],
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

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1635912187&to=1667448187
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1
const CoinChart = () => {
	const classes = useStyles();
	const [chartType, setChartType] = useState(0);

	const chartRef = useRef(null);

	// useEffect(() => {
	//     Highcharts.chart('chart', options);
	// }, []);

	const handleChangeType = (e, newValue) => {
		setChartType(newValue);
	};

	const showFullScreen = () => {
		if (chartRef.current) {
			chartRef.current.chart.fullscreen.toggle();
		}
	};

	const downloadImage = (type) => {
		if (type === 'PNG') {
			chartRef.current.chart.exportChart();
			// chartRef.current.chart.toggleDataTable()
		}

		if (type === 'JPEG') {
			chartRef.current.chart.exportChart({type: 'image/jpeg'});
		}
	};

	return (
		<div>
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
			<button onClick={showFullScreen}>Fullscreen</button>
			<button onClick={() => downloadImage('PNG')}>Download PNG Image</button>
			<button onClick={() => downloadImage('JPEG')}>Download JPEG Image</button>
			<TabPanel value={chartType} index={0}>
				{/* <div id='chart'></div> */}
				<HighchartsReact
					highcharts={Highcharts}
					constructorType={'stockChart'}
					options={options}
					ref={chartRef}
				/>
			</TabPanel>
			<TabPanel value={chartType} index={1}>
				tab 2
			</TabPanel>
		</div>
	);
};

export default memo(CoinChart);
