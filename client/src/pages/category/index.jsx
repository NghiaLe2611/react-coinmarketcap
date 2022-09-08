import { useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormControl, FormLabel, Grid, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import CategoryList from 'components/CategoryList';
import { Heading, IntroText, StyledSelect, WrapFilterBox } from 'components/common';
import CategoryTable from './CategoryTable';
import DataBox from './DataBox';
import { categories } from 'data/data';
import CustomPagination from 'components/pagination/CustomPagination';
import Loader from 'components/Loader';

const StyledOption = styled(MenuItem)({
	fontSize: 12,
});

const getCategory = async ({ categoryId }) => {
	const data = await coinApi.getCoinsByCategory(categoryId);
	return data.data;
};

const CategoryPage = () => {
	const { slug } = useParams();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(100);
	const categoryId = categories.find((item) => item.slug === slug).id;

	const { data, isLoading, isFetching, error } = useQuery(
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

	const handleChangeLimit = (e) => {
		setLimit(e.target.value);
	};

	const handleChangePage = (e, newPage) => {
		setPage((prev) => newPage);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const { id, name, market_cap, market_cap_change, volume, volume_change, coins } = data.data;

	// Pagination on FE
	const begin = (page - 1) * limit;
	const end = begin + limit;
	const result = coins.slice(begin, end);
	const count = Math.ceil(coins.length / limit);

	return (
		<>
			<Loader open={isFetching} />
			<Grid container spacing={2}>
				<Grid item md={5}>
					<Heading>Top {name} Tokens by Market Capitalization</Heading>
					<IntroText>
						Listed below are the top crypto coins and tokens used for {name}. They are listed in size by
						market capitalization. To reorder the list, simply click on one of the options - such as 24h or
						7d - to see the sector from a different perspective.
					</IntroText>
				</Grid>
				<Grid item container md={7} spacing={2}>
					<Grid item sm={6}>
						<DataBox
							title='Market Cap'
							value={market_cap}
							changed={market_cap_change}
							graph={`https://s3.coinmarketcap.com/generated/sparklines/sector/marketcap/web/7d/${id}.svg`}
						/>
					</Grid>
					<Grid item sm={6}>
						<DataBox
							title='Trading Volume'
							value={volume}
							changed={volume_change}
							graph={`https://s3.coinmarketcap.com/generated/sparklines/sector/volume/web/7d/${id}.svg`}
						/>
					</Grid>
				</Grid>
			</Grid>
			<WrapFilterBox>
				<CategoryList />
				<Box display='flex' alignItems='center' marginLeft='auto'>
					<FormControl sx={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
						<FormLabel sx={{ fontSize: 13, color: 'var(--color-common-txt)', mr: 1 }}>Show rows</FormLabel>
						<StyledSelect
							select
							size='small'
							sx={{ minWidth: 60, mr: 2 }}
							name='limit'
							value={limit}
							onChange={handleChangeLimit}>
							<StyledOption key='100' value={100}>
								100
							</StyledOption>
							<StyledOption key='50' value={50}>
								50
							</StyledOption>
							<StyledOption key='20' value={20}>
								20
							</StyledOption>
						</StyledSelect>
					</FormControl>
				</Box>
				{coins.length > limit && <CustomPagination count={count} page={page} onPageChange={handleChangePage} />}
			</WrapFilterBox>
			<CategoryTable data={result} />
			{coins.length > limit && <CustomPagination count={count} page={page} onPageChange={handleChangePage} />}
		</>
	);
};

export default memo(CategoryPage);

/*
DeFi: 5fb62883c9ddcc213ed13308
NFTs & Collectibles : 60291fa0db1be76c46298e83
Metaverse: 6053dfb66be1bf5c15e865ee
Smart Contracts: 604f2752ebccdd50cd175fc0
BNB Chain Ecosystem: 60308028d2088f200c58a005
Web3: 61693ae410dbb97a52fb2ed0
*/
