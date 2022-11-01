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
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: 'var(--bg-body)',
                    '& .MuiTableCell-root': {
                        borderColor: 'var(--border-table)'
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    zIndex: 1303
                }
            }
        },
        MuiPopover: {
            styleOverrides: {
                root: {
                    '&.MuiMenu-root': {
                        zIndex: 1401
                    }
                }
            }
        }
    };
}
