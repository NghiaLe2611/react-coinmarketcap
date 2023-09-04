import { memo } from 'react';
import CoinList from './CoinList';
import ListWidget from './ListWidget';
import News from './News';

const HomePage = () => {
	console.log('home');
	return (
		<>
			<News />
			<ListWidget />
			<CoinList />
		</>
	);
};

export default memo(HomePage);
