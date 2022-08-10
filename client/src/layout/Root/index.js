import Header from '../Header';
import Footer from '../Footer';
import { styled } from '@mui/styles';
import { _isDarkMode } from '../../features/theme/themeSlice';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
// import useStyles from './styles';

const Main = styled('main')(({theme}) => ({
    padding: '20px 0'
}));

const Root = ({children}) => {
    const isDarkMode = useSelector(_isDarkMode);
    // const classes = useStyles();

    const bg = isDarkMode ? {
        background: 'linear-gradient(rgb(34, 37, 49) 0%, rgba(34, 37, 49, 0) 413px)'  
    } : {
        background: 'linear-gradient(rgb(248, 250, 253) 0%, rgba(248, 250, 253, 0) 413px)'
    };

    return (
        <>
            <Header/>
            <Main style={bg}>
                <Container>{children}</Container>
            </Main>
            <Footer/>
        </>
    )
};

export default Root;