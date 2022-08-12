import { Grid } from '@mui/material';
import CoinList from './CoinList';
import News from './News';
import Widget from './Widget';

const HomePage = () => {
	return (
		<>
			<News />
            <Grid container spacing={2}>
                <Grid item lg={4}><Widget/></Grid>
                <Grid item lg={4}><Widget/></Grid>
                <Grid item lg={4}><Widget/></Grid>
            </Grid>
            <CoinList />
		</>
	);
};

export default HomePage;
