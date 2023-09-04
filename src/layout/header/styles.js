import { Box, Button, InputBase, ListItemText, Select, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const ListItemTextComponent = styled(ListItemText)(({theme}) => ({
    fontSize: 13,
    backgroundColor: theme.palette.mode === 'dark' ? 'red' : 'blue',
}));

export const CustomBtn = styled(Button, {
	shouldForwardProp: (props) => props !== 'bgColor',
})(({theme, bgColor}) => ({
	boxShadow: 'none',
	textTransform: 'none',
	marginRight: 10,
	borderRadius: '6px !important',
	color: theme.palette.mode === 'dark' ? '#fff' : '#000',
	[theme.breakpoints.down('lg')]: {
		display: 'block',
		width: '100%',
		marginBottom: 10,
	},
	// eef0f2
	backgroundColor: bgColor,
	'&:hover': {
		backgroundColor: bgColor && '#2f56ea',
	},
}));

export const StyledSelect = styled(Select)(({theme}) => ({
	fontSize: 13,
	'& .MuiInputBase-input:focus': {
		backgroundColor: 'transparent',
	},
}));

export const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: 8,
	backgroundColor: theme.palette.mode === 'dark' ? '#1d1f26' : '#eff2f5',
	color: theme.palette.mode === 'dark' ? '#d1d1d4' : '#656c7b',
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const SearchInputWrapper = styled('div')(({theme}) => ({
	position: 'relative',
	// backgroundColor: theme.palette.mode === 'dark' ? '#1d1f26' : '#eff2f5',
	color: theme.palette.mode === 'dark' ? '#d1d1d4' : '#656c7b',
	marginLeft: 0,
    padding: theme.spacing(1.5),
	width: '100%',
    display: 'flex',
    alignItems: 'center'
}));

export const SearchInput = styled(InputBase)(({theme}) => ({
	color: 'inherit',
    '&.MuiInputBase-root': {
        width: '100%'
    },
	'& .MuiInputBase-input': {
		// padding: theme.spacing(2),
		fontSize: 13,
        cursor: 'pointer',
		paddingLeft: `calc(1em + ${theme.spacing(2)})`
	}
}));

export const StyledInputBase = styled(Box)(({theme}) => ({
	color: '#a6b0c3',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    fontSize: 13,
    cursor: 'pointer',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '20ch'
    },
}));

export const ItemGeneral = styled(Typography)(({theme}) => ({
	fontSize: 11,
	fontWeight: 500,
	color: theme.palette.mode === 'dark' ? '#d1d1d4' : 'var(--color-sub-txt)',
	'@media (min-width: 1280px)': {
		fontSize: 12,
	},
}));

export const LogoImage = styled(Link)(({theme}) => ({
	alignSelf: 'center',
	marginRight: 30,
	lineHeight: 1,
	width: 130,
	height: 30,
	backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
	mask: 'url(../images/cmc.svg) no-repeat center',
}));

const classes = {
	header: {
		'@media (max-width: 1280px)': {
			flexDirection: 'column-reverse',
		},
	},
	navbar: {
		borderBottom: '1px solid var(--border-table)',
	},
	navbarDark: {
		borderBottom: '1px solid #222531',
	},
	listTop: {
		display: 'flex',
		'@media (max-width: 1280px)': {
			overflow: 'auto hidden',
			whiteSpace: 'nowrap',
			'&::-webkit-scrollbar': {
				display: 'none',
			},
		},
	},
	listItem: {
		width: 'inherit',
		marginRight: '20px',
	},
	itemText: {
		fontSize: 11,
		fontWeight: 500,
		color: 'var(--color-sub-txt)',
		'@media (min-width: 1280px)': {
			fontSize: 12,
		},
	},
	txtBlue: {
        color: 'var(--color-primary)',
        '& a, & p': {
            color: 'var(--color-primary)',
        }
	},
	menuItem: {
		margin: 0,
		display: 'flex',
		alignItems: 'center',
		height: '48px',
		transition: 'all 0.2s ease 0s',
		borderBottom: '1px solid var(--border-table)',
		'& span': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			fontSize: 15,
			fontWeight: 500,
		},
		'& a, & p': {
			display: 'flex',
			alignItems: 'center',
			height: '100%',
			cursor: 'pointer',
			fontSize: 15,
			fontWeight: 500,
		},
		'@media (min-width: 1280px)': {
			borderBottom: '0',
			height: '100%',
			'&:hover $subMenuList': {
				display: 'block',
				opacity: 1,
				animation: '0.3s ease 0s 1 normal forwards running',
			},
            '&:hover': {
                color: 'var(--color-primary)',
                '& a, & p': {
                    color: 'var(--color-primary)',
                }
            }
		},
	},
	subMenuContainer: {
		overflowY: 'hidden',
		maxHeight: 0,
		transition: 'max-height 0.4s ease-out',
	},
	subMenuList: {
		padding: '5px 10px',
		'@media (min-width: 1280px)': {
			position: 'absolute',
			display: 'none',
			// backgroundColor: '#fff',
			backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#17171a' : '#fff'),
			zIndex: 9,
			padding: '16px',
			borderRadius: '8px',
			filter: 'drop-shadow(rgba(128, 138, 157, 0.12) 0px 1px 2px) drop-shadow(rgba(128, 138, 157, 0.24) 0px 8px 32px)',
			whiteSpace: 'nowrap',
			left: '50%',
			transform: 'translate(-50%, 0%)',
			'&:before': {
				content: '""',
				position: 'absolute',
				top: '-20px',
				left: '50%',
				width: '10px',
				height: '20px',
				borderStyle: 'solid',
				borderWidth: '0 10px 10px 10px',
				borderColor: 'transparent transparent #fff transparent',
				display: 'inline-block',
				transform: 'translateX(-50%)',
			},
		},
	},
	subMenuActive: {
		display: 'block !important',
		opacity: 1,
		animation: 'fadeIn .3s',
	},
	subMenuItem: {
		padding: '10px',
		'&:hover': {
			backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#222531' : '#f7f8fa'),
		},
		'& a': {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			fontSize: 15,
			'& img': {
				marginRight: '10px',
			},
		},
	},
	iconToggle: {
		transition: 'all 0.36s ease 0s',
        marginLeft: 'auto'
	},
	selectLang: {
		fontSize: 13,
		backgroundColor: '#eef0f2',
		borderRadius: '4px',
		'& .MuiSelect-select': {
			padding: '0 40px 0 15px',
			height: 40,
			lineHeight: '40px',
		},
	},
	btnMode: {
		minWidth: 40,
		height: 40,
		color: '#000',
		marginLeft: '10px',
		backgroundColor: 'var(--bg-sub-btn) !important',
		// '@media (max-width: 1280px)': {
		// 	backgroundColor: 'var(--bg-sub-btn)',
		// },
	},
	menuHeading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 60,
		padding: '0 16px',
		boxShadow: 'rgb(128 138 157 / 12%) 0px 8px 32px, rgb(128 138 157 / 8%) 0px 1px 2px',
		'& a': {
			display: 'flex',
			alignItems: 'center',
		},
	},
    popover: {
     
    },
    clearSearch: {
        borderRadius: '50%',
        backgroundColor: '#ccc',
        width: 16,
        height: 16,
        '&:hover': {
            backgroundColor: '#ccc'
        },
        '& svg': {
            color: '#fff'
        }
    },
    searchLbl: {
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginLeft: '5px',
            fontSize:'14px', 
            color:'#f56951'
        }
    },
    listTrending: {
        '& a': {
            fontSize: 14,
            fontWeight: 500,
            width: '100%'
        },
        '& li:hover': {
            backgroundColor: '#fafafa'
        }
    }
};

export default classes;
