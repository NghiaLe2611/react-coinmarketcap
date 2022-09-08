import { memo } from 'react';
import { List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

// From CMC
const categories = [
	{
		id: 'cryptocurrencies',
		name: 'Cryptocurrencies',
		slug: '/',
	},
	{
		id: 'categories',
		name: 'Categories',
		slug: 'categories',
	},
	{
		id: '5fb62883c9ddcc213ed13308',
		name: 'DeFi',
		slug: 'category/defi',
	},
	{
		id: '60291fa0db1be76c46298e83',
		name: 'NFT',
		fullName: 'Collectibles NFTS',
		slug: 'category/nfts-&-collectibles',
	},
	{
		id: '6053dfb66be1bf5c15e865ee',
		name: 'Metaverse',
		slug: 'category/metaverse',
	},
	{
		id: '604f2752ebccdd50cd175fc0',
		name: 'Smart Contracts',
		slug: 'category/smart-contracts',
	},
	{
		id: '60308028d2088f200c58a005',
		name: 'BNB Chain',
		slug: 'category/bnb-chain-ecosystem',
	},
	{
		id: '61693ae410dbb97a52fb2ed0',
		name: 'Web3',
		slug: 'category/web3',
	},
];

const StyledList = styled(List)(({ theme }) => ({
	padding: 0,
    display: 'flex',
    flex: 1,
    '& .MuiListItem-root': {
        width: 'initial',
        padding: '4px 10px',
        marginRight: 10,
        borderRadius: 4,
        '&:hover': {
			backgroundColor: 'var(--bg-hover-item)',
		},
        '&.active': {
            backgroundColor: 'rgba(56, 97, 251, 0.1)',
            'a': {
                color: 'var(--color-primary)',
            },
        }
    },
	'& a': {
        width: '100%',
		fontSize: 12,
		fontWeight: 700,
		color: 'var(--color-sub-txt)',
	},
	'@media (max-width: 1440px)': {
		width: '100%',
		marginBottom: 10,
	},
}));

const CategoryList = () => {
    const location = useLocation();
    console.log(111,location.pathname);

    function getActiveClass(item) {
        if (item.slug === '/') {
            return location.pathname === item.slug;
        }

        return location.pathname.substring(1) === item.slug;
        
    };


	return (
		<StyledList>
			{categories.map((item) => (
				<ListItem key={item.id} className={getActiveClass(item) ? 'active' : ''}>
					<Link to={item.slug === '/' ? item.slug : `/${item.slug}`}>
						{item.name}
					</Link>
				</ListItem>
			))}
		</StyledList>
	);
};

export default memo(CategoryList);
