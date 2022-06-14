import Header from './layout/Header';
import Footer from './layout/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: ['Inter', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
	},
	palette: {
		primaryBlue: '#d81a1a',
	},
	overrides: {},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
});

function App() {
	return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Footer/>
        </ThemeProvider>
	);
}

export default App;
