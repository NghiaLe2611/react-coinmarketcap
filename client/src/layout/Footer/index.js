import {Box, Container, Grid, List, ListItem, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import useStyles from './styles';
import { styled } from '@mui/material/styles';
import { _isDarkMode } from '../../features/theme/themeSlice';
import { useSelector } from 'react-redux';

const FooterItem = styled(ListItem)(({theme}) => ({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '35px',
    padding: theme.spacing(0),
	'& a': {
        color: theme.palette.mode === 'dark' ? '#a0a0a0' : '#58667e',
        '&:hover': {
            color: '#3862fa'
        }
    }
}));

const LogoImage = styled(Link)(({theme}) => ({
    marginRight: 30,
    lineHeight: 1,
    width: 130,
    height: 30,
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    mask: 'url(images/cmc.svg) no-repeat center',
}));

const Copyright = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#141418' : '#f4f6f8',
    padding: '16px',
    textAlign: 'center',
    '& p': {
        color: '#58667e',
        fontSize: 13,
        fontWeight: 500
    }
}));

// 1a1c23

const Footer = () => {
	const classes = useStyles();
    const isDarkMode = useSelector(_isDarkMode);
    const styles = {
        borderTop: '1px solid #1a1c23',
        backgroundColor: '#17171a'
    };
	return (
        <Box pt={6} sx={{borderTop: isDarkMode && styles.borderTop, backgroundColor: isDarkMode && styles.backgroundColor}}>
            <Container>
                <Grid container>
                    <Grid item xs={12} lg={6}>
                        {/* <Link to='/' className={classes.logo}>
                            <Box component='img' sx={{height: 30}} alt='logo' src='/images/cmc.svg' />
                        </Link> */}
                        <LogoImage to='/'/>
                    </Grid>
                    <Grid item xs={12} lg={6} container>
                        <Grid item xs={6} lg={3}>
                            <Typography className={classes.heading}>Products</Typography>
                            <List className={classes.list}>
                                <FooterItem>
                                    <Link to='/'>Blockchain Explorer</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Crypto API</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Crypto Indices</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Jobs Board</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Sitemap</Link>
                                </FooterItem>
                            </List>
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <Typography className={classes.heading}>Company</Typography>
                            <List className={classes.list}>
                                <FooterItem>
                                    <Link to='/'>About us</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Terms of use</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Privacy Policy</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Community Rules</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Disclaimer</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Methodology</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Careers</Link>
                                </FooterItem>
                            </List>
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <Typography className={classes.heading}>Support</Typography>
                            <List className={classes.list}>
                                <FooterItem>
                                    <Link to='/'>Request Form</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Contact Support</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>FAQ</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Glossary</Link>
                                </FooterItem>
                            </List>
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <Typography className={classes.heading}>Socials</Typography>
                            <List className={classes.list}>
                                <FooterItem>
                                    <Link to='/'>Facebook</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Twitter</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Telegram</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Instagram</Link>
                                </FooterItem>
                                <FooterItem>
                                    <Link to='/'>Interactive Chat</Link>
                                </FooterItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>    
            <Copyright>
                <Typography>&copy;2022 React CoinMarketCap-Nghia Le. All right reserved.</Typography>
                <Typography>Source: coinmarketcap, coingecko</Typography>
            </Copyright>
        </Box>
	);
};

export default Footer;
