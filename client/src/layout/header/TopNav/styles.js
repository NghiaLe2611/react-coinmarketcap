import { Box, Button, InputBase, ListItemText, Select, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const ItemGeneral = styled(Typography)(({theme}) => ({
	fontSize: 11,
	fontWeight: 500,
	color: theme.palette.mode === 'dark' ? '#d1d1d4' : 'var(--color-sub-txt)',
	'@media (min-width: 1280px)': {
		fontSize: 12,
	},
}));

export const StyledSelect = styled(Select)({
	fontSize: 13,
	'& .MuiInputBase-input:focus': {
		backgroundColor: 'transparent',
	},
});

const classes = {
	btnMode: {
		minWidth: 40,
		height: 40,
		color: '#000',
		marginLeft: '10px',
		'@media (max-width: 1280px)': {
			backgroundColor: 'var(--bg-sub-btn)',
		},
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
	txtBlue: {
        color: 'var(--color-primary)',
        '& a, & p': {
            color: 'var(--color-primary)',
        }
	}
};

export default classes;