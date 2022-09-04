import {Box, Grid, Typography} from '@mui/material';
import Widget from './Widget';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {CustomSwitch} from 'components/CustomSwitch';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {styled} from '@mui/material/styles';
import {formatNumberByChar, formatPercent} from 'utils/helpers';
import CoinChange from 'components/common/CoinChange';

const IntroText = styled(Typography)(({theme}) => ({
	display: 'flex',
    alignItems: 'center',
	fontSize: '0.9rem',
	fontWeight: 500,
	color: 'var(--color-sub-txt)',
	marginBottom: 30,
}));

const ListWidget = () => {
	const [showHighlights, setShowHighlights] = useState(true);
	const stats = useSelector((state) => state.generalCoinStats.generalStats);

	const globalStats =
		stats.marketCapChange > 0 ? (
			<IntroText>
				The global crypto market cap is ${formatNumberByChar(stats.marketCap)}, a{' '}
				<CoinChange style={{fontSize: '0.9rem', marginRight: '4px'}} value={stats.marketCapChange} format={formatPercent} /> increase over the last day.
			</IntroText>
		) : (
			<IntroText>
				The global crypto market cap is ${formatNumberByChar(stats.marketCap)}, a{' '}
				<CoinChange style={{fontSize: '0.9rem', marginRight: '4px'}} value={stats.marketCapChange} format={formatPercent} /> decrease over the last day.
			</IntroText>
		);

	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between' marginBottom={1}>
				<Typography variant='h2' sx={{fontSize: '1.5rem', fontWeight: 700}}>
					Today's Cryptocurrency Prices by Market Cap
				</Typography>
				<Box display='flex' alignItems='center'>
					<Typography sx={{fontSize: 14, color: 'var(--color-sub-txt)', mr: 2}}>Highlights</Typography>
					<CustomSwitch checked={showHighlights} onChange={() => setShowHighlights((val) => !val)} />
				</Box>
			</Box>
			{globalStats}
			{showHighlights ? (
				<Grid container spacing={2} marginBottom={5}>
					<Grid item lg={4}>
						<Widget type='trending' title='Trending' icon={<LocalFireDepartmentIcon color='warning' />} source='http://coinmarketcap.com/' />
					</Grid>
					<Grid item lg={4}>
                        {/* http://crypto.com/ */}
						<Widget type='gainers' title='Top gainers' icon={<TrendingUpIcon color='success' />} source='https://coincheckup.com/' />
					</Grid>
					<Grid item lg={4}>
						<Widget type='losers' title='Top losers' icon={<TrendingDownIcon color='error' />} source='https://coincheckup.com/' />
					</Grid>
				</Grid>
			) : null}
		</>
	);
};

export default ListWidget;
