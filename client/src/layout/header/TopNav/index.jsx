import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, Button, Container, FormControl, List, ListItem, ListItemText, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../../features/theme/themeSlice';
import { SelectLanguage } from '../MainNav/styles';
import { ItemGeneral, StyledSelect } from '../styles';
import classes from './styles';

const NavTop = ({generalStats, isDarkMode, language, onHandleChangeLanguage}) => {
	const dispatch = useDispatch();
	
    const navbarStyle = {borderBottom: isDarkMode ? '1px solid #222531' : '1px solid #eff2f5'};
	return (
		<Box sx={navbarStyle}>
			<Container>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<List sx={classes.listTop}>
						<ListItem disablePadding sx={classes.listItem}>
							<ListItemText primary={<ItemGeneral>Cryptos:&nbsp;</ItemGeneral>} />
							<ListItemText
								primary={
									<ItemGeneral sx={classes.txtBlue}>
										{generalStats.cryptos.toLocaleString()}
									</ItemGeneral>
								}
							/>
						</ListItem>
						<ListItem disablePadding sx={classes.listItem}>
							<ListItemText primary={<ItemGeneral>Exchanges:&nbsp;</ItemGeneral>} />
							<ListItemText
								primary={<ItemGeneral sx={classes.txtBlue}>{generalStats.exchanges}</ItemGeneral>}
							/>
						</ListItem>
						<ListItem disablePadding sx={classes.listItem}>
							<ListItemText primary={<ItemGeneral>Market Cap:&nbsp;</ItemGeneral>} />
							<ListItemText
								primary={
									<ItemGeneral sx={classes.txtBlue}>
										${generalStats.marketCap.toLocaleString()}
									</ItemGeneral>
								}
							/>
						</ListItem>
						<ListItem disablePadding sx={classes.listItem}>
							<ListItemText primary={<ItemGeneral>24h Vol:&nbsp;</ItemGeneral>} />
							<ListItemText
								primary={
									<ItemGeneral sx={classes.txtBlue}>
										${generalStats.vol24h.toLocaleString()}
									</ItemGeneral>
								}
							/>
						</ListItem>
						<ListItem disablePadding sx={classes.listItem}>
							<ListItemText primary={<ItemGeneral>Dominance:&nbsp;</ItemGeneral>} />
							<ListItemText
								primary={
									<ItemGeneral sx={classes.txtBlue}>
										BTC: {generalStats.btcDom.toFixed(2)}% &nbsp; ETH: $
										{generalStats.ethDom.toFixed(2)}%
									</ItemGeneral>
								}
							/>
						</ListItem>
					</List>
					<Box sx={{ marginLeft: 'auto', alignItems: { lg: 'center' }, display: { xs: 'none', lg: 'flex' } }}>
						<FormControl size='small' variant='standard'>
							<StyledSelect
								disableUnderline
								labelId='select-language-label'
								id='select-language'
								value={language}
								onChange={onHandleChangeLanguage}>
								<MenuItem value='en' sx={{ fontSize: 13 }}>
									English
								</MenuItem>
								<MenuItem value='vi' sx={{ fontSize: 13 }}>
									Tiếng Việt
								</MenuItem>
							</StyledSelect>
						</FormControl>
						<Button sx={classes.btnMode} onClick={() => dispatch(toggleTheme())}>
							{isDarkMode ? (
								<LightModeIcon fontSize='small' sx={{ color: 'var(--color-common-txt)' }} />
							) : (
								<DarkModeIcon fontSize='small' sx={{ color: 'var(--color-common-txt)' }} />
							)}
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default NavTop;
