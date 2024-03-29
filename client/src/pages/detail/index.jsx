import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import { useLocation, useParams } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import BoxLeft from './BoxLeft';
import BoxRight from './BoxRight';
import CoinChart from './CoinChart';
import CoinConverter from './CoinConverter';
import CoinMarket from './CoinMarket';
import PriceStats from './PriceStats';
import useStyles from './styles';
import Loader from 'components/Loader';
import { PrimaryBtn } from 'components/common';

const getDetail = async ({ id }) => {
	const data = await coinApi.getDetail(id);
	return data.data;
};

const DetailPage = () => {
	const classes = useStyles();
	const params = useParams();
	const { id } = params;
	const location = useLocation();
	const slugs = location.pathname.split('/');
	const slug = slugs[slugs.length - 1];
	console.log(111, slug);

	const [data, setData] = useState(null);

	const childRef = useRef();
	// const ws = useRef(null);
	const lastPrice = useRef(0);
	const hasValue = useRef(false);
	const circulatingSupply = useRef(0);

	const {
		isFetching,
		isError,
		data: coins,
		error,
	} = useQuery([`coin-detail-${id}`, id], () => getDetail({ id }), {
		staleTime: 5 * 60 * 1000,
		cacheTime: Infinity,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		setData(coins);
	}, [coins]);

	// Store last 24h price
	useEffect(() => {
		if (data) {
			if (!hasValue.current) {
				lastPrice.current = data.market_data.current_price['usd'] + data.market_data.price_change_24h;
				hasValue.current = true;
			}
		}
	}, [data]);

	// Update real time price
	// useEffect(() => {
	// 	if (data) {
	// 		const { symbol } = data;
	// 		ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}usdt@miniTicker`);
	// 		// ws.current.onopen = () => console.log('ws opened');
	// 		// ws.current.onclose = () => console.log('ws closed');
	// 	}

	// 	if (!ws.current) return;

	// 	ws.current.onmessage = (e) => {
	// 		const message = JSON.parse(e.data);
	// 		// console.log('e', message);
	// 		const last24hPrice = lastPrice.current;
	// 		if (message) {
	// 			const newPrice = message.c;
	// 			const new24hPercent = (newPrice * 100) / last24hPrice - 100;

	// 			setData(
	// 				(prevData) =>
	// 					(prevData = {
	// 						...data,
	// 						market_data: {
	// 							...data.market_data,
	// 							current_price: {
	// 								...data.market_data.current_price,
	// 								usd: newPrice,
	// 							},
	// 							price_change_percentage_24h: new24hPercent.toFixed(2),
	// 						},
	// 					})
	// 			);
	// 		}
	// 	};

	// 	return () => {
	// 		ws.current.close();
	// 	};
	// }, [data]);

	// Calc price width percent
	const widthPercent = useMemo(() => {
		if (data) {
			const low = data.market_data.low_24h['usd'];
			const high = data.market_data.high_24h['usd'];
			const total = high - low;
			const current = data.market_data.current_price['usd'] - low;
			const widthPercent = (current * 100) / total;

			return widthPercent;
		}

		return null;
	}, [data]);

	const handleShowFullScreen = () => {
		childRef.current.showFullScreen();
	};

	const handleDownloadImage = (type) => {
		childRef.current.downloadImage(type);
	};

	// Calc circulating supply percent
	if (data) {
		const maxSupply = data.market_data.max_supply;
		const supply = data.market_data.circulating_supply;
		const supplyPercent = (supply * 100) / maxSupply;

		circulatingSupply.current = Math.round(supplyPercent);
	}

	if (isError) {
		if (error.response.data.message) {
			return (
				<div className='empty'>
					<div style={{ textAlign: 'center' }}>
						<p style={{ marginBottom: 20 }}>{error.response.data.message}</p>
						<PrimaryBtn variant='contained'>Go To Homepage</PrimaryBtn>
					</div>
				</div>
			);
		}

		return (
			<div className='empty'>
				<div style={{ textAlign: 'center' }}>
					<p style={{ marginBottom: 20 }}>There is an error. Please try again</p>
					<PrimaryBtn variant='contained'>Go To Homepage</PrimaryBtn>
				</div>
			</div>
		);
	}

	if (slug === 'markets') {
		return isFetching ? (
			<Loader
				backdrop={false}
				open={isFetching}
				style={{
					minHeight: 300,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			/>
		) : data ? (
			<Grid container spacing={4}>
				<BoxLeft data={data} id={id} />
				<BoxRight data={data} />
				<Grid container item columnSpacing={5} mt={3} pt={3} className={classes.mainContent}>
					<Grid item xs={12}>
						<CoinMarket name={data.name} isFullData={true} />
					</Grid>
				</Grid>
			</Grid>
		) : (
			<div>Symbol not found. Please visit another page.</div>
		);
	}

	return isFetching ? (
		<Loader
			backdrop={false}
			open={isFetching}
			style={{
				minHeight: 300,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		/>
	) : data ? (
		<Grid container spacing={4}>
			<BoxLeft data={data} id={id} />
			<BoxRight data={data} />
			<Grid container item columnSpacing={5} mt={3} pt={3} className={classes.mainContent}>
				<Grid item xs={12} lg={8}>
					<Box className={classes.wrapTitle}>
						<Typography variant='h4' className={classes.h4}>
							{data.name} to USD Chart
						</Typography>
						<ActionButtons onShowFullScreen={handleShowFullScreen} onDownloadImage={handleDownloadImage} />
					</Box>

					<CoinChart id={id} ref={childRef} />
					{/* currentPrice={data?.market_data.current_price['usd']} */}
					<CoinConverter
						name={data.name}
						symbol={data.symbol.toUpperCase()}
						imgSrc={data.image.small}
						price={data.market_data.current_price['usd']}
					/>
					<Box>
						<Typography variant='h3' className={classes.h3}>
							What is {data.name} ({data.symbol.toUpperCase()}) ?
						</Typography>
						<Typography
							dangerouslySetInnerHTML={{ __html: data.description.en }}
							className={classes.desc}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} lg={4}>
					<PriceStats data={data} />
				</Grid>
				<Grid item xs={12}>
					<CoinMarket name={data.name} />
				</Grid>
			</Grid>
		</Grid>
	) : (
		<div>Symbol not found. Please visit another page.</div>
	);
};

export default DetailPage;


// https://codesandbox.io/s/github/renaissancetroll/reactjs-crypto-api-dashboard/tree/master/