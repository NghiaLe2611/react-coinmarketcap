import { memo, useMemo, useRef } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Grid, Typography } from '@mui/material';
import CoinChange from 'components/common/CoinChange';
import { formatNumber, formatPercent, formatSupply } from 'utils/helpers';
import useStyles from './styles';

const BoxRight = ({ data }) => {
	const classes = useStyles();
	const circulatingSupply = useRef(0);

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

	// Calc circulating supply percent
	if (data) {
		const maxSupply = data.market_data.max_supply;
		const supply = data.market_data.circulating_supply;
		const supplyPercent = (supply * 100) / maxSupply;

		circulatingSupply.current = Math.round(supplyPercent);
	}

	return (
		<Grid item xs={12} sm={6} lg={8}>
			<Box>
				<Typography className={classes.lbl}>
					{data.name} Price ({data.symbol.toUpperCase()})
				</Typography>
				<Box className={classes.price}>
					<Typography>${formatNumber(data.market_data.current_price['usd'])}</Typography>
					<CoinChange
						hasBg={true}
						value={data.market_data['price_change_percentage_24h']}
						format={formatPercent}
						style={{ marginLeft: 10 }}
					/>
				</Box>
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
			<Grid container spacing={2} className={classes.overallStats}>
				<Grid item xs={12} sm={6} lg={3}>
					<Box className='item'>
						<Typography className='stats-lbl'>Market Cap</Typography>
						<Box
							sx={{
								'@media (max-width: 768px)': {
									display: 'flex',
									alignItems: 'center',
								},
							}}>
							<Typography className='val'>${formatNumber(data.market_data.market_cap['usd'])}</Typography>
							<CoinChange
								value={data.market_data.market_cap_change_percentage_24h_in_currency['usd']}
								format={formatPercent}
								style={{ fontSize: 13, fontWeight: 700 }}
							/>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box className='item'>
						<Typography className='stats-lbl'>Fully Diluted Market Cap</Typography>
						<Typography className='val'>
							${formatNumber(data.market_data.fully_diluted_valuation['usd'])}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box className='item'>
						<Typography className='stats-lbl'>Volume (24h)</Typography>
						<Typography className='val'>${formatNumber(data.market_data.total_volume['usd'])}</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box className='item'>
						<Typography className='stats-lbl'>Circulating Supply</Typography>
						<Box display='flex' justifyContent='space-between'>
							<Typography className='val'>
								{formatSupply(data.market_data.circulating_supply)} {data.symbol.toUpperCase()}
							</Typography>
							{data.market_data.circulating_supply && data.market_data.max_supply ? (
								<Typography className='supply'>{circulatingSupply.current}%</Typography>
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
				</Grid>
			</Grid>
		</Grid>
	);
};

export default memo(BoxRight);
