import { Box, IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import { useState } from "react";

import classes, { SearchBox, SearchIconWrapper, SearchInput, SearchInputWrapper, StyledInputBase } from './styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Link } from "react-router-dom";

const Search = () => {
    const [showSearchBox, setShowSearchBox] = useState(null);
    const handleShowSearchBox = (e) => {
        setShowSearchBox(e.currentTarget);
    };

    const handleCloseSearchBox = () => {
        setShowSearchBox(null);
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
					<SearchInput placeholder='What are you looking for ?' inputProps={{'aria-label': 'search'}} />
					<IconButton sx={classes.clearSearch} size='small'>
						<CloseIcon sx={{fontSize: '12px'}}></CloseIcon>
					</IconButton>
				</SearchInputWrapper>
				<Box sx={{padding: '10px 20px 20px 20px'}}>
					<Box>
						<Typography sx={classes.searchLbl}>
							Trending <LocalFireDepartmentIcon />
						</Typography>
						<List sx={classes.listTrending}>
							<ListItem>
								<Typography component={Link} to='/btc'>
									Bitcoin
								</Typography>
							</ListItem>
							<ListItem>
								<Typography component={Link} to='/eth'>
									Ethereum
								</Typography>
							</ListItem>
						</List>
					</Box>
					<Box>
						<Typography sx={classes.searchLbl}>Recent searches</Typography>
					</Box>
				</Box>
			</Popover>
		</>
	);
};

export default Search;
