import { memo } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'inline-flex', 
		alignItems: 'center',
		color: '#fff',
		borderRadius: 8,
		fontSize: 13,
		padding: '4px 6px 4px 0',
		lineHeight: 1
	},
}));

function getColorByPrice(val) {
	if (val > 0) return 'var(--color-price-up)';
	if (val < 0) return 'var(--color-price-down)';
}

const CoinChange = ({ value, format, style, hasBg }) => {
	const classes = useStyles();

	return hasBg ? (
		<span style={{ backgroundColor: getColorByPrice(value), ...style}} className={classes.wrapper}>
			{value > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
			{format(value)}%
		</span>
	) : (
		<span style={{ display: 'inline-flex', alignItems: 'center', color: getColorByPrice(value), ...style }}>
			{value > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
			{format(value)}%
		</span>
	);
};

export default memo(CoinChange);
