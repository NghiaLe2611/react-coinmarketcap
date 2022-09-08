import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { formatNumber, formatPercent } from 'utils/helpers';
import CoinChange from 'components/common/CoinChange';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	title: {
		color: 'var(--color-sub-txt)',
		fontSize: 13,
	},
	value: {
		color: 'var(--color-common-txt)',
		fontSize: 15,
	},
}));

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	backgroundColor: 'var(--bg-box)',
	padding: theme.spacing(2),
	borderRadius: '8px',
}));

const DataBox = ({ title, value, changed, graph }) => {
	const classes = useStyles();

	return (
		<StyledBox>
			<Box maxWidth='50%' marginRight={4}>
				<Typography className={classes.title}>{title}</Typography>
				<Typography className={classes.value} sx={{ fontWeight: 700 }}>
					${formatNumber(value)}
				</Typography>
				<CoinChange value={changed} format={formatPercent} style={{fontSize: 12}} />
			</Box>
			<Box flex='1'>
				<img src={graph} alt={`${title}-graph`} width="100%" className={changed >= 0 ? 'sparkline up' : 'sparkline down'} />
			</Box>
		</StyledBox>
	);
};

export default memo(DataBox);
