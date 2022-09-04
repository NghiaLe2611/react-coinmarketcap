import { Box, FormControl, FormLabel, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import CoinChange from 'components/common/CoinChange';
import CoinWrapper from 'components/common/CoinWrapper';
import CustomPagination from 'components/pagination/CustomPagination';
import Pagination from '@mui/material/Pagination';
import SortTableHead from 'components/table/SortTableHead';
import { useSortableData } from 'hooks/useSortableData';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { formatNumber, formatPercent, formatPrice } from 'utils/helpers';
import SparkLine from 'components/common/SparkLine';
import CategoryList from 'components/CategoryList';
import Loader from 'components/Loader';
import MuiPagination from 'components/pagination/MuiPagination';

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

const getCoinList = async ({ limit, page }) => {
	const data = await coinApi.getCoins(limit, page);
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

const StyledSelect = styled(TextField)(({
    backgroundColor: 'var(--bg-select)',
    borderRadius: 6,
    '& .MuiSelect-select': {
        fontSize: 13,
        padding: 6,
    },
    '& fieldset': {
        border: 0
    }
}));

const StyledOption = styled(MenuItem)(({
    fontSize: 12
}));

const WrapFilterBox = styled(Box)(({ theme }) => ({
    display: 'flex',
	alignItems: 'center',
    flexWrap: 'wrap',
}));

const CoinList = () => {
	const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
	const totalCoins = useSelector((state) => state.generalCoinStats.generalStats.cryptos);
	const firstLoadingRef = useRef(true);

	const { data, isLoading, isFetching, error } = useQuery(
		['list-coin', limit, page],
		() => getCoinList({ limit, page }),
		{
			// Take care to not remove the cached data for each page for a super fast response time in case of a page change
            // initialData: [],
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000, // Don't want an API call for 5 mins after the first time get data
			// cacheTime: Infinity,
            // refetchInterval: 2 * 60 * 1000
		},
		{
			onSuccess: (res) => {
				console.log('onSuccess', res);
			},
		}
	);

	const { items, requestSort, sortConfig } = useSortableData(data ? data : []);

    useEffect(() => {
		if (data?.length && !isFetching) {
            window.scroll({ top: 0, behavior: 'smooth' });
        }
    }, [isFetching, data]);

	const handleChangePage = (e, newPage) => {
		setPage(prev => newPage);
		// const element = document.getElementById('coin-table')
		// element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

    const handleChangeLimit = (e) => {
        setLimit(e.target.value);
    };

	const count = Math.ceil(totalCoins / limit);

    const pagination = useMemo(() => {
        return (
            <CustomPagination count={count} page={page} onPageChange={handleChangePage} />
        );
    }, [count, page]);

	// Loading once
	if (isLoading) {
        return <p>Loading...</p>;
    };

	return (
		<>
			<Loader open={isFetching} />
			<WrapFilterBox>
				<CategoryList />
				<Box display='flex' alignItems='center' marginLeft='auto'>
					<FormControl sx={{marginLeft: 'auto', flexDirection: 'row', alignItems: 'center'}}>
						<FormLabel sx={{fontSize: 13, color: 'var(--color-common-txt)', mr: 1}}>Show rows</FormLabel>
						<StyledSelect select size='small' sx={{minWidth: 60, mr: 2}} name='limit' value={limit} onChange={handleChangeLimit}>
							<StyledOption key='100' value={100}>
								100
							</StyledOption>
							<StyledOption key='50' value={50}>
								50
							</StyledOption>
							<StyledOption key='20' value={20}>
								20
							</StyledOption>
						</StyledSelect>
					</FormControl>
					<MuiPagination count={count} page={page} onChange={handleChangePage} />
					{/* <CustomPagination count={count} page={page} onPageChange={handleChangePage} /> */}
				</Box>
			</WrapFilterBox>
			<TableContainer sx={{mb: 5}}>
				<StyledTable id='coin-table'>
					<TableHead>
						<TableRow>
							{headCells.map((item) => (
								// <TableCell key={item.id} align={item.align} onClick={() => requestSort(item.id)}>
								// 	{item.label}
								// </TableCell>
								<SortTableHead key={item.id} name={item.id} label={item.label} align={item.align} requestSort={requestSort} sortConfig={sortConfig} style={{width: item.width}} />
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{items &&
							items.map((item) => (
								<TableRow key={`${item.id}-${item.symbol}`} sx={{'& .MuiTableCell-body': {padding: '10px'}}}>
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
										<SparkLine data={item.sparkline_in_7d['price']} color={item['price_change_percentage_7d_in_currency'] >= 0 ? '#16c784' : '#ea3943'} />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</StyledTable>
			</TableContainer>
			<MuiPagination count={count} page={page} onChange={handleChangePage} />
		</>
	);
};

export default CoinList;

//https://blog.devgenius.io/server-side-sorting-and-pagination-using-react-query-and-react-bootstrap-table-next-best-practice-ce0041f67ed8