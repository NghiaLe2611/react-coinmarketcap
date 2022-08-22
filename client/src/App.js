import { useEffect, useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { _isDarkMode } from './features/theme/themeSlice';
import AppRoutes from './routes';
import themes from './themes';

const queryClient = new QueryClient();
const queryCache = new QueryCache();

function App() {
	const isDarkMode = useSelector(_isDarkMode);
	
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

	return (
		<ThemeProvider theme={appTheme}>
			<StyledEngineProvider injectFirst>
				<CssBaseline enableColorScheme />
				<QueryClientProvider client={queryClient}>
					<AppRoutes />
				</QueryClientProvider>
			</StyledEngineProvider>
			{/* <CssBaseline enableColorScheme />
			<QueryClientProvider client={queryClient}>
				<AppRoutes />
			</QueryClientProvider> */}
		</ThemeProvider>

		// <QueryClientProvider client={queryClient}>

		// </QueryClientProvider>
	);
}

export default App;
