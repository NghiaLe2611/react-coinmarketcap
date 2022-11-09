import { Box, List, ListItem, Typography } from '@mui/material';
import CoinChange from 'components/common/CoinChange';
import { memo } from 'react';
import { formatNumber, formatPercent, formatPriceChange } from 'utils/helpers';
import useStyles from './styles';

const PriceStats = ({ data }) => {
	const classes = useStyles();
	return (
		<Box>
			<Typography variant='h4' className={classes.h4} marginBottom='30px' height='40px' lineHeight='40px'>
				{data.name} Price Statistics
			</Typography>
			<Box backgroundColor='var(--bg-neutral-5)' borderRadius='8px'>
				<List className={classes.listStats}>
					<ListItem>
						<Typography>{data.name} Price</Typography>
						<Typography className='right'>
							${formatNumber(data.market_data.current_price['usd'])}
						</Typography>
					</ListItem>
					<ListItem>
						<Typography>Price Change 24h</Typography>
						<Box className='right'>
							<Typography
								sx={{
									color:
										data.market_data.price_change_24h >= 0
											? 'var(--color-price-up)'
											: 'var(--color-price-down)',
								}}>
								{formatPriceChange(data.market_data.price_change_24h)}
							</Typography>
							<CoinChange
								value={data.market_data['price_change_percentage_24h']}
								format={formatPercent}
								style={{ fontSize: 13 }}
							/>
						</Box>
					</ListItem>
					<ListItem>
						<Typography>24h Low / 24h High</Typography>
						<Typography className='right'>
							${formatNumber(data.market_data.low_24h['usd'])} <br />$
							{formatNumber(data.market_data.high_24h['usd'])}
						</Typography>
					</ListItem>
					<ListItem>
						<Typography>Trading Volume</Typography>
						<Typography className='right'>${formatNumber(data.market_data.total_volume['usd'])}</Typography>
					</ListItem>
					<ListItem>
						<Typography>Market Rank</Typography>
						<Typography className='right'>{formatNumber(data.market_cap_rank)}</Typography>
					</ListItem>
					<ListItem>
						<Typography>Market Cap</Typography>
						<Box className='right'>
							<Typography>${formatNumber(data.market_data.market_cap['usd'])}</Typography>
							<CoinChange
								value={data.market_data['market_cap_change_percentage_24h']}
								format={formatPercent}
								style={{ fontSize: 13 }}
							/>
						</Box>
					</ListItem>
					<ListItem>
						<Typography>Fully Diluted Market Cap</Typography>
						<Box className='right'>
							<Typography className='right'>
								${formatNumber(data.market_data.fully_diluted_valuation['usd'])}
							</Typography>
							<CoinChange
								value={data.market_data['market_cap_change_percentage_24h']}
								format={formatPercent}
								style={{ fontSize: 13 }}
							/>
						</Box>
					</ListItem>
				</List>
			</Box>
		</Box>
	);
};

export default memo(PriceStats);
