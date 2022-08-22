import { List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CoinWrapper from '../CoinList/CoinWrapper';
import { formatNumber, getColorPrice } from 'utils/helpers';
import Link from '@mui/material/Link';

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
								<Span>{index + 1}</Span>
								<Span>{item.name}</Span>
							</StyledItem>
						))}
				</List>
			) : (
				<>
					<List>
						{data.length > 0 &&
							data.map((item, index) => (
								<StyledItem key={item.name}>
									<Span sx={{ mr: 2, color: '#808a9d' }}>{index + 1}</Span>
									{/* <Span>{item.name}</Span> */}
									<CoinWrapper item={item} size='small' />
									{item.usd_price_change_24h && (
										<Span sx={{ ml: 'auto', color: getColorPrice(item.usd_price_change_24h) }}>
											{formatNumber((item.usd_price_change_24h * 100).toFixed(2))}%
										</Span>
									)}
								</StyledItem>
							))}
					</List>
					<Typography sx={{ textAlign: 'right', fontSize: 11 }}>
						(Source: <Link href={source} target='_blank' rel='noopener noreferrer'>{source}</Link>)
					</Typography>
				</>
			)}
		</>
	);
};

export default ListItemWidget;
