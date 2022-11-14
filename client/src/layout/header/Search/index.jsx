import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, List, ListItem, Popover, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { _generalStats } from '../../../features/general/generalSlice';
import classes, { SearchBox, SearchIconWrapper, SearchInput, SearchInputWrapper, StyledInputBase } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Search = () => {
	const location = useLocation();
	const [showSearchBox, setShowSearchBox] = useState(null);
    const {trendingSearches, recentSearches} = useSelector(_generalStats);

	const searchRef = useRef("");

	useEffect(() => {
		return () => {
			setShowSearchBox(null);
		}
	}, [location]);

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
					<SearchIconWrapper sx={{padding: '0 5px'}}>
						<SearchIcon fontSize='small' />
					</SearchIconWrapper>
					<SearchInput placeholder='What are you looking for ?' inputProps={{'aria-label': 'search'}} inputRef={searchRef} />
					<IconButton sx={classes.clearSearch} size='small' onClick={clearInput}>
						<CloseIcon sx={{fontSize: '12px'}}></CloseIcon>
					</IconButton>
				</SearchInputWrapper>
				<Box sx={{padding: '10px 20px 20px 20px'}}>
					<Box>
						<Typography sx={classes.searchLbl}>
							Trending <LocalFireDepartmentIcon />
						</Typography>
						<List sx={classes.listTrending}>
                            {
                                trendingSearches.length > 0 && (
                                    trendingSearches.map(item => (
                                        <ListItem key={item.id}>
                                            <Typography component={Link} to={`/currencies/${item.slug}`} sx={classes.itemTrending}>
                                                <Box sx={classes.wrapName}>
                                                    <img width='20' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`} alt={item.name} />
                                                    <Typography className='name'>{item.name}</Typography>
                                                    <Typography sx={classes.txt}>{item.symbol}</Typography>
                                                </Box>
                                                <Typography sx={{...classes.txt, marginLeft: 'auto'}}>#{item.rank}</Typography>
                                            </Typography>      
                                        </ListItem>
                                    ))
                                )
                            }
						</List>
					</Box>
                    {
                        recentSearches.length > 0 && (
                            <Box>
                                <Typography sx={classes.searchLbl}>Recent searches</Typography>
                            </Box>
                        )
                    }
				</Box>
			</Popover>
		</>
	);
};

export default Search;
