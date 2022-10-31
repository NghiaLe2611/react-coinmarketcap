import { Box, Button, Chip, Grid, Link, List, ListItem, Popover, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import { BoxFlex } from 'components/common';
import CoinChange from 'components/common/CoinChange';
import { useParams } from 'react-router-dom';
import { formatNumber, formatPercent } from 'utils/helpers';
import useStyles from './styles';
import LaunchIcon from '@mui/icons-material/Launch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import ListLink from './ListLink';
import { useMemo } from 'react';
import ListTag from './ListTag';
import { dataFromCmcArr } from 'utils/constants';

const getDetail = async ({ id }) => {
	const data = await coinApi.getDetail(id);
	return data.data;
};

const DetailPage = () => {
	const classes = useStyles();
	const params = useParams();
	const { id } = params;

	const { data, isFetching, isError } = useQuery(
		[`coin-detail-${id}`, id],
		() => getDetail({ id }),
		{
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000,
			cacheTime: Infinity,
			refetchInterval: 10 * 60 * 1000,
			// select: (res) => {
			// 	// From cmc
			//     if (dataFromArr.includes(id)) {
			//         return Object.values(res.data)[0];
			//     }

			//     return res;
			// },
		},
		{
			onSuccess: (res) => {
				console.log('onSuccess', res);
			},
		}
	);

	console.log(data);

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

	if (isError) {
		return <div>There is an error. Please try again !</div>;
	}

	return isFetching ? (
		<div>loading...</div>
	) : data ? (
		dataFromCmcArr.includes(id) ? (
			<Grid container spacing={4}>
				<Grid item xs={12} sm={6} lg={4}>
					<BoxFlex pt={2}>
						<img src={data.image['small']} alt={data.name} className={classes.logo} width={30} />
						<Typography className={classes.name}>{data.name}</Typography>
						<Typography className={classes.symbol}>{data.symbol}</Typography>
						<Typography className={classes.rank}>Rank #{data.market_cap_rank}</Typography>
					</BoxFlex>
					<Box>
						<ListLink data={data} dataFromCmc={dataFromCmcArr.includes(id)} />
						{data.tags.length > 0 && (
							<ListTag data={data.tags} coin={data.name} algorithm={data.hashing_algorithm} />
						)}
					</Box>
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
					<Box className={classes.stats}>
						<Typography className='lbl'>Low 24h: </Typography>
						<Typography className='val'>${formatNumber(data.market_data.low_24h['usd'])}</Typography>
						<Box className={classes.priceBar}>
							<span className={classes.percent} style={{ width: `${widthPercent}%` }}></span>
						</Box>
						<Typography className='lbl'>High 24h: </Typography>
						<Typography className='val'>${formatNumber(data.market_data.high_24h['usd'])}</Typography>
					</Box>
				</Grid>
			</Grid>
		) : (
			<Grid container spacing={4}>
				<Grid item xs={12} sm={6} lg={4}>
					<BoxFlex pt={2}>
						<img src={data.image['small']} alt={data.name} className={classes.logo} width={30} />
						<Typography className={classes.name}>{data.name}</Typography>
						<Typography className={classes.symbol}>{data.symbol}</Typography>
						<Typography className={classes.rank}>Rank #{data.market_cap_rank}</Typography>
					</BoxFlex>
					<Box>
						<ListLink data={data} dataFromCmc={dataFromCmcArr.includes(id)} />
						{data.categories.length > 0 && (
							<ListTag data={data.categories} coin={data.name} algorithm={data.hashing_algorithm} />
						)}
					</Box>
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
						<Typography className='lbl'>Low 24h: </Typography>
						<Typography className='val'>${formatNumber(data.market_data.low_24h['usd'])}</Typography>
						<Box className={classes.priceBar}>
							<span className={classes.percent} style={{ width: `${widthPercent}%` }}></span>
						</Box>
						<Typography className='lbl'>High 24h: </Typography>
						<Typography className='val'>${formatNumber(data.market_data.high_24h['usd'])}</Typography>
					</Box>
					<Stack direction='row' className={classes.overallStats}>
						<Box className='item'>
							<Typography className='stats-lbl'>Market Cap</Typography>
							<Typography className='val'>${formatNumber(data.market_data.market_cap['usd'])}</Typography>
							<CoinChange
								value={data.market_data.market_cap_change_percentage_24h_in_currency['usd']}
								format={formatPercent}
								style={{ fontSize: 13 }}
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
							<Typography className='val'>
								${formatNumber(data.market_data.total_volume['usd'])}
							</Typography>
						</Box>
						<Box className='item'>
							<Typography className='stats-lbl'>Circulating Supply</Typography>
							<Typography className='val'>{formatNumber(data.market_data.circulating_supply)}</Typography>
						</Box>
					</Stack>
				</Grid>
			</Grid>
		)
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
