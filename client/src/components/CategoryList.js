import { List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';
import { Link } from 'react-router-dom';

// From CMC
const categories = [
    {
        id: 'cryptocurrencies',
        name: 'Cryptocurrencies',
        slug: '/'
    },
    {
        id: 'categories',
        name: 'Categories',
        slug: 'categories'
    },
    {
        id: '5fb62883c9ddcc213ed13308',
        name: 'DeFi',
        slug: '/category/defi'
    },
    {
        id: '60291fa0db1be76c46298e83',
        name: 'NFT',
        fullName: 'Collectibles NFTS',
        slug: '/category/collectibles-nfts'
    },
    {
        id: '6053dfb66be1bf5c15e865ee',
        name: 'Metaverse',
        slug: '/category/metaverse'
    },
    {
        id: '604f2752ebccdd50cd175fc0',
        name: 'Smart Contracts',
        slug: '/category/smart-contracts'
    },
    {
        id: '60308028d2088f200c58a005',
        name: 'BNB Chain',
        slug: '/category/bnb-chain'
    },
    {
        id: '61693ae410dbb97a52fb2ed0',
        name: 'Web3',
        slug: '/category/web3'
    },
];

const StyledList = styled(List)(({ theme }) => ({
    padding: 0,
    '& a': {
        fontSize: 13,
        fontWeight: 700,
        color: 'var(--color-sub-txt)',
        padding: '4px 10px',
        marginRight: 10,
        '&:hover': {
            backgroundColor: 'var(--bg-hover-item)',
            borderRadius: 4,
        },
        '&.active': {
            color: 'var(--color-primary)',
            backgroundColor: 'rgba(56, 97, 251, 0.1)',
            borderRadius: 4,
        }
    },
    '@media (max-width: 1440px)': {
        width: '100%',
        marginBottom: 10
    }
}));

const CategoryList = () => {
    return <StyledList>
        {
            categories.map(item => (
                <Link key={item.id} to={item.slug} className='active'>{item.name}</Link>
            ))
        }
    </StyledList>;
}

export default memo(CategoryList);