import Header from './layout/Header';
import Footer from './layout/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './features/theme/theme';
import { _isDarkMode } from './features/theme/themeSlice';
import { deepmerge } from '@mui/utils';
import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import AppRoutes from './routes';

// function createFontFamily(fontFamily) {
// 	return {
// 		h1: {fontFamily},
// 		h2: {fontFamily},
// 		h3: {fontFamily},
// 		h4: {fontFamily},
// 		h5: {fontFamily},
// 		h6: {fontFamily},
// 		subtitle1: {fontFamily},
// 		subtitle2: {fontFamily},
// 		body1: {fontFamily},
// 		body2: {fontFamily},
// 		button: {fontFamily},
// 		caption: {fontFamily},
// 		overline: {fontFamily},
// 	};
// }

const typography = {
    fontFamily: ['Inter', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
};

let theme = createTheme({});

theme = createTheme({
	typography,
	palette: {
		primaryBlue: '#d81a1a',
        text:{
            primary: '#000'
        }
	},
	// overrides: {
	// },
	components: {
        MuiTypography: {
			styleOverrides: {
				root: {
					color: '#000',
                    // transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
				}
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
                    transition: 'none'
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: 1400,
					},
				},
			},
		},
        MuiLink: {
            styleOverrides: {
				root: {
					color: '#000',
                    textDecoration: 'none'
				},
			},
        }
		// MuiCssBaseline: {},
	},
});

function App() {
    
    const isDarkMode = useSelector(_isDarkMode);
    
    // const myTheme = useMemo(() => createTheme(deepmerge(theme)), [isDarkMode])
    let mergedTheme = isDarkMode ? createTheme(theme, {...darkTheme, typography}) : theme;

	return (
        <ThemeProvider theme={mergedTheme}>
            <CssBaseline enableColorScheme />
            <AppRoutes/>
        </ThemeProvider>
	);
}

export default App;
