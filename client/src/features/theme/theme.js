import {createTheme} from '@mui/material';

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
        text: {
			primary: '#000',
		}
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		background: {
            default: '#17171a'
		},
		text: {
			primary: '#fff',
		},
	},
    components: {
        MuiTypography: {
			styleOverrides: {
				root: {
					color: '#fff'
				}
			},
		},
        MuiSvgIcon: {
            styleOverrides: {
				root: {
					color: '#fff'
				}
			}
        }
        // MuiLink: {
        //     styleOverrides: {
		// 		root: {
		// 			color: '#fff'
		// 		},
		// 	},
        // }
	},
});
