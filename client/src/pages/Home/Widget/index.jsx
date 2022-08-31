import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ListItemWidget from './ListItem';
import { API_COIN_GAINER_URL, API_COIN_LOSER_URL } from 'utils/constants';
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
		const gainers = localStorage.getItem('top_gainers') ? JSON.parse(localStorage.getItem('top_gainers')) : [];
		const losers = localStorage.getItem('top_losers') ? JSON.parse(localStorage.getItem('top_losers')) : [];
		
		async function fetchGainers() {
			const res = await axios.get(API_COIN_GAINER_URL);
			setData(res.data);
			localStorage.setItem('top_gainers', JSON.stringify(res.data));
		}

		async function fetchLosers() {
			const res = await axios.get(API_COIN_LOSER_URL);
			setData(res.data);
			localStorage.setItem('top_losers', JSON.stringify(res.data));
		}

		if (type === 'trending') {
			setData(trendingSearches.slice(0, 3));
		}

		if (type === 'gainers') {
			if (!gainers.length) {
				fetchGainers();
			} else {
				setData(gainers);
			}
		}

		if (type === 'losers') {
			if (!gainers.length) {
				fetchLosers();
			} else {
				setData(losers);
			}
		}
	}, [type, trendingSearches]);

	return (
		<StyledBox>
			<ListItemWidget type={type} title={title} data={data} source={source} icon={icon} />
		</StyledBox>
	);
};

export default Widget;
