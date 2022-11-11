import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Common
export const BoxFlex = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
}));

// Button
export const PrimaryBtn = styled(Button)(({ theme }) => ({
	boxShadow: 'none',
	textTransform: 'none',
	borderRadius: '6px !important',
	color: '#fff',
    backgroundColor: 'var(--color-primary)',
    '&:hover': {
        backgroundColor: '#2f56ea',
    },
}));

// Text
export const Heading = styled(Typography)(({ theme }) => ({
	fontSize: '1.5rem',
	fontWeight: 700,
}));

export const IntroText = styled(Typography)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	fontSize: '0.9rem',
	fontWeight: 500,
	color: 'var(--color-sub-txt)',
	marginBottom: 30,
}));

//  Form
export const StyledSelect = styled(TextField)({
	backgroundColor: 'var(--bg-select)',
	borderRadius: 6,
	'& .MuiSelect-select': {
		fontSize: 13,
		padding: 6,
	},
	'& fieldset': {
		border: 0,
	},
});

// Other
export const WrapFilterBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	flexWrap: 'wrap',
}));
