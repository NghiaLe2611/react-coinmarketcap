import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { generalActions, _generalStats } from '../../features/general/generalSlice';
import { _isDarkMode } from '../../features/theme/themeSlice';
import MainNav from './MainNav';
import TopNav from './TopNav';

const menu = [
    {
        name: 'Cryptocurrencies',
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
    // {
    //     name: 'Earn'
    // }
];

const Header = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector(_isDarkMode);
    const [language, setLanguage] = useState('en');
    const generalStats = useSelector(_generalStats);
    const location = useLocation();
    const storage = localStorage.getItem('generalStats');

    useEffect(() => {
        if (!storage) {
            dispatch(generalActions.fetchData());
        }
    }, [dispatch]);

    useEffect(() => {
		if (location.pathname !== '/') {
			localStorage.removeItem('top_gainers');
			localStorage.removeItem('top_losers');
		}
	}, [location]);

    // useEffect(() => {
    //     if (!storage) {
    //         localStorage.setItem('generalStats', JSON.stringify(generalStats));
    //     }
    // }, [generalStats]);

    const headerStyle = makeStyles({
		'@media (max-width: 1280px)': {
			flexDirection: 'column-reverse',
		}
	});
    //#0B1426

    const handleChangeLanguage = (e) => {
        setLanguage(e.target.value);
    };

	return (
		<AppBar position='static' color='transparent' elevation={0} sx={headerStyle}>
			{/* Top nav */}
			<TopNav
				isDarkMode={isDarkMode}
				generalStats={generalStats}
				language={language}
				onHandleChangeLanguage={handleChangeLanguage}
			/>

            {/* Main nav */}
			<MainNav menu={menu}
				isDarkMode={isDarkMode}
				generalStats={generalStats}
				language={language}
				onHandleChangeLanguage={handleChangeLanguage}
			/>
		</AppBar>
	);
};
export default Header;