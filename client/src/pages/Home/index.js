import { Grid } from '@mui/material';
import News from './components/News';
import Widget from './components/Widget';

const HomePage = () => {
	return (
		<>
			<News />
            <Grid container spacing={2}>
                <Grid item lg={4}><Widget/></Grid>
                <Grid item lg={4}><Widget/></Grid>
                <Grid item lg={4}><Widget/></Grid>
            </Grid>
		</>
	);
};

export default HomePage;
