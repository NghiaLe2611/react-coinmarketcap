import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Typography } from '@mui/material';
import coinApi from 'api/coinApi';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import CoinWrapper from 'components/common/CoinWrapper';
import SparkLine from './SparkLine';
import CustomPagination from 'components/pagination/CustomPagination';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSortableData } from 'hooks/useSortableData';
import { formatPrice, formatNumber, formatPercent } from 'utils/helpers';
import SortTableHead from 'components/table/SortTableHead';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CoinChange from 'components/common/CoinChange';

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
        align: 'left',
		width: 210
    },
    {
        id: 'current_price',
        label: 'Price',
        align: 'right'
    },
    {
        id: 'price_change_percentage_1h_in_currency',
        label: '1h%',
        align: 'center'
    },
    {
        id: 'price_change_percentage_24h_in_currency',
        label: '24h%',
        align: 'center'
    },
    {
        id: 'price_change_percentage_7d_in_currency',
        label: '7d%',
        align: 'center'
    },
    {
        id: 'market_cap',
        label: 'Market Cap',
        align: 'right'
    },
    {
        id: 'total_volume',
        label: 'Volume(24h)',
        align: 'right'
    },
    {
        id: 'circulating_supply',
        label: 'Circulating Supply',
        align: 'right'
    },
    {
        id: 'chart_last_7_day',
        label: 'Last 7 Days',
        align: 'right'
    },
];

const getCoinList = async ({ page }) => {
	const data = await coinApi.getCoins(page);
	return data.data;
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

	const { data, isLoading, error } = useQuery(
		['list-coin', page],
		() => getCoinList({ page }),
		{
			// Take care to not remove the cached data for each page for a super fast response time in case of a page change
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			staleTime: 10 * 60 * 1000,
			cacheTime: Infinity,
		},
		{
			onSuccess: (res) => {
				console.log('onSuccess', res);
			},
		}
	);

	const { items, requestSort, sortConfig } = useSortableData(data ? data : []);

	useEffect(() => {
		if (data?.length) firstLoadingRef.current = false;
	}, [data]);

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
			<CustomPagination count={count} page={page} onPageChange={handleChangePage} />
			<TableContainer>
				<StyledTable id='coin-table'>
					<TableHead>
						<TableRow>
							{headCells.map((item) => (
								// <TableCell key={item.id} align={item.align} onClick={() => requestSort(item.id)}>
								// 	{item.label}
								// </TableCell>
								<SortTableHead
									key={item.id}
									name={item.id}
									label={item.label}
									align={item.align}
									requestSort={requestSort}
									sortConfig={sortConfig}
									style={{ width: item.width }}
								/>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{items &&
							items.map((item) => (
								<TableRow
									key={`${item.id}-${item.symbol}`}
									sx={{ '& .MuiTableCell-body': { padding: '10px' } }}>
									<TableCell align='center'></TableCell>
									<TableCell align='left'>{item.market_cap_rank}</TableCell>
									<TableCell align='left'>
										<CoinWrapper item={item} />
									</TableCell>
									<TableCell align='right'>{formatPrice(item.current_price)}</TableCell>
									<TableCell align='center'>
										<CoinChange value={item.price_change_percentage_1h_in_currency} format={formatPercent} />
									</TableCell>
									<TableCell align='center'>
										<CoinChange value={item.price_change_percentage_24h_in_currency} format={formatPercent} />
									</TableCell>
									<TableCell align='center'>
										<CoinChange value={item.price_change_percentage_7d_in_currency} format={formatPercent} />
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

//https://blog.devgenius.io/server-side-sorting-and-pagination-using-react-query-and-react-bootstrap-table-next-best-practice-ce0041f67ed8