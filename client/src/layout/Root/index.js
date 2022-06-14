import Header from '../Header';
import Footer from '../Footer';

const Root = ({children}) => {
    return (
        <>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
};

export default Root;