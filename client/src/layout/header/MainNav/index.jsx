import { useState } from 'react';

import { ListItemText, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';

import { toggleTheme } from '../../../features/theme/themeSlice';
import classes, { CustomBtn, LogoImage, SelectLanguage, StyledSelect } from './styles';
import Search from '../Search';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const MainNav = ({menu, isDarkMode, language, onHandleChangeLanguage}) => {
    const dispatch = useDispatch();
    const [showSubMenu, setShowSubMenu] = useState(null);
    const [pos, setPos] = useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => {
        setPos({ ...pos, [anchor]: open });
    };

    const handleShowSubMenu = (subMenuName) => {
        setShowSubMenu(prev => {
            if (prev !== subMenuName) return subMenuName;
            return null;
        });
    };

    const navbarStyle = {borderBottom: isDarkMode ? '1px solid #222531' : '1px solid #eff2f5'};

	return (
		<Box sx={navbarStyle}>
			<Container>
				<Toolbar disableGutters sx={{ alignItems: { lg: 'stretch' } }}>
					<Drawer
						sx={{ zIndex: 1400 }}
						PaperProps={{
							//171924
							sx: {
								width: '100%',
								background: 'var(--bg-drawer) !important',
								display: { xs: 'flex', lg: 'none' },
							},
						}}
						anchor={'left'}
						open={pos['left']}
						onClose={() => toggleDrawer('left', false)}>
						<Box sx={classes.menuHeading}>
							<LogoImage to='/' />
							<IconButton color='inherit' onClick={() => toggleDrawer('left', false)}>
								<CloseIcon></CloseIcon>
							</IconButton>
						</Box>
						<Box sx={{ padding: '0 20px', height: 'calc(100% - 60px)', overflow: 'auto' }}>
							<List>
								{menu.map((item) => (
									<ListItem key={item.name} sx={{ display: 'block' }} disablePadding>
										<ListItemText
											sx={
												showSubMenu === item.name
													? [classes.menuItem, classes.txtBlue]
													: classes.menuItem
											}>
											{item.url ? (
												!item.url.includes('https') ? (
													<>
														<Typography
															component={RouterLink}
															to={item.url}
															key={item.name}>
															{item.name}
														</Typography>
														{item.submenu && (
															<IconButton
																color='inherit'
																onClick={() => handleShowSubMenu(item.name)}
																sx={classes.iconToggle}>
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
														<Typography
															component={Link}
															target='_blank'
															rel='noreferrer'
															href={item.url}
															key={item.name}>
															{item.name}
														</Typography>
														{item.submenu && (
															<IconButton
																color='inherit'
																onClick={() => handleShowSubMenu(item.name)}
																sx={classes.iconToggle}>
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
															sx={{ ...classes.iconToggle, marginLeft: 'auto' }}>
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
												sx={{
													...classes.subMenuContainer,
													maxHeight: showSubMenu === item.name ? '500px' : 0,
													transition:
														showSubMenu === item.name
															? 'max-height 0.4s ease-in'
															: 'max-height 0.36s ease-out',
												}}>
												<List sx={classes.subMenuList}>
													{item.submenu.map((subItem) => (
														<ListItem key={subItem.name} sx={classes.subMenuItem}>
															{!subItem.url.includes('https') ? (
																<Typography
																	component={RouterLink}
																	to={subItem.url}
																	key={subItem.name}>
																	<img
																		src={subItem.icon}
																		alt={subItem.name}
																		width='25'
																	/>
																	{subItem.name}
																</Typography>
															) : (
																<Typography
																	component={Link}
																	target='_blank'
																	rel='noreferrer'
																	href={subItem.url}
																	key={subItem.name}>
																	<img
																		src={subItem.icon}
																		alt={subItem.name}
																		width='25'
																	/>
																	{subItem.name}
																</Typography>
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
								<CustomBtn
									variant='contained'
									sx={{
										backgroundColor: 'var(--bg-control)',
										'&:hover': {
											backgroundColor: 'var(--bg-neutral-5)',
										},
									}}>
									Log in
								</CustomBtn>
								<CustomBtn
									variant='contained'
									bgColor='var(--color-primary)'
									sx={{
										color: '#fff',
										'&:hover': {
											backgroundColor: '#2f56ea',
										},
									}}>
									Sign up
								</CustomBtn>
							</Box>
							<Box mt={4}>
								<FormControl size='small' variant='standard'>
									<SelectLanguage
										select
										size='small'
										value={language}
										onChange={onHandleChangeLanguage}
										defaultValue='All'>
										<MenuItem value='en' sx={{ fontSize: 13, minHeight: 30 }}>
											English
										</MenuItem>
										<MenuItem value='vi' sx={{ fontSize: 13, minHeight: 30 }}>
											Tiếng Việt
										</MenuItem>
									</SelectLanguage>
								</FormControl>
								<Button sx={classes.btnMode} onClick={() => dispatch(toggleTheme())}>
									{isDarkMode ? (
										<LightModeIcon fontSize='small' />
									) : (
										<DarkModeIcon fontSize='small' />
									)}
								</Button>
							</Box>
						</Box>
					</Drawer>

					<LogoImage to='/' />

					<Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>
						<List sx={{ display: 'flex' }}>
							{menu.map((item) => (
								<ListItem
									key={item.name}
									sx={{ display: 'block', marginRight: { lg: '30px' } }}
									disablePadding
									onMouseOver={() => handleShowSubMenu(item.name)}
									onMouseOut={() => handleShowSubMenu(null)}>
									<ListItemText sx={classes.menuItem}>
										{item.url ? (
											!item.url.includes('https') ? (
												<Typography component={RouterLink} to={item.url} key={item.name}>
													{item.name}
												</Typography>
											) : (
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
									{item.submenu && (
										<Box
											sx={{
												...classes.subMenuContainer,
												maxHeight: showSubMenu === item.name ? '500px' : 0,
												transition:
													showSubMenu === item.name
														? 'max-height 0.4s ease-in'
														: 'max-height 0.36s ease-out',
											}}>
											<List
												sx={
													showSubMenu === item.name
														? [classes.subMenuList, classes.subMenuActive]
														: classes.subMenuList
												}>
												{item.submenu.map((subItem) => (
													<ListItem key={subItem.name} sx={classes.subMenuItem}>
														{!subItem.url.includes('https') ? (
															<Typography
																component={RouterLink}
																to={subItem.url}
																key={subItem.name}>
																<img src={subItem.icon} alt={subItem.name} width='25' />
																{subItem.name}
															</Typography>
														) : (
															<Typography
																component={Link}
																target='_blank'
																rel='noreferrer'
																href={subItem.url}
																key={subItem.name}>
																<img src={subItem.icon} alt={subItem.name} width='25' />
																{subItem.name}
															</Typography>
														)}
													</ListItem>
												))}
											</List>
										</Box>
									)}
								</ListItem>
							))}
						</List>
					</Box>

					<Box
						sx={{
							display: { xs: 'none', lg: 'flex' },
							alignSelf: 'center',
							flexGrow: 0,
							marginLeft: 'auto',
						}}>
						<ButtonGroup aria-label='outlined primary button group'>
							<CustomBtn variant='text' sx={{ px: 2 }}>
								Log in
							</CustomBtn>
							<CustomBtn
								variant='contained'
								bgColor='var(--color-primary)'
								sx={{
									color: '#fff',
									'&:hover': {
										backgroundColor: '#2f56ea',
									},
								}}>
								Sign up
							</CustomBtn>
						</ButtonGroup>

						{/* Search component */}
						<Search />
					</Box>

					<Box sx={{ display: { xs: 'block', lg: 'none', marginLeft: 'auto' } }}>
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
	);
};

export default MainNav;
