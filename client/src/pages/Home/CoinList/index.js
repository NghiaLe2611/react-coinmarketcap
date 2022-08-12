import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, Typography } from '@mui/material';
import coinApi from 'api/coinApi';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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

const getCoinList = async () => {
	const data = await coinApi.getCoins();
	return data.data;
};

function formatPercent(percent) {
    return Number(percent).toFixed(2);
};

export function formatNumber(number) {
    return Intl.NumberFormat('en-US').format(number);
};

const StyledTable = styled(Table)(({ theme }) => ({
    backgroundColor: '#fff',
    '& .MuiTableCell-root': {
        fontSize: 13,
        fontWeight: 500,
        '&.MuiTableCell-head': {
            fontWeight: 700
        }
    }
}));

const CoinList = () => {
    const {
		data: coins,
		isLoading,
		error,
	} = useQuery(
		['list-coin'],
		getCoinList,
		{
			refetchOnWindowFocus: false,
		},
		{
			onSuccess: (res) => {
				console.log(222, res);
			},
		}
	);

    if (isLoading) {
        return <p>Loading...</p>;
    };

    const getColorPrice = (val) => {
        if (val > 0) return 'var(--color-price-up)';
        if (val < 0) return 'var(--color-price-down)';
    };

	return (
		<TableContainer>
			<StyledTable>
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
							<TableRow key={`${item.id}-${item.symbol}`}>
								<TableCell align='center'></TableCell>
								<TableCell align='left'>{item.market_cap_rank}</TableCell>
								<TableCell align='left'>
									<img
										style={{ verticalAlign: 'middle', marginRight: '8px' }}
										src={item.image.replace('large', 'thumb')}
										alt={`logo-${item.name}`}
									/>
									<Typography>{item.name}</Typography>
									<Typography>{item.symbol.toUpperCase()}</Typography>
								</TableCell>
								<TableCell align='right'>{formatNumber(item.current_price)}</TableCell>
								<TableCell
									align='center'
									sx={{ color: getColorPrice(item.price_change_percentage_1h_in_currency) }}>
									{item.price_change_percentage_1h_in_currency > 0 ? (
										<ArrowDropUpIcon />
									) : (
										<ArrowDropDownIcon />
									)}
									{formatPercent(item.price_change_percentage_1h_in_currency)}%
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
								<TableCell align='right'>sparkline</TableCell>
							</TableRow>
						))}
				</TableBody>
			</StyledTable>
		</TableContainer>
	);
};

export default CoinList;
