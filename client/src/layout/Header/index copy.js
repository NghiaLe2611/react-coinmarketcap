// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles, withStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { createTheme, Grid, Icon, ListItemText, OutlinedInput } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Drawer from '@mui/material/Drawer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { generalActions, _generalStats } from '../../features/general/generalSlice';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleTheme, _isDarkMode } from '../../features/theme/themeSlice';

const menu = [
    {
        name: 'Cryoptocurrencies',
        url: '/crypto',
        submenu: [
            {
                name: 'Ranking',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/menu/MenuCmcIcon.svg',
                url: '/'
            },
            {
                name: 'Recently Added',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/menu/MenuRecentlyAddedIcon.svg',
                url: 'https://coinmarketcap.com/new/'
            },
            {
                name: 'Categories',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/menu/MenuCategoriesIcon.svg',
                url: 'https://coinmarketcap.com/cryptocurrency-category/'
            }
        ]
    },
    {
        name: 'Exchanges',
        url: 'https://coinmarketcap.com/exchanges'
    },
    {
        name: 'NFT',
        url: 'https://coinmarketcap.com/nft'
    },
    {
        name: 'Gravity',
        url: 'https://coinmarketcap.com/gravity'
    },
    {
        name: 'Portfolio',
        url: '/portfolio-tracker'
    },
    {
        name: 'Watchlist',
        url: '/watchlist'
    },
    {
        name: 'Products',
        submenu: [
            {
                name: 'Free Airdrops',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/menu/MenuAirdropsIcon.svg',
                url: 'https://coinmarketcap.com/airdrop/'
            },
            {
                name: 'Learn & Earn',
                icon: 'https://s2.coinmarketcap.com/static/cloud/img/menu/MenuEarnCryptoIcon.svg',
                url: 'https://coinmarketcap.com/earn/'
            },
        ]
    },
    {
        name: 'Earn'
    }
];

const ListItemTextComponent = styled(ListItemText)({
	fontSize: 13
});

const CustomBtn = styled(Button)(({theme}) => ({
	boxShadow: 'none',
	textTransform: 'none',
    marginRight: 10,
    borderRadius: '6px !important',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    [theme.breakpoints.down('lg')]: {
        display: 'block',
        width: '100%',
        marginBottom: 10
    },
}));

const StyledSelect = styled(Select)(({theme}) => ({
	fontSize: 13,
    '& .MuiInputBase-input:focus': {
        backgroundColor: 'transparent'
    }
}));

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: 8,
	backgroundColor: '#eff2f5',
    color: '#656c7b;',
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
        fontSize: 14,
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		// transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '15ch',
			// '&:focus': {
			// 	width: '20ch',
			// },
		},
	},
}));

const ItemGeneral = styled(Typography)(({theme}) => ({
    fontSize: 11,
    fontWeight: 500,
    color: theme.palette.mode === 'dark' ? '#d1d1d4' : '#58667e',
    '@media (min-width: 1280px)': {
        fontSize: 12,
    },
}));

const LogoImage = styled(RouterLink)(({theme}) => ({
    marginRight: 30,
    lineHeight: 1,
    width: 130,
    height: 30,
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    mask: 'url(images/cmc.svg) no-repeat center',
}));

const Header = () => {
    const dispatch = useDispatch();
	const classes = useStyles();
    
    const isDarkMode = useSelector(_isDarkMode);

	// const [anchorElNav, setAnchorElNav] = useState(false);
    const [pos, setPos] = useState({
        left: false
    });
	// const [anchorElUser, setAnchorElUser] = useState(null);
    const [language, setLanguage] = useState('English');
    const [showSubMenu, setShowSubMenu] = useState(null);
    const generalStats = useSelector(_generalStats);
   
    useEffect(() => {
        // dispatch(generalActions.fetchData());
    }, []);

    const handleChangeLanguage = (e) => {
        setLanguage(e.target.value);
    };

	// const handleOpenNavMenu = (event) => {
	// 	setAnchorElNav(event.currentTarget);
	// };

	// const handleCloseNavMenu = () => {
	// 	setAnchorElNav(null);
	// };

    const toggleDrawer = (anchor, open) => {
        setPos({ ...pos, [anchor]: open });
    };

    const handleShowSubMenu = (subMenuName) => {
        setShowSubMenu(prev => {
            if (prev !== subMenuName) return subMenuName;
            return null;
        });
    };

    // const handleOpenUserMenu = (event) => {
	// 	setAnchorElUser(event.currentTarget);
	// };
	// const handleCloseUserMenu = () => {
	// 	setAnchorElUser(null);
	// };

	return (
		<AppBar position='static' color='transparent' elevation={0} className={classes.header}>
			<Box className={classes.navbar}>
				{/* sx={{maxWidth: '1400px'}} maxWidth={false} */}
				<Container>
					<Box sx={{display: 'flex', alignItems: 'center'}}>
						<List className={classes.listTop}>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<ItemGeneral>Cryptos:&nbsp;</ItemGeneral>}
								/>
								<ListItemTextComponent
									primary={
										<ItemGeneral className={classes.txtBlue}>
											{generalStats.cryptos.toLocaleString()}
										</ItemGeneral>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<ItemGeneral>Exchanges:&nbsp;</ItemGeneral>}
								/>
								<ListItemTextComponent
									primary={
										<ItemGeneral className={classes.txtBlue}>
											{generalStats.exchanges}
										</ItemGeneral>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<ItemGeneral>Market Cap:&nbsp;</ItemGeneral>}
								/>
								<ListItemTextComponent
									primary={
										<ItemGeneral className={classes.txtBlue}>
											${generalStats.marketCap.toLocaleString()}
										</ItemGeneral>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<ItemGeneral>24h Vol:&nbsp;</ItemGeneral>}
								/>
								<ListItemTextComponent
									primary={
										<ItemGeneral className={classes.txtBlue}>
											${generalStats.vol24h.toLocaleString()}
										</ItemGeneral>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<ItemGeneral>Dominance:&nbsp;</ItemGeneral>}
								/>
								<ListItemTextComponent
									primary={
										<ItemGeneral className={classes.txtBlue}>
											BTC: {generalStats.btcDom.toFixed(2)}% &nbsp; ETH: $
											{generalStats.ethDom.toFixed(2)}%
										</ItemGeneral>
									}
								/>
							</ListItem>
						</List>
						<Box sx={{marginLeft: 'auto', alignItems: {lg: 'center'}, display: {xs: 'none', lg: 'flex'}}}>
							<FormControl size='small' variant='standard'>
								<StyledSelect
									disableUnderline
									labelId='select-language-label'
									id='select-language'
									value={language}
									// label='Language'
									onChange={handleChangeLanguage}>
									<MenuItem value='English' sx={{fontSize: 13}}>
										English
									</MenuItem>
									<MenuItem value='Tiếng Việt' sx={{fontSize: 13}}>
										Tiếng Việt
									</MenuItem>
								</StyledSelect>
							</FormControl>
							<Button className={classes.btnMode} onClick={() => dispatch(toggleTheme())}>
								{isDarkMode ? <LightModeIcon fontSize='small' /> : <DarkModeIcon fontSize='small' />}
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
			<Box className={classes.navbar}>
				<Container sx={{maxWidth: '1400px'}} maxWidth={false}>
					<Toolbar disableGutters>
						<Drawer
							PaperProps={{
								sx: {width: '100%', display: {xs: 'flex', lg: 'none'}},
							}}
							anchor={'left'}
							open={pos['left']}
							onClose={() => toggleDrawer('left', false)}>
							<Box className={classes.menuHeading}>
                                <LogoImage to='/'/>
								<IconButton color='inherit' onClick={() => toggleDrawer('left', false)}>
									<CloseIcon></CloseIcon>
								</IconButton>
							</Box>
							<Box sx={{padding: '0 20px', height: 'calc(100% - 60px)', overflow: 'auto'}}>
								<List>
									{menu.map((item) => (
										<ListItem key={item.name} sx={{display: 'block'}} disablePadding>
											<ListItemText
												className={`${classes.menuItem} ${
													showSubMenu === item.name ? classes.itemActive : ''
												}`}>
												{item.url ? (
													!item.url.includes('https') ? (
														<>
															<Link to={item.url} key={item.name}>
																{item.name}
															</Link>
															{item.submenu && (
																<IconButton
																	color='inherit'
																	onClick={() => handleShowSubMenu(item.name)}
																	sx={{marginLeft: 'auto'}}
																	className={classes.iconToggle}>
																	<KeyboardArrowDownIcon
																		style={{
																			transform:
																				showSubMenu === item.name
																					? 'rotate(-180deg)'
																					: null,
																		}}
																	/>
																</IconButton>
															)}
														</>
													) : (
														<>
															<a href={item.url} rel='noreferrer' target='_blank'>
																{item.name}
															</a>
															{item.submenu && (
																<IconButton
																	color='inherit'
																	onClick={() => handleShowSubMenu(item.name)}
																	sx={{marginLeft: 'auto'}}
																	className={classes.iconToggle}>
																	<KeyboardArrowDownIcon
																		style={{
																			transform:
																				showSubMenu === item.name
																					? 'rotate(-180deg)'
																					: null,
																		}}
																	/>
																</IconButton>
															)}
														</>
													)
												) : (
													<>
														<Typography>{item.name}</Typography>
														{item.submenu && (
															<IconButton
																color='inherit'
																onClick={() => handleShowSubMenu(item.name)}
																sx={{marginLeft: 'auto'}}
																className={classes.iconToggle}>
																<KeyboardArrowDownIcon
																	style={{
																		transform:
																			showSubMenu === item.name
																				? 'rotate(-180deg)'
																				: null,
																	}}
																/>
															</IconButton>
														)}
													</>
												)}
											</ListItemText>

											{item.submenu && (
												<Box
													className={classes.subMenuContainer}
													style={{
														maxHeight: showSubMenu === item.name ? '500px' : 0,
														transition:
															showSubMenu === item.name
																? 'max-height 0.4s ease-in'
																: 'max-height 0.36s ease-out',
													}}>
													<List className={classes.subMenuList}>
														{item.submenu.map((subItem) => (
															<ListItem
																key={subItem.name}
																className={classes.subMenuItem}>
																{!subItem.url.includes('https') ? (
																	<Link to={subItem.url} key={subItem.name}>
																		<img
																			src={subItem.icon}
																			alt={subItem.name}
																			width='25'
																		/>
																		{subItem.name}
																	</Link>
																) : (
																	<a
																		href={subItem.url}
																		rel='noreferrer'
																		target='_blank'>
																		<img
																			src={subItem.icon}
																			alt={subItem.name}
																			width='25'
																		/>
																		{subItem.name}
																	</a>
																)}
															</ListItem>
														))}
													</List>
												</Box>
											)}
										</ListItem>
									))}
								</List>
								<Box mt={4}>
									<CustomBtn variant='contained' sx={{backgroundColor: '#eef0f2'}}>Log in</CustomBtn>
									<CustomBtn variant='contained' sx={{color:'#fff', backgroundColor: '#3861fb'}}>Sign up</CustomBtn>
								</Box>
								<Box mt={4}>
									<FormControl size='small' variant='filled'>
										<StyledSelect
											displayEmpty
											disableUnderline
											labelId='select-language-label'
											className={classes.selectLang}
											id='select-language'
											value={language}
											// label='Language'
											onChange={handleChangeLanguage}>
											<MenuItem value='English' sx={{fontSize: 13}}>
												English
											</MenuItem>
											<MenuItem value='Tiếng Việt' sx={{fontSize: 13}}>
												Tiếng Việt
											</MenuItem>
										</StyledSelect>
									</FormControl>
									<Button className={classes.btnMode}>
										<DarkModeIcon />
									</Button>
								</Box>
							</Box>
						</Drawer>
                        <LogoImage to='/'/>
						<Box sx={{flexGrow: 1, display: {xs: 'none', lg: 'flex'}}}>
							<List sx={{display: 'flex'}}>
								{menu.map((item) => (
									<ListItem key={item.name} sx={{display: 'block'}} disablePadding>
										<ListItemText
											onMouseEnter={() => handleShowSubMenu(item.name)}
											className={classes.menuItem}>
											{item.url ? (
												// <Link to={item.url}>{item.name}</Link>
												!item.url.includes('https') ? (
													// <Link to={item.url} key={item.name}>
													// 	{item.name}
													// </Link>
													// <Link component={RouterLink} to={item.url} key={item.name}>
													//     {item.name}
													// </Link>
													<Typography component={RouterLink} to={item.url} key={item.name}>
														{item.name}
													</Typography>
												) : (
													// <a href={item.url} rel='noreferrer' target='_blank'>
													// 	{item.name}
													// </a>
													// <Button component={Typography} href={item.url} rel='noreferrer noopener' target='_blank'>
													// 	{item.name}
													// </Button>
													// <Link to={item.url} key={item.name}>
													// 	{item.name}
													// </Link>
													<Typography
														component={Link}
														target='_blank'
														rel='noreferrer'
														href={item.url}
														key={item.name}>
														{item.name}
													</Typography>
												)
											) : (
												<Typography>{item.name}</Typography>
											)}
										</ListItemText>
									</ListItem>
								))}
							</List>
						</Box>
						<Box sx={{display: {xs: 'none', lg: 'flex'}, flexGrow: 0, marginLeft: 'auto'}}>
							<ButtonGroup aria-label='outlined primary button group'>
                                <CustomBtn variant='text'>Log in</CustomBtn>
                                <CustomBtn variant='contained' sx={{color:'#fff', backgroundColor: '#3861fb'}}>Sign up</CustomBtn>
							</ButtonGroup>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase placeholder='Search…' inputProps={{'aria-label': 'search'}} />
							</Search>
						</Box>
						<Box sx={{display: {xs: 'block', lg: 'none', marginLeft: 'auto'}}}>
							<IconButton color='inherit'>
								<SearchIcon />
							</IconButton>
							<IconButton
								size='large'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={() => toggleDrawer('left', true)}
								color='inherit'>
								<MenuIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</Box>
		</AppBar>
	);
};
export default Header;
