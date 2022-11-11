import { makeStyles } from '@mui/styles';

const colorSubTxt = 'var(--color-sub-txt)';

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
		color: colorSubTxt,
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
		color: colorSubTxt,
		fontSize: 13,
		fontWeight: 500,
	},
	price: {
		display: 'flex',
		alignItems: 'center',
		'& .MuiTypography-root': {
			fontSize: 34,
			fontWeight: 700,
			minWidth: 200,
		},
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
		borderRadius: 12,
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
			borderRadius: 8,
			background: 'var(--bg-dropdown)',
			boxShadow: 'var(--shadow-normal) !important',
			'& .MuiList-root': {
				padding: '10px 0',
				background: 'var(--bg-dropdown)',
			},
		},
	},
	menuItem: {
		padding: '6px 20px',
		fontSize: 12,
		fontWeight: 500,
		backgroundColor: 'transparent !important',
		'&:hover': {
			opacity: 0.8,
		},
		'& .MuiSvgIcon-root': {
			fontSize: 14,
			marginLeft: 5,
		},
		'& a': {
			display: 'flex',
			alignItems: 'center',
		},
	},
	tag: {
		fontSize: 11,
		fontWeight: 700,
		color: colorSubTxt,
		marginBottom: 4,
		height: 20,
		lineHeight: '20px',
		cursor: 'pointer',
		margin: '0 5px 5px 0 !important',
		'& .MuiChip-label': {
			padding: '4px 10px',
			'& a': {
				color: colorSubTxt,
			},
		},
		'&.view-all': {
			backgroundColor: 'var(--bg-lightblue)',
			color: 'var(--color-primary)',
		},
	},
	priceStats: {
		display: 'flex',
		alignItems: 'center',
		'& *': {
			fontSize: 13,
		},
		'& .lbl': {
			color: colorSubTxt,
			marginRight: 5,
		},
		'& .val': {
			fontWeight: 700,
		},
		'@media (min-width: 1024px)': {
			'& .box': {
				display: 'flex',
			},
		},
	},
	priceBar: {
		backgroundColor: 'var(--bg-control)',
		height: 6,
		width: 160,
		borderRadius: 4,
	},
	percent: {
		display: 'flex',
		height: '100%',
		backgroundColor: 'var(--bg-neutral-3)',
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4,
		position: 'relative',
		'& .icon': {
			position: 'absolute',
			right: -12,
			fontSize: '1.5rem',
			color: 'var(--bg-neutral-3)',
		},
	},

	mainContent: {
		borderTop: '1px solid var(--bg-neutral)',
		marginLeft: '0 !important',
		paddingLeft: '0 !important',
	},

	// Dialog
	dialogTitle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: 'var(--color-common-txt)',
		fontSize: 16,
		'& .close': {
			backgroundColor: 'transparent !important',
			'& .MuiSvgIcon-root': {
				fontSize: '1.2rem',
				fontWeight: 700,
				color: 'var(--bg-neutral-2)',
			},
		},
	},
	tags: {
		flexWrap: 'wrap',
		// '& .MuiChip-root': {
		// 	margin: '0 6px 6px 0'
		// }
	},
	dialogLbl: {
		fontSize: 13,
		color: colorSubTxt,
		fontWeight: 500,
		marginBottom: 10,
	},

	// Overall stats
	overallStats: {
		marginTop: 20,
		paddingTop: 20,
		borderTop: '1px solid var(--bg-neutral)',
		display: 'flex',
		flexWrap: 'wrap',
		'@media (min-width: 1200px)': {
			'& .MuiGrid-item:not(:last-child)': {
				borderRight: '1px solid var(--bg-neutral)',
			},
		},
		'& .item': {
			'& .stats-lbl': {
				display: 'flex',
				alignItems: 'center',
				fontSize: 12,
				fontWeight: 500,
				color: colorSubTxt,
				minWidth: 90,
				'& .MuiSvgIcon-root': {
					fontSize: 14,
					marginLeft: 5,
				},
			},
			'& .val': {
				fontSize: 12,
				fontWeight: 700,
				color: 'var(--color-common-txt)',
			},
			'& .supply': {
				fontSize: 12,
				fontWeight: 500,
				color: colorSubTxt,
			},
		},
	},

	// Tooltip
	tooltip: {
		maxWidth: 300,
		padding: 15,
		fontSize: 12,
		color: colorSubTxt,
		backgroundColor: 'var(--bg-dropdown)',
		boxShadow: 'var(--shadow-normal) !important',
	},
	arrow: {
		color: 'var(--bg-dropdown)',
	},

	wrapTitle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 30,
	},

	h3: {
		fontSize: 24,
		fontWeight: 700,
		marginBottom: 25,
	},

	h4: {
		fontSize: 18,
		fontWeight: 700,
	},

	desc: {
		fontSize: 15,
		'& a': {
			color: 'var(--color-primary) !important',
		},
	},

	// Tabs
	tabs: {
		display: 'inline-flex',
		backgroundColor: 'var(--bg-neutral-4)',
		minHeight: 'inherit',
		padding: 6,
		borderRadius: 6,
		border: '1px solid var(--border-table)',
		marginBottom: 20,
		'& .MuiTab-root': {
			lineHeight: 1,
			fontSize: 12,
			textTransform: 'capitalize',
			padding: 5,
			minHeight: 'inherit',
			color: 'var(--color-sub-txt)',
			'&:not(:last-child)': {
				marginRight: 4,
			},
			'&.Mui-selected': {
				backgroundColor: 'var(--bg-box)',
				borderRadius: 6,
			},
		},
	},

	btn: {
		borderRadius: '12px !important',
	},

	dotPrice: {
		width: 10,
		height: 10,
		borderRadius: '50%',
		border: '1px solid #fff'
	},

	// Statistics
	listStats: {
		padding: 0,
		'& .MuiListItem-root': {
			padding: 0,
			marginBottom: 15,
			paddingBottom: 15,
			'&:not(:last-child)': {
				borderBottom: '1px solid var(--border-table)',
			},
			'& .MuiTypography-root': {
				fontSize: 14,
				fontWeight: 500,
				'&.right': {
					marginLeft: 'auto',
					fontWeight: 700,
					textAlign: 'right',
				},
			},
			'& .MuiTypography-small': {
				fontSize: 12
			},
			'& .right': {
				marginLeft: 'auto',
				textAlign: 'right',
				'& p': {
					fontWeight: 700,
				},
			},
		},
	},

	// Loading
	overlayWrapper: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backdropFilter: 'blur(6px)',
		backgroundColor: 'rgba(255,255,255,0	)',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		zIndex: 3,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	overlayContent: {
		position: 'absolute',
		padding: 20,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		zIndex: 3,
		textAlign: 'center',
	},

	// Converter
	converter: {
		border: '1px solid var(--border-table)',
		backgroundColor: 'var(--bg-neutral-5)',
		borderRadius: 16,
		position: 'relative',
		'@media (min-width: 1024px)': {
			display: 'flex',
			'& .content': {
				width: '50%',
			},
		},
		'& .content': {
			display: 'flex',
			flexWrap: 'wrap',
			alignItems: 'center',
			padding: '20px 30px',
			'& .input': {
				flex: 1,
				'& fieldset': {
					border: 'none !important',
				},
				'& input': {
					textAlign: 'right',
					fontWeight: 700,
				},
			},
			'&:first-child': {
				backgroundColor: 'var(--bg-drawer)',
				borderTopLeftRadius: 16,
				borderBottomLeftRadius: 16,
			},
			'&:last-child': {
				borderTopRightRadius: 16,
				borderBottomRightRadius: 16,
			},
		},
		'& .item': {
			display: 'flex',
			alignItems: 'center',
			marginRight: 20,

			'& img': {
				marginRight: 10,
			},
			'& .symbol': {
				fontSize: 12,
			},
			'& .name': {
				fontSize: 15,
				fontWeight: 700,
				whiteSpace: 'nowrap',
			},
		},
		'& .btn-swap': {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%,-50%)',
			backgroundColor: '#eff2f5',
			padding: 4,
			'& .MuiSvgIcon-root': {
				color: '#858ca2',
			},
		},
	},

	btnMore: {
		color: 'var(--color-common-txt)',
		backgroundColor: 'var(--bg-neutral)',
		boxShadow: 'none !important',
		'&:hover': {
			backgroundColor: 'var(--bg-neutral-6)'
		}
	}
}));

export default useStyles;
