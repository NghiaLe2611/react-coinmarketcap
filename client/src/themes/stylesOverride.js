export default function componentStyleOverrides(theme) {
    const colorCommonTxt = 'var(--color-common-txt)';

	return {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: colorCommonTxt,
                    // transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    transition: 'none',
                },
            },
        },
        MuiContainer: {
        	styleOverrides: {
        		root: {
                    '&.MuiContainer-maxWidthLg' : {
                        maxWidth: 1400
                    }, 
                }
        	},
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: colorCommonTxt,
                    textDecoration: 'none',
                },
            },
        },
    };
}
