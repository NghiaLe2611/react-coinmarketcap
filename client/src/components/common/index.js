import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Heading = styled((Typography))(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 700
}));

export const IntroText = styled(Typography)(({theme}) => ({
	display: 'flex',
    alignItems: 'center',
	fontSize: '0.9rem',
	fontWeight: 500,
	color: 'var(--color-sub-txt)',
	marginBottom: 30,
}));