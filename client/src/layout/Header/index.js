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
import { Link } from 'react-router-dom';
import { createTheme, Grid, ListItemText, OutlinedInput } from '@mui/material';
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
import { generalActions } from '../../features/general/generalSlice';

const menu = [
    {
        name: 'Cryoptocurrencies',
        url: '/',
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
        url: 'https://coinmarketcap.com/rankings/exchanges'
    },
    {
        name: 'NFT',
        url: 'https://coinmarketcap.com/rankings/nft'
    },
    {
        name: 'Gravity',
        url: 'https://coinmarketcap.com/rankings/gravity'
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
        name: 'Products'
    },
    {
        name: 'Earn'
    }
];

const ListItemTextComponent = styled(ListItemText)({
	fontSize: 13
});

const CustomBtn = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
    marginRight: 10
});

const StyledSelect = styled(Select)({
	fontSize: 13,
    '& .MuiInputBase-input:focus': {
        backgroundColor: 'transparent'
    }
});

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

const Header = () => {
    const dispatch = useDispatch();
	const classes = useStyles();
	// const [anchorElNav, setAnchorElNav] = useState(false);
    const [pos, setPos] = useState({
        left: false
    });
	// const [anchorElUser, setAnchorElUser] = useState(null);
    const [language, setLanguage] = useState('English');
    const [showSubMenu, setShowSubMenu] = useState(null);
    const generalStats = useSelector(state => state.generalCoinStats.generalStats);

    useEffect(() => {
        dispatch(generalActions.fetchData());
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
        console.log(subMenuName);
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
				<Container sx={{maxWidth: '1400px'}} maxWidth={false}>
					<Box sx={{display: 'flex', alignItems: 'center'}}>
						<List className={classes.listTop}>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<Typography className={classes.itemText}>Cryptos:&nbsp;</Typography>}
								/>
								<ListItemTextComponent
									primary={
										<Typography className={`${classes.itemText} ${classes.txtBlue}`}>
											{generalStats.cryptos.toLocaleString()}
										</Typography>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<Typography className={classes.itemText}>Exchanges:&nbsp;</Typography>}
								/>
								<ListItemTextComponent
									primary={
										<Typography className={`${classes.itemText} ${classes.txtBlue}`}>
											{generalStats.exchanges}
										</Typography>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<Typography className={classes.itemText}>Market Cap:&nbsp;</Typography>}
								/>
								<ListItemTextComponent
									primary={
										<Typography className={`${classes.itemText} ${classes.txtBlue}`}>
											${generalStats.marketCap.toLocaleString()}
										</Typography>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<Typography className={classes.itemText}>24h Vol:&nbsp;</Typography>}
								/>
								<ListItemTextComponent
									primary={
										<Typography className={`${classes.itemText} ${classes.txtBlue}`}>
											${generalStats.vol24h.toLocaleString()}
										</Typography>
									}
								/>
							</ListItem>
							<ListItem disablePadding className={classes.listItem}>
								<ListItemTextComponent
									primary={<Typography className={classes.itemText}>Dominance:&nbsp;</Typography>}
								/>
								<ListItemTextComponent
									primary={
										<Typography className={`${classes.itemText} ${classes.txtBlue}`}>
											BTC: {generalStats.btcDom.toFixed(2)}% &nbsp; ETH: ${generalStats.ethDom.toFixed(2)}%
										</Typography>
									}
								/>
							</ListItem>
						</List>
						<Box sx={{marginLeft: 'auto', display: {xs: 'none', lg: 'block'}}}>
							<FormControl size='small' variant='standard'>
								<StyledSelect
									disableUnderline
									labelId='select-language-label'
									id='select-language'
									value={language}
									label='Language'
									onChange={handleChangeLanguage}>
									<MenuItem value='English' sx={{fontSize: 13}}>
										English
									</MenuItem>
									<MenuItem value='Tiếng Việt' sx={{fontSize: 13}}>
										Tiếng Việt
									</MenuItem>
								</StyledSelect>
							</FormControl>
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
								<Link to='/' className={classes.logo}>
									<Box component='img' sx={{height: 30}} alt='logo' src='/images/cmc.svg' />
								</Link>
								<IconButton color='inherit' onClick={() => toggleDrawer('left', false)}>
									<CloseIcon></CloseIcon>
								</IconButton>
							</Box>
							<Box sx={{padding: '0 20px'}}>
								<List>
									{menu.map(
										(item) => (
											<ListItem key={item.name} sx={{display: 'block'}} disablePadding>
												<ListItemText style={{color: showSubMenu === item.name ? '#3862fa' : '#000'}}
													onClick={() => handleShowSubMenu(item.name)}
													className={classes.menuItem}>
													{item.name}
													{item.submenu && (
														<IconButton
															color='inherit'
															sx={{marginLeft: 'auto'}}
															className={classes.iconToggle}>
															<KeyboardArrowDownIcon style={{transform: showSubMenu === item.name ? 'rotate(-180deg)' : null}}/>
														</IconButton>
													)}
												</ListItemText>
												{/* <Button
                                                    onClick={() => handleShowSubMenu(item.name)}
                                                    component={ListItemText}
                                                    className={classes.menuItem}
                                                    sx={{color: 'black', display: 'block'}}>
                                                    {item.name}
                                                    {item.submenu && (
                                                        <IconButton
                                                            color='inherit'
                                                            sx={{marginLeft: 'auto'}}
                                                            className={classes.iconToggle}>
                                                            <KeyboardArrowDownIcon />
                                                        </IconButton>
                                                    )}
                                                </Button> */}
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
																			<img src={subItem.icon} alt={subItem.name} width='25'/>
                                                                            {subItem.name}
																		</Link>
																	) : (
																		<a
																			href={subItem.url}
																			rel='noreferrer'
																			target='_blank'>
																			<img src={subItem.icon} alt={subItem.name} width='25'/> 
                                                                            {subItem.name}
																		</a>
																	)}

																	{/* <Button
                                                                        component={Link}
                                                                        to={subItem.url}
                                                                        key={subItem.name}
                                                                        className={classes.subMenuItem}
                                                                        sx={{color: 'black', display: 'block'}}>
                                                                        {subItem.name}
                                                                    </Button> */}
																</ListItem>
															))}
														</List>
													</Box>
												)}
											</ListItem>
										)
										// item.url ? (
										// 	<ListItem key={item.name} sx={{display: 'block'}} disablePadding>
										//         <Link className={classes.menuItem}>

										//         </Link>
										// 		<Button
										// 			onClick={() => handleShowSubMenu(item.name)}
										// 			component={Link}
										// 			to='/'
										// 			className={classes.menuItem}
										// 			sx={{color: 'black', display: 'block'}}>
										// 			{item.name}
										// 			{item.submenu && (
										// 				<IconButton
										// 					color='inherit'
										// 					sx={{marginLeft: 'auto'}}
										// 					className={classes.iconToggle}>
										// 					<KeyboardArrowDownIcon />
										// 				</IconButton>
										// 			)}
										// 		</Button>
										// 		{item.submenu && (
										// 			<Box className={classes.subMenuContainer} style={{
										//                 maxHeight: showSubMenu === item.name ? '500px' : 0,
										//                 transition: showSubMenu === item.name ? 'max-height 0.4s ease-in' : 'max-height 0.36s ease-out'
										//             }}>
										//                 <List className={classes.subMenuList}>
										//                     {item.submenu.map((subItem) => (
										//                         <ListItem key={subItem.name}>
										//                             <Button
										//                                 component={Typography}
										//                                 to={subItem.url}
										//                                 className={classes.subMenuItem}
										//                                 sx={{color: 'black', display: 'block'}}>
										//                                 {subItem.name}
										//                             </Button>
										//                         </ListItem>
										//                     ))}
										//                 </List>
										//             </Box>
										// 		)}
										// 	</ListItem>
										// ) : (
										// 	<ListItem key={item.name} sx={{display: 'block'}} disablePadding>
										// 		<Button
										// 			onClick={() => handleShowSubMenu(item.name)}
										// 			component={Typography}
										// 			className={classes.menuItem}
										// 			sx={{color: 'black', display: 'block'}}>
										// 			{item.name}
										// 			{item.submenu && (
										// 				<IconButton
										// 					color='inherit'
										// 					sx={{marginLeft: 'auto'}}
										// 					className={classes.iconToggle}>
										// 					<KeyboardArrowDownIcon />
										// 				</IconButton>
										// 			)}
										// 		</Button>
										// 		{item.submenu && (
										// 			<Box className={classes.subMenuContainer} style={{
										//                 maxHeight: showSubMenu === item.name ? '500px' : 0,
										//                 transition: showSubMenu === item.name ? 'max-height 0.4s ease-in' : 'max-height 0.36s ease-out'
										//             }}>
										// 				<List className={classes.subMenuList}>
										// 					{item.submenu.map((subItem) => (
										// 						<ListItem key={subItem.name}>
										// 							<Button
										// 								component={Link}
										// 								to={subItem.url}
										// 								key={subItem.name}
										// 								className={classes.subMenuItem}
										// 								sx={{color: 'black', display: 'block'}}>
										// 								{subItem.name}
										// 							</Button>
										// 						</ListItem>
										// 					))}
										// 				</List>
										// 			</Box>
										// 		)}
										// 	</ListItem>
										// )
									)}
								</List>
							</Box>
							{/* <List>
                                {menu.map((item) => (
                                    <ListItem key={item}>
                                        <Typography textAlign='center' className={classes.menuItem}>
                                            {item}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List> */}
						</Drawer>
						<Link to='/' className={classes.logo}>
							<Box component='img' sx={{height: 30}} alt='logo' src='/images/cmc.svg' />
						</Link>
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
                                                    <Link to={item.url} key={item.name}>
                                                        {item.name}
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={item.url}
                                                        rel='noreferrer'
                                                        target='_blank'>
                                                        {item.name}
                                                    </a>
                                                )
											) : (
												<Typography to={item.url}>{item.name}</Typography>
											)}
										</ListItemText>
									</ListItem>
								))}
							</List>
						</Box>
						<Box sx={{display: {xs: 'none', lg: 'flex'}, flexGrow: 0, marginLeft: 'auto'}}>
							<ButtonGroup aria-label='outlined primary button group'>
								<CustomBtn variant='text' sx={{color: '#000'}}>
									Log in
								</CustomBtn>
								<CustomBtn variant='contained' style={{borderRadius: 6, backgroundColor: '#3861fb'}}>
									Sign up
								</CustomBtn>
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
