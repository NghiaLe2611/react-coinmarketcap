import { memo } from 'react';
import { Box, Link } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import { Heading, IntroText } from 'components/common';
import CategoriesTable from './CategoriesTable';

const getListCategory = async () => {
	const data = await coinApi.getCategories();
	return data.data;
};

const useCategoriesQuery = () => {
	const response = useQuery(['list-category'], getListCategory, {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
		cacheTime: Infinity,
		refetchInterval: 10 * 60 * 1000,
	});

	// Sort by market cap
	const transformedData = response.data?.data.sort((a, b) => {
		return b.market_cap - a.market_cap;
	});

	return {
		data: transformedData,
	};
};

const CategoriesPage = () => {
	// const {data, isLoading} = useCategoriesQuery();
	const { data, isLoading, error } = useQuery(
		['list-category'],
		getListCategory,
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000,
			cacheTime: Infinity,
			refetchInterval: 10 * 60 * 1000,
			select: (res) => {
				// Sort by market cap
				const transformedData = res.data.sort((a, b) => {
					return b.market_cap - a.market_cap;
				});

				return transformedData;
			},
		},
		{
			onSuccess: (res) => {
				console.log('onSuccess', res);
			},
		}
	);

	if (isLoading) {
		return <Box py={10}>Loading...</Box>;
	}

	if (error) {
		return <Box py={10}>{error.message}</Box>;
	}

	return (
		<>
			<Heading>Cryptocurrency Sectors by 24h Price Change</Heading>
			<IntroText>
				We have created an index for each cryptocurrency category. Categories are ranked by 24h price change.
				Click on a crypto category name to see the constituent parts of the index and their recent price
				performance.
			</IntroText>
			<CategoriesTable data={data} />
			<Box py={4} textAlign='right' fontSize={13}>
				(Source: &nbsp;
				<Link href='https://coinmarketcap.com/' target='_blank' sx={{ color: 'var(--color-primary)' }}>
					coinmarketcap
				</Link>
				)
			</Box>
		</>
	);
};

export default memo(CategoriesPage);
