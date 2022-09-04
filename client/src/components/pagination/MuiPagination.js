import {memo} from 'react';
import { Pagination} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPagination = styled(Pagination)(({theme}) => ({
    '& .MuiPagination-ul': {
        justifyContent: 'flex-end'
    },
	'& .MuiPaginationItem-root': {
        borderRadius: 4,
        maxWidth: 38,
		// '&.Mui-disabled': {
		// 	opacity: 0.5,
		// },
		'&:hover, &.Mui-selected': {
			fontWeight: 500,
		},
		'&:hover': {
			backgroundColor: 'var(--bg-hover)',
		},
		'&.Mui-selected': {
			backgroundColor: 'var(--color-primary) !important',
			color: '#fff !important',
		},
	},
}));

const MuiPagination = ({count, page, onChange}) => {
	return <StyledPagination count={count} page={page} onChange={onChange} />;
};

export default memo(MuiPagination);
