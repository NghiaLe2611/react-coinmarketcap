import {Box, Button, List, ListItem} from '@mui/material';
import usePagination from '@mui/material/usePagination';
import {styled} from '@mui/material/styles';

const StyledList = styled(List)(({theme}) => ({
	display: 'flex',
	justifyContent: 'flex-end',
}));

const StyledListItem = styled(ListItem)(({theme}) => ({
	width: 'auto',
	padding: 0,
	margin: '0 2px',
}));

const StyledButton = styled(Button)(({theme}) => ({
	minWidth: '32px',
	height: '32px',
	color: 'var(--color-common-txt) !important',
	'&.Mui-disabled': {
		opacity: 0.7,
	},
	'&:hover, &.selected': {
		fontWeight: 500,
	},
	'&:hover': {
		backgroundColor: 'var(--bg-hover)',
		// color: '#fff !important',
	},
	'&.selected': {
		backgroundColor: 'var(--color-primary)',
		color: '#fff !important',
	},
}));

export default function CustomPagination({count, page, onPageChange, style}) {
	const {items} = usePagination({
		count,
	});
	const currentPage = page;

	const handlePrevPage = () => {
		if (currentPage !== 0) {
			onPageChange(null, currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage !== count - 1) {
			onPageChange(null, currentPage + 1);
		}
	};

	return (
		<Box sx={{...style}}>
			<StyledList>
				{items.map(({page, type, selected, ...item}, index) => {
					let children = null;

					if (type === 'start-ellipsis' || type === 'end-ellipsis') {
						children = '…';
					} else if (type === 'page') {
						children = (
							<StyledButton {...item} className={selected ? 'selected' : ''}>
								{page}
							</StyledButton>
						);
					}
					// prev + next btn
					else {
						children = <StyledButton {...item}>{type}</StyledButton>;
					}

					return type === 'page' ? (
						<StyledListItem key={index + 1} onClick={() => onPageChange(null, page)}>
							{children}
						</StyledListItem>
					) : type === 'previous' ? (
						<StyledListItem key={index + 1} onClick={handlePrevPage}>
							{children}
						</StyledListItem>
					) : (
						<StyledListItem key={index + 1} onClick={handleNextPage}>
							{children}
						</StyledListItem>
					);
				})}
			</StyledList>
		</Box>
	);
}
