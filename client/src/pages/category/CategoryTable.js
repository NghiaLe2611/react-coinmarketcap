import {memo} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {styled} from '@mui/material/styles';
import CoinChange from 'components/common/CoinChange';
import CoinWrapper from 'components/common/CoinWrapper';
import SortTableHead from 'components/table/SortTableHead';
import {formatNumber, formatPercent, formatPrice} from 'utils/helpers';
import SparkLine from 'components/common/SparkLine';
import {useSortableData} from 'hooks/useSortableData';

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
		id: 'price',
		label: 'Price',
		align: 'right',
	},
	{
		id: 'price_change_percentage_1h_in_currency',
		label: '1h%',
		align: 'center',
	},
	{
		id: 'price_change_percentage_24h_in_currency',
		label: '24h%',
		align: 'center',
	},
	{
		id: 'price_change_percentage_7d_in_currency',
		label: '7d%',
		align: 'center',
	},
	{
		id: 'marketCap',
		label: 'Market Cap',
		align: 'right',
	},
	{
		id: '24hVolume',
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

const StyledTable = styled(Table)(({theme}) => ({
	backgroundColor: 'transparent',
	'& .MuiTableCell-root': {
		fontSize: 13,
		fontWeight: 500,
		'&.MuiTableCell-head': {
			fontWeight: 700,
		},
	},
}));

const CategoryTable = ({data}) => {
	const {items, requestSort, sortConfig} = useSortableData(data);

	return (
		<TableContainer>
			<StyledTable>
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
							<TableRow key={item.uuid} sx={{'& .MuiTableCell-body': {padding: '10px'}}}>
								<TableCell align='center'></TableCell>
								<TableCell align='left'>{item.rank}</TableCell>
								<TableCell align='left'>
                                    <img src={item.iconUrl} alt={item.name} width={25} />
                                    {item.name} {item.symbol}
									{/* <CoinWrapper item={item} /> */}
								</TableCell>
								<TableCell align='right'>{formatPrice(item.price)}</TableCell>
								<TableCell align='center'>
									{/* <CoinChange value={item.price_change_percentage_1h_in_currency} format={formatPercent} /> */}
								</TableCell>
								<TableCell align='center'>
									{/* <CoinChange value={item.price_change_percentage_24h_in_currency} format={formatPercent} /> */}
								</TableCell>
								<TableCell align='center'>
									{/* <CoinChange value={item.price_change_percentage_7d_in_currency} format={formatPercent} /> */}
								</TableCell>
								<TableCell align='right'>{formatNumber(item.marketCap)}</TableCell>
								<TableCell align='right'>{formatNumber(item['24hVolume'])}</TableCell>
								<TableCell align='right'>
                                    
                                </TableCell>
								<TableCell align='right'>
									<SparkLine data={item.sparkline} color={item.change >= 0 ? '#16c784' : '#ea3943'} />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</StyledTable>
		</TableContainer>
	);
};

export default memo(CategoryTable);
