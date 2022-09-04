import {useQuery} from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import { categories } from 'data/data';
import {useParams} from 'react-router-dom';
import CategoryTable from './CategoryTable';

const getCoinListByCategory = async ({tag}) => {
	const data = await coinApi.getCoinsByTag(tag);
	return data.data;
};

const CategoryPage = () => {
	const {slug} = useParams();
    const categoryId = categories.find(item => item.slug === slug).id;
    console.log(categoryId);

	// const {data, isLoading, error} = useQuery(
	// 	['list-coin-by-cate', tag],
	// 	() => getCoinListByCategory({tag}),
	// 	{
	// 		keepPreviousData: true,
	// 		refetchOnWindowFocus: false,
	// 		staleTime: 5 * 60 * 1000,
	// 		cacheTime: Infinity,
    //      refetchInterval: 10 * 60 * 1000
	// 	},
	// 	{
	// 		onSuccess: (res) => {
	// 			console.log('onSuccess', res);
	// 		},
	// 	},
	// );

	// console.log(data);

	// if (isLoading) {
	// 	return <p>Loading...</p>;
	// }

    return <div>{slug}</div>
	// return <CategoryTable data={data.data.coins} />;
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