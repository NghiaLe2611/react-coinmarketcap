<Box sx={navbarStyle}>
	<Container>
		<Toolbar disableGutters sx={{alignItems: {lg: 'stretch'}}}>
			<Drawer
				PaperProps={{
					sx: {width: '100%', display: {xs: 'flex', lg: 'none'}},
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
				<Box sx={{padding: '0 20px', height: 'calc(100% - 60px)', overflow: 'auto'}}>
					<List>
						{menu.map((item) => (
							<ListItem key={item.name} sx={{display: 'block'}} disablePadding>
								<ListItemText
									sx={
										showSubMenu === item.name
											? [classes.menuItem, classes.txtBlue]
											: classes.menuItem
									}>
									{item.url ? (
										!item.url.includes('https') ? (
											<>
												<Typography component={RouterLink} to={item.url} key={item.name}>
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
													sx={{...classes.iconToggle, marginLeft: 'auto'}}>
													<KeyboardArrowDownIcon
														style={{
															transform:
																showSubMenu === item.name ? 'rotate(-180deg)' : null,
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
					<Box mt={4}>
						<CustomBtn variant='contained' sx={{backgroundColor: '#eef0f2'}}>
							Log in
						</CustomBtn>
						<CustomBtn variant='contained' bgColor='#3861fb' sx={{color: '#fff'}}>
							Sign up
						</CustomBtn>
					</Box>
					<Box mt={4}>
						<FormControl size='small' variant='filled'>
							<StyledSelect
								displayEmpty
								disableUnderline
								labelId='select-language-label'
								sx={classes.selectLang}
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
						<Button sx={classes.btnMode} onClick={() => dispatch(toggleTheme())}>
							{isDarkMode ? <LightModeIcon fontSize='small' /> : <DarkModeIcon fontSize='small' />}
						</Button>
					</Box>
				</Box>
			</Drawer>

			<LogoImage to='/' />

			<Box sx={{flexGrow: 1, display: {xs: 'none', lg: 'flex'}}}>
				<List sx={{display: 'flex'}}>
					{menu.map((item) => (
						<ListItem
							key={item.name}
							sx={{display: 'block', marginRight: {lg: '30px'}}}
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
					display: {xs: 'none', lg: 'flex'},
					alignSelf: 'center',
					flexGrow: 0,
					marginLeft: 'auto',
				}}>
				<ButtonGroup aria-label='outlined primary button group'>
					<CustomBtn variant='text'>Log in</CustomBtn>
					<CustomBtn variant='contained' bgColor='#3861fb' sx={{color: '#fff'}}>
						Sign up
					</CustomBtn>
				</ButtonGroup>
				<Search onClick={handleShowSearchBox}>
					<SearchIconWrapper>
						<SearchIcon fontSize='small' />
					</SearchIconWrapper>
					{/* <StyledInputBase placeholder='Search…' inputProps={{'aria-label': 'search'}} /> */}
					<StyledInputBase>Search</StyledInputBase>
				</Search>
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
									<Typography component={RouterLink} to='/btc'>
										Bitcoin
									</Typography>
								</ListItem>
								<ListItem>
									<Typography component={RouterLink} to='/eth'>
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
</Box>;
