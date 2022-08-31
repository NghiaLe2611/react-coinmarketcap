import { memo } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function getColorByPrice (val) {
    if (val > 0) return 'var(--color-price-up)';
    if (val < 0) return 'var(--color-price-down)';
};

const CoinChange = ({ value, format, style }) => {
	return (
		<span style={{ display: 'inline-flex', alignItems: 'center', color: getColorByPrice(value), ...style }}>
			{value > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
			{format(value)}%
		</span>
	);
};

export default memo(CoinChange);
