import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import CoinChange from 'components/common/CoinChange';
import CoinWrapper from 'components/common/CoinWrapper';
import SortTableHead from 'components/table/SortTableHead';
import { useSortableData } from 'hooks/useSortableData';
import { memo } from 'react';
import { formatNumber, formatPercent, formatPrice } from 'utils/helpers';

const headCells = [
	{
		id: '0',
		label: '',
		align: 'left',
	},
	{
		id: 'rank',
		label: '#',
		align: 'left',
	},
	{
		id: 'name',
		label: 'Name',
		align: 'left',
		width: 210,
	},
	{
		id: 'quote.USD.price',
		label: 'Price',
		align: 'right',
	},
	{
		id: 'quote.USD.percent_change_1h',
		label: '1h%',
		align: 'center',
	},
	{
		id: 'quote.USD.percent_change_24h',
		label: '24h%',
		align: 'center',
	},
	{
		id: 'quote.USD.percent_change_7d',
		label: '7d%',
		align: 'center',
	},
	{
		id: 'quote.USD.market_cap',
		label: 'Market Cap',
		align: 'right',
	},
	{
		id: 'quote.USD.volume_24h',
		label: 'Volume(24h)',
		align: 'right',
	},
	{
		id: 'circulating_supply',
		label: 'Circulating Supply',
		align: 'right',
	},
	{
		id: 'sparkline',
		label: 'Last 7 Days',
		align: 'right',
	},
];

const StyledTable = styled(Table)(({ theme }) => ({
	backgroundColor: 'transparent',
	'& .MuiTableCell-root': {
		fontSize: 13,
		fontWeight: 500,
		'&.MuiTableCell-head': {
			fontWeight: 700,
		},
	},
}));

const CategoryTable = ({ data }) => {
	const { items, requestSort, sortConfig } = useSortableData(data);

	return (
		<TableContainer>
			<StyledTable>
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
								style={{ width: item.width }}
							/>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{items &&
						items.map((item) => (
							<TableRow key={item.id} sx={{ '& .MuiTableCell-body': { padding: '10px' } }}>
								<TableCell align='center'></TableCell>
								<TableCell align='left'>{item.cmc_rank}</TableCell>
								<TableCell align='left'>
									{/* <img
										src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`}
										alt={item.name}
										width={25}
									/>
									{item.name} {item.symbol} */}
									<CoinWrapper
										item={{
											image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`,
											name: item.name,
											symbol: item.symbol,
										}}
									/>
								</TableCell>
								<TableCell align='right'>{formatPrice(item.quote['USD'].price)}</TableCell>
								<TableCell align='center'>
									<CoinChange value={item.quote['USD'].percent_change_1h} format={formatPercent} />
								</TableCell>
								<TableCell align='center'>
									<CoinChange value={item.quote['USD'].percent_change_24h} format={formatPercent} />
								</TableCell>
								<TableCell align='center'>
									<CoinChange value={item.quote['USD'].percent_change_7d} format={formatPercent} />
								</TableCell>
								<TableCell align='right'>${formatNumber(item.quote['USD'].market_cap)}</TableCell>
								<TableCell align='right'>${formatNumber(item.quote['USD'].volume_24h)}</TableCell>
								<TableCell align='right'>{formatNumber(item.circulating_supply)}</TableCell>
								<TableCell align='right'>
									<Link href={`https://coinmarketcap.com/currencies/${item.slug}/?period=7d`} target="_blank" rel="noopener noreferrer">
										<img
											src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
											alt={`${item.slug}-7d-graph`}
											className={
												item.quote['USD'].percent_change_7d >= 0
													? 'sparkline up'
													: 'sparkline down'
											}
										/>
									</Link>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</StyledTable>
		</TableContainer>
	);
};

export default memo(CategoryTable);
