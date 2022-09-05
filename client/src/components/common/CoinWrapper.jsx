import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledText = styled(Typography, {
    shouldForwardProp: (props) => props !== 'size'
})(({ theme, size }) => ({
    fontSize: size === 'small' ? 12 : 14,
	fontWeight: 700,
}));

const CoinWrapper = ({ item, size }) => {
	const link = item.id ? item.id : item.name.replace(/\s+/g, '-').toLowerCase();
	return (
		<Box display='flex' alignItems='center' component={Link} to={`/currencies/${link}`}>
			{item.image ? (
				<img
					style={{ verticalAlign: 'middle', marginRight: '8px', maxWidth: 25 }}
					src={item.image.replace('large', 'thumb')}
					alt={`logo-${item.name}`}
				/>
			) : null}
			<StyledText size={size}>{item.name}</StyledText>
			<StyledText size={size} sx={{ ml: 1, color: '#808a9d' }}>{item.symbol.toUpperCase()}</StyledText>
		</Box>
	);
};

export default memo(CoinWrapper);
