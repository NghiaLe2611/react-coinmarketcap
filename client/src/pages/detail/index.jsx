import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import { BoxFlex } from 'components/common';
import CoinChange from 'components/common/CoinChange';
import { useParams } from 'react-router-dom';
import { formatNumber, formatPercent } from 'utils/helpers';
import useStyles from './styles';

const dataFromArr = ['bitcoin', 'ethereum', 'tether'];

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

    if (isError) {
        return <div>There is an error. Please try again !</div>
    }

	return isFetching ? (
		<div>loading...</div>
	) : data ? (
		<Grid container>
			<Grid item xs={12} sm={6} lg={5}>
				<BoxFlex pt={2}>
					<img src={data.image['small']} alt={data.name} className={classes.logo} width={30} />
					<Typography className={classes.name}>{data.name}</Typography>
					<Typography className={classes.symbol}>{data.symbol}</Typography>
					<Typography className={classes.rank}>Rank #{data.market_cap_rank}</Typography>
				</BoxFlex>
			</Grid>
			<Grid item xs={12} sm={6} lg={7}>
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
			</Grid>
		</Grid>
	) : (
		<div>Symbol not found. Please visit another page.</div>
	);
};

export default DetailPage;
