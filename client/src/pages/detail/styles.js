import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	logo: {
		display: 'inline-block',
		marginRight: 15,
	},
	name: {
		fontSize: 30,
		fontWeight: 700,
		marginRight: 10,
		lineHeight: 1.2,
		wordBreak: 'break-word',
	},
	symbol: {
		lineHeight: 1,
		fontSize: 12,
		textTransform: 'uppercase',
		fontWeight: 500,
		color: 'var(--color-sub-txt)',
		padding: '4px 6px',
		borderRadius: 4,
		backgroundColor: 'var(--bg-neutral)',
	},
	rank: {
		lineHeight: 1,
		fontSize: 12,
		backgroundColor: '#858ca2',
		color: '#fff',
		padding: '4px 6px',
		borderRadius: 4,
		marginLeft: 10,
	},
	lbl: {
		color: 'var(--color-sub-txt)',
		fontSize: 13,
		fontWeight: 500,
	},
	price: {
		display: 'flex',
		alignItems: 'center',
		fontSize: 34,
		fontWeight: 700,
	},
	list: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: 20,
		'& .MuiListItem-root': {
			padding: 0,
			width: 'auto',
			marginRight: 10,
			marginBottom: 10,
		},
	},
	link: {
		display: 'flex',
		alignItems: 'center',
		fontSize: 11,
		fontWeight: 700,
		height: 30,
		padding: '6px 2px',
		borderRadius: 6,
		color: 'var(--color-common-txt)',
		backgroundColor: 'var(--bg-neutral)',
		transition: '0.1s ease',
		'&:hover': {
			backgroundColor: 'var(--bg-neutral-1)',
			color: '#fff',
		},
		'& .MuiSvgIcon-root': {
			fontSize: 16,
			margin: '0 5px',
		},
	},
	popover: {
		'& .MuiPaper-root': {
			// padding: 15,
			// zIndex: 999,
			// paddingTop: 10,
			// '&:after': {
			// 	content: '""',
			// 	display: 'inline-block',
			// 	position: 'absolute',
			// 	zIndex: 99999,
			// 	top: '0',
			// 	left: '50%',
			// 	transform: 'translateX(-50%)',
			// 	width: 0,
			// 	height: 0,
			// 	borderStyle: 'solid',
			// 	borderWidth: '0 7px 10px 7px',
			// 	borderColor: 'transparent',
			// 	borderBottomColor: 'var(--bg-dropdown)	'
			// },
			background: 'var(--bg-dropdown)',
			boxShadow: 'var(--shadow-normal) !important',
			'& .MuiList-root': {
				padding: '10px 0',
				background: 'var(--bg-dropdown)',
				// padding: '10px 0',
				// borderTopLeftRadius: 4,
				// borderTopRightRadius: 4,	
			},
		},
	},
	menuItem: {
		padding: '6px 10px',
		fontSize: 12,
		fontWeight: 500,
		backgroundColor: 'transparent !important',
		'&:hover': {
			opacity: 0.8,
		},
		'& .MuiSvgIcon-root': {
			fontSize: 14,
			marginLeft: 5
		},
	},
	tag: {
		fontSize: 11,
		lineHeight: 1,
		marginBottom: 4,
		cursor: 'pointer',
		'&.view-all': {
			
		}
	}
}));

export default useStyles;
