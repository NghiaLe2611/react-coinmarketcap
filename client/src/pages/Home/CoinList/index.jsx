import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Typography } from '@mui/material';
import coinApi from 'api/coinApi';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CoinWrapper from 'pages/Home/CoinList/CoinWrapper';
import SparkLine from './SparkLine';
import CustomPagination from 'components/pagination/CustomPagination';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 100;

const headCells = [
    {
        id: '0',
        label: '',
        align: 'left'
    },
    {
        id: 'market_cap_rank',
        label: '#',
        align: 'left'
    },
    {
        id: 'name',
        label: 'Name',
        align: 'left'
    },
    {
        id: 'price',
        label: 'Price',
        align: 'right'
    },
    {
        id: '1h%',
        label: '1h%',
        align: 'center'
    },
    {
        id: '24h%',
        label: '24h%',
        align: 'center'
    },
    {
        id: '7d%',
        label: '7d%',
        align: 'center'
    },
    {
        id: 'cap',
        label: 'Market Cap',
        align: 'right'
    },
    {
        id: 'volume',
        label: 'Volume(24h)',
        align: 'right'
    },
    {
        id: 'supply',
        label: 'Circulating Supply',
        align: 'right'
    },
    {
        id: 'last',
        label: 'Last 7 Days',
        align: 'right'
    },
];

const getCoinList = async ({page}) => {
	const data = await coinApi.getCoins(page);
	return data.data;
};

function formatPercent(percent) {
    return Number(percent).toFixed(2);
};

export function formatNumber(number) {
    return Intl.NumberFormat('en-US').format(number);
};

const StyledTable = styled(Table)(({ theme }) => ({
    backgroundColor: 'transparent',
    '& .MuiTableCell-root': {
        fontSize: 13,
        fontWeight: 500,
        '&.MuiTableCell-head': {
            fontWeight: 700
        }
    }
}));

const CoinList = () => {
	const [page, setPage] = useState(1);
	const totalCoins = useSelector((state) => state.generalCoinStats.generalStats.cryptos);
	const firstLoadingRef = useRef(true);

    const {
		data: coins,
		isLoading,
		error,
	} = useQuery(
		['list-coin', page],
		() => getCoinList({page}),
		{
			// Take care to not remove the cached data for each page for a super fast response time in case of a page change
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		},
		{
			onSuccess: (res) => {
				console.log('onSuccess', res);
			},
		}
	);

	useEffect(() => {
		if (coins?.length) firstLoadingRef.current = false;
	}, [coins]);

    const getColorPrice = (val) => {
        if (val > 0) return 'var(--color-price-up)';
        if (val < 0) return 'var(--color-price-down)';
    };

	const handleChangePage = (e, newPage) => {
		setPage(prev => newPage);

		// const element = document.getElementById('coin-table')
		// element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		
		window.scroll({ top: 0, behavior: 'smooth' });
	};

	const count = Math.ceil(totalCoins / ITEMS_PER_PAGE);

	// Loading once
	if (isLoading) {
        return <p>Loading...</p>;
    };

	return (
		<>
			<TableContainer>
				<StyledTable id="coin-table">
					<TableHead>
						<TableRow>
							{headCells.map((item) => (
								<TableCell key={item.id} align={item.align}>
									{item.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{coins &&
							coins.map((item) => (
								<TableRow
									key={`${item.id}-${item.symbol}`}
									sx={{ '& .MuiTableCell-body': { padding: '10px' } }}>
									<TableCell align='center'></TableCell>
									<TableCell align='left'>{item.market_cap_rank}</TableCell>
									<TableCell align='left'>
										<CoinWrapper item={item} />
									</TableCell>
									<TableCell align='right'>{formatNumber(item.current_price)}</TableCell>
									<TableCell
										align='center'
										sx={{ color: getColorPrice(item.price_change_percentage_1h_in_currency) }}>
										<span style={{ display: 'flex', alignItems: 'center' }}>
											{item.price_change_percentage_1h_in_currency > 0 ? (
												<ArrowDropUpIcon />
											) : (
												<ArrowDropDownIcon />
											)}
											{formatPercent(item.price_change_percentage_1h_in_currency)}%
										</span>
									</TableCell>
									<TableCell
										align='center'
										sx={{ color: getColorPrice(item.price_change_percentage_24h_in_currency) }}>
										{formatPercent(item.price_change_percentage_24h_in_currency)}%
									</TableCell>
									<TableCell
										align='center'
										sx={{ color: getColorPrice(item.price_change_percentage_7d_in_currency) }}>
										{formatPercent(item.price_change_percentage_7d_in_currency)}%
									</TableCell>
									<TableCell align='right'>{formatNumber(item.market_cap)}</TableCell>
									<TableCell align='right'>{formatNumber(item.total_volume)}</TableCell>
									<TableCell align='right'>{formatNumber(item.circulating_supply)}</TableCell>
									<TableCell align='right'>
										<SparkLine
											data={item.sparkline_in_7d['price']}
											color={
												item['price_change_percentage_7d_in_currency'] >= 0
													? '#16c784'
													: '#ea3943'
											}
										/>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</StyledTable>
			</TableContainer>
			<CustomPagination count={count} page={page} onPageChange={handleChangePage} />
		</>
	);
};

export default CoinList;
