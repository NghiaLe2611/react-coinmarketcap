import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, List, ListItem, Popover, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { _generalStats } from '../../../features/general/generalSlice';
import classes, { SearchBox, SearchIconWrapper, SearchInput, SearchInputWrapper, StyledInputBase } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import useDebounce from 'hooks/useDebounce';
import coinApi from 'api/coinApi';

const Search = () => {
	const location = useLocation();
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [showSearchBox, setShowSearchBox] = useState(null);
    const {trendingSearches, recentSearches} = useSelector(_generalStats);

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const searchRef = useRef("");

	// Reset state when navigate
	useEffect(() => {
		return () => {
			setShowSearchBox(null);
			setSearchTerm('');
		};
	}, [location]);

	// Search filter
	useEffect(() => {
		const searchHandler = async () => {
			try {
				const res = await coinApi.searchByQuery(debouncedSearchTerm);
				setSearchResult(res.data.slice(0, 5));
			} catch(err) {
				console.log(err);
			}
		}

		searchHandler();
	}, [debouncedSearchTerm]);

	const handleShowSearchBox = (e) => {
		setShowSearchBox(e.currentTarget);
	};

	const handleCloseSearchBox = () => {
		setShowSearchBox(null);
	};

	const clearInput = () => {
		if (searchRef.current) {
			searchRef.current.value = "";
		}
	};

	const onChangeInput = (e) => {
		console.log(e.target.value);
		setSearchTerm(e.target.value);
	};

	return (
		<>
			<SearchBox onClick={handleShowSearchBox}>
				<SearchIconWrapper>
					<SearchIcon fontSize='small' />
				</SearchIconWrapper>
				{/* <StyledInputBase placeholder='Search…' inputProps={{'aria-label': 'search'}} /> */}
				<StyledInputBase>Search</StyledInputBase>
			</SearchBox>
			<Popover
				sx={classes.popover}
				// id={id}
				open={Boolean(showSearchBox)}
				anchorEl={showSearchBox}
				onClose={handleCloseSearchBox}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				PaperProps={{
					style: {
						width: '400px',
						boxShadow: '0px 1px 2px rgba(128,138,157,0.12),0px 8px 32px rgba(128,138,157,0.24)',
					},
				}}>
				<SearchInputWrapper>
					<SearchIconWrapper sx={{ padding: '0 5px' }}>
						<SearchIcon fontSize='small' />
					</SearchIconWrapper>
					<SearchInput
						autoFocus
						placeholder='What are you looking for ?'
						inputProps={{ 'aria-label': 'search' }}
						inputRef={searchRef}
						onChange={onChangeInput}
					/>
					<IconButton sx={classes.clearSearch} size='small' onClick={clearInput}>
						<CloseIcon sx={{ fontSize: '12px' }}></CloseIcon>
					</IconButton>
				</SearchInputWrapper>
				<Box sx={{ padding: '10px 20px 20px 20px' }}>
					{debouncedSearchTerm ? (
						<Box>
							<List sx={classes.listTrending}>
								{searchResult.length ? searchResult.map((item) => (
									<ListItem key={item.id}>
										<Typography
											component={Link}
											to={`/currencies/${item.name.toLowerCase()}`}
											sx={classes.itemTrending}>
											<Box sx={classes.wrapName}>
												<img
													width='20'
													src={item.thumb}
													alt={item.name}
												/>
												<Typography className='name'>{item.name}</Typography>
												<Typography sx={classes.txt}>{item.symbol}</Typography>
											</Box>
											<Typography sx={{ ...classes.txt, marginLeft: 'auto' }}>
												#{item.market_cap_rank}
											</Typography>
										</Typography>
									</ListItem>
								)) : <ListItem>No results for '{debouncedSearchTerm}'</ListItem>}
							</List>
						</Box>
					) : (
						<Box>
							<Box>
								<Typography sx={classes.searchLbl}>
									Trending <LocalFireDepartmentIcon />
								</Typography>
								<List sx={classes.listTrending}>
									{trendingSearches.length > 0 &&
										trendingSearches.map((item) => (
											<ListItem key={item.id}>
												<Typography
													component={Link}
													to={`/currencies/${item.slug}`}
													sx={classes.itemTrending}>
													<Box sx={classes.wrapName}>
														<img
															width='20'
															src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`}
															alt={item.name}
														/>
														<Typography className='name'>{item.name}</Typography>
														<Typography sx={classes.txt}>{item.symbol}</Typography>
													</Box>
													<Typography sx={{ ...classes.txt, marginLeft: 'auto' }}>
														#{item.rank}
													</Typography>
												</Typography>
											</ListItem>
										))}
								</List>
							</Box>
							{recentSearches.length > 0 && (
								<Box>
									<Typography sx={classes.searchLbl}>Recent searches</Typography>
								</Box>
							)}
						</Box>
					)}
				</Box>
			</Popover>
		</>
	);
};

export default Search;
