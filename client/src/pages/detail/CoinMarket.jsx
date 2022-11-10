import { Box, Grid, List, ListItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import CoinChange from 'components/common/CoinChange';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatNumber, formatPercent, formatPriceChange } from 'utils/helpers';
import ActionButtons from './ActionButtons';
import BoxLeft from './BoxLeft';
import BoxRight from './BoxRight';
import CoinChart from './CoinChart';
import CoinConverter from './CoinConverter';
import PriceStats from './PriceStats';
import useStyles from './styles';

const getCoinMarkets = async ({ id }) => {
	const data = await coinApi.getTickers(id);
	return data.data;
};

const CoinMarket = ({ name }) => {
	const classes = useStyles();
    const params = useParams();
	const { id } = params;
    
	const { data, isLoading, isFetching } = useQuery(
		[`${id}-markets`, id],
		() => getCoinMarkets({ id }),
		{
			refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
			cacheTime: Infinity,
		}
	);

    console.log(data);

	return (
		<Box mt={5}>
			<Typography variant='h3' className={classes.h3}>
				{name} Markets
			</Typography>
		</Box>
	);
};

export default CoinMarket;
//https://api.coingecko.com/api/v3/coins/bitcoin/tickers?include_exchange_logo=true&depth=true
