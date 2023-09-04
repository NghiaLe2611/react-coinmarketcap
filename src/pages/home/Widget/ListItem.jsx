import { List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CoinWrapper from '../../../components/common/CoinWrapper';
import { formatNumber, formatPercent, getColorPrice } from 'utils/helpers';
import Link from '@mui/material/Link';
import CoinChange from 'components/common/CoinChange';

const StyledItem = styled(ListItem)(({ theme }) => ({
	display: 'flex',
    padding: theme.spacing(1,0),
}));

const Span = styled(Typography)(() => ({
	fontSize: 13
}));

const ListItemWidget = ({ type, title, data, icon, source }) => {
	return (
		<>
			<Typography variant='h4' sx={{ display: 'flex', alignItems: 'center', fontSize: 16, fontWeight: 'bold' }}>
				{icon} <span style={{ marginLeft: '5px' }}>{title}</span>
			</Typography>
			{type === 'trending' ? (
				<List>
					{data.length > 0 &&
						data.map((item, index) => (
							<StyledItem key={item.name}>
								<Span sx={{ mr: 2, color: '#808a9d' }}>{index + 1}</Span>
								<CoinWrapper item={item} size='small' />
								<CoinChange
									style={{ marginLeft: 'auto', fontSize: 13 }}
									value={item.priceChange.priceChange24h}
									format={formatPercent}
								/>
							</StyledItem>
						))}
				</List>
			) : (
				<List>
					{data.length > 0 &&
						data.map((item, index) => (
							<StyledItem key={item.name}>
								<Span sx={{ mr: 2, color: '#808a9d' }}>{index + 1}</Span>
								<CoinWrapper item={item} size='small' />
                                {/*  item.usd_price_change_24h * 100 */}
								{item.price_change_1D_percent && (
									<CoinChange
										style={{ marginLeft: 'auto', fontSize: 13 }}
										value={item.price_change_1D_percent}
										format={formatNumber}
									/>
								)}
							</StyledItem>
						))}
				</List>
			)}
			<Typography sx={{ textAlign: 'right', fontSize: 11 }}>
				(Source:{' '}
				<Link href={source} target='_blank' rel='noopener noreferrer' sx={{ color: 'var(--color-primary)' }}>
					{source}
				</Link>
				)
			</Typography>
		</>
	);
};

export default ListItemWidget;
