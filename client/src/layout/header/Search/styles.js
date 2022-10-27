import {Box, InputBase, Select, styled} from '@mui/material';

export const StyledSelect = styled(Select)(({theme}) => ({
	fontSize: 13,
	'& .MuiInputBase-input:focus': {
		backgroundColor: 'transparent',
	},
}));

export const SearchBox = styled('div')(({theme}) => ({
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
	alignItems: 'center',
}));

export const SearchInput = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	'&.MuiInputBase-root': {
		width: '100%',
	},
	'& .MuiInputBase-input': {
		// padding: theme.spacing(2),
		fontSize: 13,
		cursor: 'pointer',
		paddingLeft: `calc(1em + ${theme.spacing(2)})`,
	},
}));

export const StyledInputBase = styled(Box)(({theme}) => ({
	color: '#a6b0c3',
	padding: theme.spacing(1, 1, 1, 0),
	paddingLeft: `calc(1em + ${theme.spacing(3)})`,
	fontSize: 13,
	cursor: 'pointer',
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: '26ch',
	},
}));

const classes = {
	popover: {
		'& .MuiPaper-root': {
			background: (theme) => (theme.palette.mode === 'dark' ? '#17171a' : '#fff'),
		},
	},
	clearSearch: {
		borderRadius: '50%',
		backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#000' : '#ccc'),
		width: 16,
		height: 16,
		'&:hover': {
			backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#000' : '#ccc'),
		},
		'& svg': {
			color: '#fff',
		},
	},
	searchLbl: {
		fontSize: 12,
		display: 'flex',
		alignItems: 'center',
		'& svg': {
			marginLeft: '5px',
			fontSize: '14px',
			color: '#f56951',
		},
	},
	listTrending: {
		'& li:hover': {
			backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa'),
		},
	},
    itemTrending: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '& img': {
            marginRight: '8px',
            borderRadius: '10px'
        },
        '& .name': {
            fontSize: 14,
            fontWeight: 700,
            marginRight: '10px'
        }
    },
    wrapName: {
        display: 'flex',
        alignItems: 'center',
    },
    txt: {
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--color-sub-txt)',
    }
};

export default classes;
