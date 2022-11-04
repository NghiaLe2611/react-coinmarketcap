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
import { ColorType, createChart } from 'lightweight-charts';
import axios from 'axios';
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

// 1D (5m-288) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=288
// 7D (15m-672) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=672
// 1M (1h-720) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=720
// 1Y (1D-365) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=365

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1635912187&to=1667448187
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1
const CoinChart = ({
	currentPrice,
    backgroundColor = 'white',
    textColor = '#979da8',
	lineColor = '#2962FF',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)'
}) => {
	const classes = useStyles();
	const [chartType, setChartType] = useState(0);

	const chartContainerRef = useRef();
	const chartRef = useRef();
	const baselineRef = useRef();
	const dataRef = useRef();
	const resizeObserver = useRef();

	// Init chart
	useEffect(() => {
		/*
			[
				1499040000000, // Kline open time
				'0.01634790', // Open price
				'0.80000000', // High price
				'0.01575800', // Low price
				'0.01577100', // Close price
				'148976.11427815', // Volume
				1499644799999, // Kline Close time
				'2434.19055334', // Quote asset volume
				308, // Number of trades
				'1756.87402397', // Taker buy base asset volume
				'28.46694368', // Taker buy quote asset volume
				'0', // Unused field, ignore.
			];
		*/
		async function getChartData() {
			try {
				const res = await axios('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=288');
				const data = res.data;
				if (data) {
					dataRef.current = data;
					const lastPrice = data[data.length - 1];
					baselineRef.current = chartRef.current.addBaselineSeries({
						baseValue: { type: 'price', price: lastPrice[4] },
						lineWidth: 2,
						topLineColor: 'rgba( 38, 166, 154, 1)',
						topFillColor1: 'rgba( 38, 166, 154, 0.28)',
						topFillColor2: 'rgba( 38, 166, 154, 0.05)',
						bottomLineColor: 'rgba( 239, 83, 80, 1)',
						bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
						bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
					});

					const seriesData = data.map((item) => {
						console.log(item);
						return {
							time: item[0] / 1000,
							value: Number(item[4]),
						};
					});
			
					baselineRef.current.setData(seriesData);
				}

				
			} catch (err) {
				console.log(err);
			}
		};

		if (chartRef.current) {
			chartRef.current.remove();
		}

		chartRef.current = createChart(chartContainerRef.current, {
			layout: {
				background: { type: ColorType.Solid, color: backgroundColor },
				textColor,
			},
			width: chartContainerRef.current.clientWidth,
			height: 400,
			rightPriceScale: {
				visible: false, // Hide price bar at the right
			},
			leftPriceScale: {
				visible: true,
				borderColor: '#e6e6e6',
			},
			grid: {
				horzLines: {
					color: '#e6e6e6',
				},
				vertLines: {
					color: '#e6e6e6',
				},
			},
			timeScale: {
				borderColor: '#485c7b',
			},
		});

		getChartData();

		// console.log(111, currentPrice);
		
		// const lineSeries = chartRef.current.addBaselineSeries({
		// 	baseValue: { type: 'price', price: lastPrice[1] },
		// 	lineWidth: 2,
		// 	topLineColor: 'rgba( 38, 166, 154, 1)',
		// 	topFillColor1: 'rgba( 38, 166, 154, 0.28)',
		// 	topFillColor2: 'rgba( 38, 166, 154, 0.05)',
		// 	bottomLineColor: 'rgba( 239, 83, 80, 1)',
		// 	bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
		// 	bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
		// });

	}, [backgroundColor, textColor]);

	useEffect(() => {
		if (dataRef.current) {
			const lastPrice = dataRef.current[dataRef.current.length - 1];
			if (currentPrice && baselineRef.current) {
				baselineRef.current.update({
					time: lastPrice[0] / 1000,
					value: Number(currentPrice)
				});
			}
		}
	}, [currentPrice]);

	// Resize chart on container resizes.
	// useEffect(() => {
	// 	resizeObserver.current = new ResizeObserver((entries) => {
	// 		const { width, height } = entries[0].contentRect;
	// 		chartRef.current.applyOptions({ width, height });
	// 		setTimeout(() => {
	// 			chartRef.current.timeScale().fitContent();
	// 		}, 0);
	// 	});

	// 	resizeObserver.current.observe(chartContainerRef.current);

	// 	return () => resizeObserver.current.disconnect();
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
			chartRef.current.chart.exportChart({ type: 'image/jpeg' });
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
				<div className='chart-container' style={{ position: 'relative' }} ref={chartContainerRef}></div>
			</TabPanel>
			<TabPanel value={chartType} index={1}>
				tab 2
			</TabPanel>
		</div>
	);
};

export default memo(CoinChart);
