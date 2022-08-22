import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ListItemWidget from './ListItem';

// import classes from './styles';

const StyledBox = styled(Box)(({ theme }) => ({
	boxShadow: 'rgb(88 102 126 / 8%) 0px 4px 24px, rgb(88 102 126 / 12%) 0px 1px 2px',
	borderRadius: '8px',
	backgroundColor: 'var(--bg-box)',
	padding: theme.spacing(2),
}));

const Widget = ({ type, title, icon, source }) => {
	const [data, setData] = useState([]);
	const trendingSearches = useSelector((state) => state.generalCoinStats.generalStats.trendingSearches);

	useEffect(() => {
		async function fetchGainers() {
			const res = await axios.get('https://price-api.crypto.com/price/v1/top-movers?direction=-1&depth=5');
			setData(res.data);
		}

		async function fetchLosers() {
			const res = await axios.get('https://price-api.crypto.com/price/v1/top-movers?direction=1&depth=5');
			setData(res.data);
		}

		if (type === 'trending') {
			setData(trendingSearches);
		}

		if (type === 'gainers') {
			fetchGainers();
		}

		if (type === 'losers') {
			fetchLosers();
		}
	}, [type, trendingSearches]);

	return (
		<StyledBox>
			<ListItemWidget title={title} data={data} source={source} icon={icon} />
		</StyledBox>
	);
};

export default Widget;
