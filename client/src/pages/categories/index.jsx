
import { Box, Link } from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import coinApi from 'api/coinApi';
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
		refetchInterval: 10 * 60 * 1000
	});

    // Sort by market cap
    const transformedData = response.data?.data.sort((a, b) => {
        return b.market_cap - a.market_cap;
    });

	return {
		data: transformedData
	};
};

const CategoriesPage = () => {
    // const {data, isLoading} = useCategoriesQuery();
    const {data, isLoading, error} = useQuery(
		['list-category'], getListCategory,
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
			}
		},
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

    return (
		<>
			<CategoriesTable data={data} />
			<Box py={4} textAlign='right' fontSize={13}>
				(Source: &nbsp;
				<Link href='https://coinmarketcap.com/' target="_blank" sx={{color: 'var(--color-primary)'}}>
					coinmarketcap
				</Link>
				)
			</Box>
		</>
	);
};

export default CategoriesPage;