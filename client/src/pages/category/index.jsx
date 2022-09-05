import { Grid } from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import axios from 'axios';
import { Heading, IntroText } from 'components/common';
import { coingeckoData, categories } from 'data/data';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import CategoryTable from './CategoryTable';
import DataBox from './DataBox';

const getCategory = async ({categoryId}) => {
	const data = await coinApi.getCoinsByCategory(categoryId);
	return data.data;
};

const CategoryPage = () => {
	const {slug} = useParams();
    const categoryId = categories.find(item => item.slug === slug).id;

	const { data, isLoading, error } = useQuery(
		[`list-coin-by-category-${categoryId}`, categoryId],
		() => getCategory({ categoryId }),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000,
			cacheTime: Infinity,
			refetchInterval: 10 * 60 * 1000,
		},
		{
			onSuccess: (res) => {
				console.log('onSuccess', res);
			},
		}
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const { title, market_cap, market_cap_change, volume, volume_change, coins } = data.data;

	return (
		<>
			<Grid container spacing={2}>
				<Grid item md={6}>
					<Heading>Top {data.data.title} Tokens by Market Capitalization</Heading>
					<IntroText>
						Listed below are the top crypto coins and tokens used for {data.data.title}. They are listed in
						size by market capitalization. To reorder the list, simply click on one of the options - such as
						24h or 7d - to see the sector from a different perspective.
					</IntroText>
				</Grid>
				<Grid item md={6}>
					<DataBox title='Market Cap' value={market_cap} changed={market_cap_change} graph="https://s3.coinmarketcap.com/generated/sparklines/sector/marketcap/web/7d/605e2cc16507f27280c38980.svg" />
					<DataBox title='Trading Volume' value={volume} changed={volume_change} graph="" />
				</Grid>
			</Grid>
			<CategoryTable data={coins} />
		</>
	);
};

export default CategoryPage;


/*
DeFi: 5fb62883c9ddcc213ed13308
NFTs & Collectibles : 60291fa0db1be76c46298e83
Metaverse: 6053dfb66be1bf5c15e865ee
Smart Contracts: 604f2752ebccdd50cd175fc0
BNB Chain Ecosystem: 60308028d2088f200c58a005
Web3: 61693ae410dbb97a52fb2ed0
*/