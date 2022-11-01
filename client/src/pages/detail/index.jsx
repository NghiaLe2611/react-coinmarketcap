import { useState, useEffect, useMemo, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import { BoxFlex } from 'components/common';
import CoinChange from 'components/common/CoinChange';
import { useParams } from 'react-router-dom';
import { dataFromCmcArr } from 'utils/constants';
import { formatNumber, formatPercent, formatSupply } from 'utils/helpers';
import ListLink from './ListLink';
import ListTag from './ListTag';
import useStyles from './styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const getDetail = async ({ id }) => {
	const data = await coinApi.getDetail(id);
	return data.data;
};

const DetailPage = () => {
	const classes = useStyles();
	const params = useParams();
	const { id } = params;

	const [data, setData] = useState(null);
	const ws = useRef(null);
	const lastPrice = useRef(0);
	const hasValue = useRef(false);
	const circulatingSupply = useRef(0);

	const { isFetching, isError } = useQuery([`coin-detail-${id}`, id], () => getDetail({ id }), {
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
		cacheTime: Infinity,
		refetchIntervalInBackground: false,
		onSuccess: (res) => {
			console.log(res);
			setData(res);
		},
		// select: (res) => {
		// 	// From cmc
		//     if (dataFromArr.includes(id)) {
		//         return Object.values(res.data)[0];
		//     }

		//     return res;
		// },
	});

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
	useEffect(() => {
		if (data) {
			const { symbol } = data;
			ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}usdt@miniTicker`);
			// ws.current.onopen = () => console.log('ws opened');
			// ws.current.onclose = () => console.log('ws closed');
		}

		if (!ws.current) return;

		ws.current.onmessage = (e) => {
			const message = JSON.parse(e.data);
			// console.log('e', message);
			const last24hPrice = lastPrice.current;
			if (message) {
				const newPrice = message.c;
				const new24hPercent = (newPrice * 100) / last24hPrice - 100;

				setData(
					(prevData) =>
						(prevData = {
							...data,
							market_data: {
								...data.market_data,
								current_price: {
									...data.market_data.current_price,
									usd: newPrice,
								},
								price_change_percentage_24h: new24hPercent.toFixed(2),
							},
						})
				);
			}
		};

		return () => {
			ws.current.close();
		};
	}, [data]);

	// Price bar
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

	// Circulating supply percent
	if (data) {
		const maxSupply = data.market_data.max_supply;
		const supply = data.market_data.circulating_supply;
		const supplyPercent = (supply * 100) / maxSupply;

		circulatingSupply.current = Math.round(supplyPercent);
	}

	if (isError) {
		return <div>There is an error. Please try again !</div>;
	}

	return isFetching ? (
		<div>loading...</div>
	) : data ? (
		<Grid container spacing={4}>
			<Grid item xs={12} sm={6} lg={4}>
				<BoxFlex pt={2}>
					<img src={data.image['small']} alt={data.name} className={classes.logo} width={30} />
					<Typography className={classes.name}>{data.name}</Typography>
					<Typography className={classes.symbol}>{data.symbol}</Typography>
					<Typography className={classes.rank}>Rank #{data.market_cap_rank}</Typography>
				</BoxFlex>
				{dataFromCmcArr.includes(id) ? (
					<Box>
						<ListLink data={data.urls} dataFromCmc={dataFromCmcArr.includes(id)} />
						{data.tags.length > 0 && (
							<ListTag data={data.tags} coin={data.name} algorithm={data.hashing_algorithm} />
						)}
					</Box>
				) : (
					<Box>
						<ListLink data={data.links} dataFromCmc={dataFromCmcArr.includes(id)} />
						{data.categories.length > 0 && (
							<ListTag data={data.categories} coin={data.name} algorithm={data.hashing_algorithm} />
						)}
					</Box>
				)}
			</Grid>
			<Grid item xs={12} sm={6} lg={8}>
				<Box>
					<Typography className={classes.lbl}>
						{data.name} Price ({data.symbol.toUpperCase()})
					</Typography>
					<Typography className={classes.price}>
						${formatNumber(data.market_data.current_price['usd'])}
						<CoinChange
							hasBg={true}
							value={data.market_data['price_change_percentage_24h']}
							format={formatPercent}
							style={{ marginLeft: 10 }}
						/>
					</Typography>
				</Box>
				<Box className={classes.priceStats}>
					<Box className='box'>
						<Typography className='lbl'>Low 24h: </Typography>
						<Typography className='val'>${formatNumber(data.market_data.low_24h['usd'])}</Typography>
					</Box>
					<Box className={classes.priceBar} margin='0 15px'>
						<span className={classes.percent} style={{ width: `${widthPercent}%` }}>
							<ArrowDropUpIcon className='icon' />
						</span>
					</Box>
					<Box className='box'>
						<Typography className='lbl'>High 24h: </Typography>
						<Typography className='val'>${formatNumber(data.market_data.high_24h['usd'])}</Typography>
					</Box>
				</Box>
				<Box className={classes.overallStats}>
					<Box className='item'>
						<Typography className='stats-lbl'>Market Cap</Typography>
						<Typography className='val'>${formatNumber(data.market_data.market_cap['usd'])}</Typography>
						<CoinChange
							value={data.market_data.market_cap_change_percentage_24h_in_currency['usd']}
							format={formatPercent}
							style={{ fontSize: 13, fontWeight: 700 }}
						/>
					</Box>
					<Box className='item'>
						<Typography className='stats-lbl'>Fully Diluted Market Cap</Typography>
						<Typography className='val'>
							${formatNumber(data.market_data.fully_diluted_valuation['usd'])}
						</Typography>
					</Box>
					<Box className='item'>
						<Typography className='stats-lbl'>Volume (24h)</Typography>
						<Typography className='val'>${formatNumber(data.market_data.total_volume['usd'])}</Typography>
					</Box>
					<Box className='item'>
						<Typography className='stats-lbl'>Circulating Supply</Typography>
						<Box display='flex' justifyContent='space-between'>
							<Typography className='val'>{formatSupply(data.market_data.circulating_supply)} {data.symbol.toUpperCase()}</Typography>
							{data.market_data.circulating_supply && data.market_data.max_supply ? (
								<Typography className='supply'>
									{circulatingSupply.current}%
								</Typography>
							) : null}
						</Box>
						<Box className={classes.priceBar} my={2} sx={{ width: '100% !important' }}>
							<span className={classes.percent} style={{ width: `${circulatingSupply.current}%` }}></span>
						</Box>
						<Box display='flex' justifyContent='space-between'>
							<Typography className='stats-lbl'>Total supply</Typography>
							{data.market_data.circulating_supply ? (
								<Typography className='val'>
									{formatNumber(data.market_data.circulating_supply)}
								</Typography>
							) : null}
						</Box>

						<Box display='flex' justifyContent='space-between'>
							<Typography className='stats-lbl'>Max supply</Typography>
							{data.market_data.max_supply ? (
								<Typography className='val'>{formatNumber(data.market_data.max_supply)}</Typography>
							) : null}
						</Box>
					</Box>
				</Box>
			</Grid>
		</Grid>
	) : (
		<div>Symbol not found. Please visit another page.</div>
	);
};

export default DetailPage;


// https://codesandbox.io/s/github/renaissancetroll/reactjs-crypto-api-dashboard/tree/master/
// const ws = new WebSocket( 'wss://stream.binance.com:9443/ws/btcusdt@miniTicker' ); 

// ws.addEventListener('message', e => {
	
//   let data = JSON.parse( e.data ) || {};
//   let { s, c } = data;

//   el.textContent = s +' $'+ Number( c ).toFixed( 2 );
// });
