import { Box, styled, Tab, Tabs, Typography } from '@mui/material';
import { useState, useRef, useEffect, memo } from 'react';
import useStyles from './styles';
import 'assets/styles/chart.scss';
import * as ReactDOMServer from 'react-dom/server';
import { ColorType, createChart, CrosshairMode, isBusinessDay } from 'lightweight-charts';
import axios from 'axios';
import moment from 'moment';
import { formatNumber } from 'utils/helpers';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';
import { _isDarkMode } from 'features/theme/themeSlice';
import { useSelector } from 'react-redux';

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

const Tooltip = styled(Box)(({ theme }) => ({
	position: 'absolute',
	display: 'none',
	padding: '15px',
    minWidth: 200,
	boxShadow: '2px 2px 8px 2px rgba(189,189,189,0.85)',
	fontSize: '13px',
	color: '#131722',
	backgroundColor: 'rgba(255, 255, 255, 1)',
	textAlign: 'left',
	zIndex: 999,
	top: '12px',
	left: '12px',
	pointerEvents: 'none',
	borderRadius: '6px',
}));

const toolTipMargin = 15;

// 1D (5m-288) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=288
// 7D (15m-672) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=672
// 1M (1h-720) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=720
// 1Y (1D-365) https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=365

// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1635912187&to=1667448187
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1

const lightTheme = {
	layout: {
		background: { type: ColorType.Solid, color: '#fff' },
		textColor: '#979da8',
	},
	leftPriceScale: {
		visible: true,
		borderColor: '#efefef',
	},
	grid: {
		horzLines: {
			color: '#efefef',
		},
		vertLines: {
			color: '#efefef',
		},
	},
};

const darkTheme = {
	layout: {
		background: { type: ColorType.Solid, color: '#17171A' },
		textColor: '#7B8195',
	},
	leftPriceScale: {
		visible: true,
		borderColor: '#222531',
	},
	grid: {
		horzLines: {
			color: '#222531',
		},
		vertLines: {
			color: '#222531',
		},
	},
};

const CoinChart = forwardRef((props, ref) => {
	const classes = useStyles();
	const isDarkMode = useSelector(_isDarkMode);
	const [chartType, setChartType] = useState(0);
	const [chartInterval, setChartInterval] = useState(0);

	const chartContainerRef = useRef();
	const chartRef = useRef();
	const baselineRef = useRef();
	const dataRef = useRef();
	const tooltipRef = useRef(null);
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
					const openPrice = data[0];
					baselineRef.current = chartRef.current.addBaselineSeries({
						baseValue: { type: 'price', price: openPrice[4] },
						lineWidth: 2,
						topLineColor: 'rgba( 38, 166, 154, 1)',
						topFillColor1: 'rgba( 38, 166, 154, 0.28)',
						topFillColor2: 'rgba( 38, 166, 154, 0.05)',
						bottomLineColor: 'rgba( 239, 83, 80, 1)',
						bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
						bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
						priceLineVisible: false,
						// crosshairMarkerRadius: 5,
					});

					const seriesData = data.map((item) => {
						// console.log(item);
						return {
							time: item[0] / 1000,
							value: Number(item[4]),
						};
					});

					baselineRef.current.setData(seriesData);
					baselineRef.current.createPriceLine({
						price: openPrice[4],
						color: '#979DA8',
						lineWidth: 2,
						lineStyle: 1,
						axisLabelVisible: true,
					});

					chartRef.current.timeScale().fitContent();

					// if (chartRef.current) {
					// 	chartRef.current.timeScale().setVisibleRange({
					// 		from: data[0][0] / 1000,
					// 		to: data[data.length - 1][0] / 1000,
					// 	});
					// }
				}
			} catch (err) {
				console.log(err);
			}
		}

		if (chartRef.current) {
			chartRef.current.remove();
		}

		if (chartContainerRef.current) {
			chartRef.current = createChart(chartContainerRef.current, {
				...lightTheme,
				width: chartContainerRef.current.clientWidth,
				height: chartContainerRef.current.clientHeight,
				rightPriceScale: {
					visible: false, // Hide price bar at the right
				},
				timeScale: {
					borderColor: '#485c7b',
					timeVisible: true,
					minBarSpacing: 0.001,
				},
				handleScale: {
					// Scaling with the mouse wheel
					mouseWheel: false,
					// Scaling with pinch/zoom gestures.
					pinch: false,
					// Scaling the price and/or time scales by holding down the left mouse button and moving the mouse.
					// axisPressedMouseMove: false,
				},
				handleScroll: {
					mouseWheel: false,
					pressedMouseMove: false,
				},
				localization: {
					timeFormatter: (businessDayOrTimestamp) => {
						if (isBusinessDay(businessDayOrTimestamp)) {
							return (
								businessDayOrTimestamp.day +
								'-' +
								businessDayOrTimestamp.month +
								'-' +
								businessDayOrTimestamp.year
							);
						}

						return moment(businessDayOrTimestamp * 1000).format('DD MMM YY');
						// return formatTime(intervals, businessDayOrTimestamp);
					},
				},
			});

			getChartData();
		}
	}, [chartType]);

	// https://tradingview.github.io/lightweight-charts/tutorials/how_to/tooltips
	useEffect(() => {
		if (chartRef.current) {
			// subscribeCrosshairMove subscribeClick
			chartRef.current.subscribeCrosshairMove((param) => {
				const width = chartContainerRef.current.clientWidth;
				const height = chartContainerRef.current.clientHeight;

				const toolTipWidth = tooltipRef.current.clientWidth;
				const toolTipHeight = tooltipRef.current.clientHeight;

				const price = param.seriesPrices.get(baselineRef.current);
				// const volume = param.seriesPrices.get(volumesRef.current)?.toFixed(2);
				const d = new Date(param.time * 1000);

				const date = moment(d).format('DD/MM/YYYY');
				const time = moment(d).format('h:mm A'); // 12h format, 24h: HH:mm

				if (
					!param.time ||
					param.point.x < 0 ||
					param.point.x > width ||
					param.point.y < 0 ||
					param.point.y > height
				) {
					tooltipRef.current.style.display = 'none';
					return;
				}

				tooltipRef.current.style.display = 'block';
				tooltipRef.current.innerHTML = ReactDOMServer.renderToString(
					<div>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<span style={{ fontWeight: 700 }}>{date}</span>
							<span style={{ color: 'var(--color-sub-txt)', fontWeight: 500, fontSize: 12 }}>{time}</span>
						</div>
						<div>
							Price: <b>${formatNumber(price)}</b>
						</div>
					</div>
				);

				const y = param.point.y;

				let left = param.point.x + toolTipWidth / 2 - toolTipMargin;

				// Tooltip at the right of chart
				if (width - left < toolTipWidth) {
					left = param.point.x - toolTipWidth + toolTipMargin;
				}

				let top = y + toolTipMargin;
				if (top > height - toolTipHeight) {
					top = y - toolTipHeight - toolTipMargin;
				}

				tooltipRef.current.style.left = left + 'px';
				tooltipRef.current.style.top = top + 'px';
			});
		}
	}, [chartRef]);

	// useEffect(() => {
	// 	if (dataRef.current) {
	// 		const lastPrice = dataRef.current[dataRef.current.length - 1];
	// 		if (currentPrice && baselineRef.current) {
	// 			baselineRef.current.update({
	// 				time: lastPrice[0] / 1000,
	// 				value: Number(currentPrice)
	// 			});
	// 		}
	// 	}
	// }, [currentPrice]);

	// Resize chart on container resizes.
	useEffect(() => {
		const container = chartContainerRef.current;

		if (container) {
			resizeObserver.current = new ResizeObserver((entries) => {
				const { width, height } = entries[0].contentRect;
				chartRef.current.applyOptions({ width, height });
				setTimeout(() => {
					chartRef.current.timeScale().fitContent();
				}, 0);
			});

			resizeObserver.current.observe(container);
		}

		return () => {
			resizeObserver.current.disconnect();
		};
	}, [chartType]);

	// Change chart bg
	useEffect(() => {
		if (chartRef.current) {
			if (isDarkMode) {
				chartRef.current.applyOptions(darkTheme);
			} else {
				chartRef.current.applyOptions(lightTheme);
			}
		}
	}, [isDarkMode]);

	const handleChangeType = (e, newValue) => {
		setChartType(newValue);
	};

	const handleChangeInterval = (e, newValue) => {
		setChartInterval(newValue);
	};

	function cancelFullScreen() {
		var el = document;
		var requestMethod =
			el.cancelFullScreen ||
			el.webkitCancelFullScreen ||
			el.mozCancelFullScreen ||
			el.exitFullscreen ||
			el.webkitExitFullscreen;
		if (requestMethod) {
			// cancel full screen.
			requestMethod.call(el);
		} else if (typeof window.ActiveXObject !== 'undefined') {
			// Older IE.
			var wscript = new window.ActiveXObject('WScript.Shell');
			if (wscript !== null) {
				wscript.SendKeys('{F11}');
			}
		}
	}

	function requestFullScreen(el) {
		// Supports most browsers and their versions.
		var requestMethod =
			el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

		if (requestMethod) {
			// Native full screen.
			requestMethod.call(el);
		} else if (typeof window.ActiveXObject !== 'undefined') {
			// Older IE.
			var wscript = new window.ActiveXObject('WScript.Shell');
			if (wscript !== null) {
				wscript.SendKeys('{F11}');
			}
		}
		return false;
	}

	function toggleFullScreen(el) {
		if (!el) {
			el = document.body; // Make the body go full screen.
		}
		var isInFullScreen =
			(document.fullScreenElement && document.fullScreenElement !== null) ||
			document.mozFullScreen ||
			document.webkitIsFullScreen;

		if (isInFullScreen) {
			cancelFullScreen();
		} else {
			requestFullScreen(el);
		}
		return false;
	}

	useImperativeHandle(ref, () => ({
		showFullScreen() {
			toggleFullScreen();
		},

		downloadImage(type) {
			if (type === 'png') {
				exportComponentAsPNG(chartContainerRef, {
					fileName: 'BTC_Chart.png',
				});
			}

			if (type === 'jpeg') {
				exportComponentAsJPEG(chartContainerRef, {
					fileName: 'BTC_Chart.jpg',
				});
			}
		},
	}));

	return (
		<div>
			<Box display='flex' justifyContent='space-between'>
				<Tabs
					value={chartType}
					onChange={handleChangeType}
					className={classes.tabs}
					TabIndicatorProps={{
						style: { display: 'none' },
					}}>
					<Tab label='Price' />
					<Tab label='Candle Chart' />
				</Tabs>
				<Tabs
					value={chartInterval}
					onChange={handleChangeInterval}
					className={classes.tabs}
					TabIndicatorProps={{
						style: { display: 'none' },
					}}
					sx={{
						'& .MuiTab-root': {
							width: 40,
							minWidth: 'initial',
							'&:hover': {
								opacity: '0.6'
							}
						},
					}}>
					<Tab label='1D' index={0} />
					<Tab label='7D' index={1} />
					<Tab label='1M' index={2} />
					<Tab label='3M' index={3} />
					<Tab label='1Y' index={4} />
				</Tabs>
			</Box>
			<TabPanel value={chartType} index={0}>
				<div className='chart-container' style={{ position: 'relative', height: 400 }} ref={chartContainerRef}>
					<Tooltip ref={tooltipRef}></Tooltip>
				</div>
			</TabPanel>
			<TabPanel value={chartType} index={1}>
				tab 2
			</TabPanel>
		</div>
	);
});

export default memo(CoinChart);