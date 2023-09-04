import { useState, useEffect, useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Fab from '@mui/material/Fab';
import { ThemeProvider } from '@mui/material/styles';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { _isDarkMode } from './features/theme/themeSlice';
import AppRoutes from './routes';
import themes from './themes';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const queryClient = new QueryClient();
const queryCache = new QueryCache();

function App() {
	const isDarkMode = useSelector(_isDarkMode);
	const [showButton, setShowButton] = useState(false);

	const appTheme = useMemo(() => {	
		return isDarkMode ? themes('dark') : themes('light');
	}, [isDarkMode]);

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add('dark-theme');
		} else {
			document.body.classList.add('light-theme');
		}

		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

		return () => {
			document.body.removeAttribute('class');
		};
	}, [isDarkMode]);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			const height = document.body.scrollHeight * 70/100; // 70% of page's height
			
			if (window.pageYOffset >= height) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		});
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // for smoothly scrolling
		});
	};

	return (
		<ThemeProvider theme={appTheme}>
			<StyledEngineProvider injectFirst>
				<CssBaseline enableColorScheme />
				<QueryClientProvider client={queryClient}>
					<AppRoutes />
				</QueryClientProvider>
				{showButton && (
					<Fab size="small" onClick={scrollToTop} sx={{position: 'fixed', right: 24, bottom: 24}}>
						<KeyboardArrowUpIcon sx={{fontSize: '1.2rem'}} />
					</Fab>
				)}
			</StyledEngineProvider>
		</ThemeProvider>
	);
}

export default App;
