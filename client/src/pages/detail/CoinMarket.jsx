import { useCallback } from 'react';
import { Box, Button, Chip, IconButton, Link as MuiLink, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import Loader from 'components/Loader';
import { StyledTable } from 'components/table/common';
import SortTableHead from 'components/table/SortTableHead';
import { useSortableData } from 'hooks/useSortableData';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { formatNumber } from 'utils/helpers';
import useStyles from './styles';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const headCells = [
    {
        id: '0',
        label: '#',
        align: 'left'
    },
    {
        id: 'market.name',
        label: 'Source',
        align: 'left'
    },
    {
        id: 'base',
        label: 'Pairs',
        align: 'left',
		width: 210
    },
    {
        id: 'last',
        label: 'Price',
        align: 'right'
    },
    {
        id: 'volume',
        label: 'Volume',
        align: 'right'
    },
	{
        id: 'trust_score',
        label: 'Confidence',
        align: 'right'
    },
	{
        id: 'last_fetch_at',
        label: 'Updated',
        align: 'right',
		width: 150
    },
];

const getCoinMarkets = async ({ id }) => {
	const data = await coinApi.getTickers(id);
	return data.data;
};

const CoinMarket = ({ name, isFullData }) => {
	const classes = useStyles();
	const params = useParams();
	const { id } = params;

	const { data, isLoading, isFetching } = useQuery([`${id}-markets`, id, isFullData], () => getCoinMarkets({ id }), {
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
		cacheTime: Infinity,
		refetchIntervalInBackground: false,
		select: (res) => {
			if (isFullData) {
				return res.tickers;
			}

			return res.tickers.slice(0, 5);
		},
	});

	const { items, requestSort, sortConfig } = useSortableData(data ? data : []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const renderTrustScore = (score) => {
		switch (score) {
			case 'green':
				return <Chip sx={{ backgroundColor: '#16c784', color: '#eee', fontSize: 12 }} label='High' />;
			case 'yellow':
				return <Chip sx={{ backgroundColor: '#f5a341', color: '#eee', fontSize: 12 }} label='Moderate' />;
			case 'red':
				return <Chip sx={{ backgroundColor: '#ea3943', color: '#eee', fontSize: 12 }} label='Low' />;
			default:
				return <Chip sx={{ backgroundColor: '#929aaa', color: '#eee', fontSize: 12 }} label='N/A' />;
		}
	};

	return (
		<Box my={5}>
			<Typography variant='h3' className={classes.h3}>
				{name} Markets
			</Typography>
			<TableContainer sx={{ mb: 4 }}>
				<StyledTable id='coin-table'>
					<TableHead>
						<TableRow>
							{headCells.map((item) => (
								<SortTableHead
									key={item.id}
									name={item.id}
									label={item.label}
									align={item.align}
									requestSort={requestSort}
									sortConfig={sortConfig}
									style={{ minWidth: item.width }}
								/>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{isFetching ? (
							<Loader open={isFetching} />
						) : (
							items &&
							items.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>
										<Box display='flex' alignItems='center'>
											<img
												src={item.market.logo}
												alt={`${item.market.identifier}-logo`}
												width={25}
												style={{ marginRight: 8, borderRadius: '50%' }}
											/>
											{item.market.name}
										</Box>
									</TableCell>
									<TableCell>
										<MuiLink
											target='_blank'
											href={item.trade_url}
											sx={{ color: 'var(--color-primary)' }}>
											{item.base}/{item.target}
										</MuiLink>
									</TableCell>
									<TableCell align='right'>${formatNumber(item.last)}</TableCell>
									<TableCell align='right'>${formatNumber(item.volume)}</TableCell>
									<TableCell align='right'>{renderTrustScore(item.trust_score)}</TableCell>
									<TableCell align='right'>{moment(item.last_fetch_at).fromNow()}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</StyledTable>
			</TableContainer>
			{!isFullData ? (
				<Box textAlign='center'>
					<Button
						component={Link}
						to={`/currencies/${id}/markets`}
						variant='contained'
						sx={{
							minWidth: 240,
						}}
						className={classes.btnMore}
						endIcon={<KeyboardArrowRightIcon />}>
						See All Markets
					</Button>
				</Box>
			) : null}
		</Box>
	);
};

export default CoinMarket;
//https://api.coingecko.com/api/v3/coins/bitcoin/tickers?include_exchange_logo=true&depth=true
