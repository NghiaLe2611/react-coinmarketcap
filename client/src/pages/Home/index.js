import { Grid } from '@mui/material';
import CoinList from './CoinList';
import News from './News';
import Widget from './Widget';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const HomePage = () => {
	return (
		<>
			<News />
			<Grid container spacing={2} marginBottom={5}>
				<Grid item lg={4}>
					<Widget
						type='trending'
						title='Trending'
						icon={<LocalFireDepartmentIcon color="warning" />}
						source='http://coinmarketcap.com/'
					/>
				</Grid>
				<Grid item lg={4}>
					<Widget type='gainers' title='Top gainers' icon={<TrendingUpIcon color="success" />} source='http://crypto.com/' />
				</Grid>
				<Grid item lg={4}>
					<Widget type='losers' title='Top losers' icon={<TrendingDownIcon color="error" />} source='http://crypto.com/' />
				</Grid>
			</Grid>
			<CoinList />
		</>
	);
};

export default HomePage;
