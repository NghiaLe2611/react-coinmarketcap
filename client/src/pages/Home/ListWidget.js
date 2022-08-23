import { Box, Grid, Typography } from '@mui/material';
import Widget from './Widget';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { CustomSwitch } from 'components/CustomSwitch';
import { useState } from 'react';

const ListWidget = () => {
	const [showHighlights, setShowHighlights] = useState(true);

	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between' marginBottom={5}>
				<Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
					Today's Cryptocurrency Prices by Market Cap
				</Typography>
				<Box display='flex' alignItems='center'>
					<Typography sx={{ fontSize: 13, color: 'var(--color-sub-txt)', mr: 2 }}>Highlights</Typography>
					<CustomSwitch checked={showHighlights} onChange={() => setShowHighlights((val) => !val)} />
				</Box>
			</Box>
			{showHighlights ? (
				<Grid container spacing={2} marginBottom={5}>
					<Grid item lg={4}>
						<Widget
							type='trending'
							title='Trending'
							icon={<LocalFireDepartmentIcon color='warning' />}
							source='http://coinmarketcap.com/'
						/>
					</Grid>
					<Grid item lg={4}>
						<Widget
							type='gainers'
							title='Top gainers'
							icon={<TrendingUpIcon color='success' />}
							source='http://crypto.com/'
						/>
					</Grid>
					<Grid item lg={4}>
						<Widget
							type='losers'
							title='Top losers'
							icon={<TrendingDownIcon color='error' />}
							source='http://crypto.com/'
						/>
					</Grid>
				</Grid>
			) : null}
		</>
	);
};

export default ListWidget;
