import { memo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import SortTableHead from 'components/table/SortTableHead';
import { useSortableData } from 'hooks/useSortableData';
import CoinChange from 'components/common/CoinChange';
import { formatNumber, formatPercent } from 'utils/helpers';
import moment from 'moment';
import { Link } from 'react-router-dom';

function formatCategoryName(category) {
    return category.replace(/\s+/g, '-').toLowerCase();
};

const headCells = [
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
		id: 'avg_price_change',
		label: 'Avg. Price Change',
		align: 'right',
	},
	{
		id: 'market_cap',
		label: 'Market Cap',
		align: 'right',
	},
	{
		id: 'volume',
		label: 'Volume',
		align: 'right',
	},
	{
		id: 'num_tokens',
		label: 'Number of tokens',
		align: 'center',
	},
    {
		id: 'last_updated',
		label: 'Last Updated',
		align: 'center',
	}
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

const CategoriesTable = ({data}) => {
	const {items, requestSort, sortConfig} = useSortableData(data);
	return (
		<TableContainer>
			<StyledTable>
				<TableHead>
					<TableRow>
						{headCells.map((item) => (
							<SortTableHead key={item.id} name={item.id} label={item.label} align={item.align} requestSort={requestSort} sortConfig={sortConfig} style={{width: item.width}} />
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{items &&
						items.map((item, index) => (
							<TableRow key={item.id} sx={{'& .MuiTableCell-body': {padding: '10px'}}}>
								<TableCell align='left'>{index + 1}</TableCell>
								<TableCell align='left'>
                                    <Link to={`/category/${formatCategoryName(item.name)}`} style={{color: 'var(--color-common-txt)'}}>{item.name}</Link>
                                </TableCell>
								<TableCell align='right'>
									<CoinChange value={item.avg_price_change} format={formatPercent} />
								</TableCell>
								<TableCell align='right'>${formatNumber(item.market_cap)}</TableCell>
								<TableCell align='right'>{formatNumber(item.volume)}</TableCell>
								<TableCell align='center'>{item.num_tokens}</TableCell>
                                <TableCell align='center'>{moment(new Date(item.last_updated)).format('DD-MM-YYYY HH:ss')}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</StyledTable>
		</TableContainer>
	);
};

export default memo(CategoriesTable);
