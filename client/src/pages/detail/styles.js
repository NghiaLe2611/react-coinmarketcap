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
		'& .MuiTypography-root': {
			fontSize: 34,
			fontWeight: 700,
			minWidth: 200
		}
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
		padding: '6px 20px',
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
		fontWeight: 700,
		color: 'var(--color-sub-txt)',
		marginBottom: 4,
		height: 20,
		lineHeight: '20px',
		cursor: 'pointer',
		margin: '0 5px 5px 0 !important',
		'& .MuiChip-label': {
			padding: '4px 10px',
			'& a': {
				color: 'var(--color-sub-txt)'
			}
		},
		'&.view-all': {
			backgroundColor: 'var(--bg-lightblue)',
			color: 'var(--color-primary)'
		}
	},
	priceStats: {
		display: 'flex',
		alignItems: 'center',
		'& *': {
			fontSize: 13,
		},
		'& .lbl': {
			color: 'var(--color-sub-txt)',
			marginRight: 5
		},
		'& .val': {
			fontWeight: 700,
		},
		'@media (min-width: 1024px)': {
			'& .box': {
				display: 'flex'
			}
		}
	},
	priceBar: {
		backgroundColor: 'var(--bg-control)',
		height: 6,
		width: 160,
		borderRadius: 4
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
			color: 'var(--bg-neutral-3)'
		}
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
				color: 'var(--bg-neutral-2)'
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
		color: 'var(--color-sub-txt)',
		fontWeight: 500,
		marginBottom: 10
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
				fontSize: 12,
				fontWeight: 500,
				color: 'var(--color-sub-txt)',
				minWidth: 90
			},
			'& .val': {
				fontSize: 12,
				fontWeight: 700,
				color: 'var(--color-common-txt)'
			},
			'& .supply': {
				fontSize: 12,
				fontWeight: 500,
				color: 'var(--color-sub-txt)',
			}
		},
	},
	
	wrapTitle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 30
	},

	h4: {
		fontSize: 18,
		fontWeight: 700,
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
			color: 'var(--color-common-txt)',
			'&:not(:last-child)': {
				marginRight: 4
			},
			'&.Mui-selected': {
				backgroundColor: 'var(--bg-box)',
				borderRadius: 6
			}
		}
	},

	btn: {
		borderRadius: '12px !important'
	},

	// Statistics
	listStats: {
		padding: 20,
		'& .MuiListItem-root': {
			padding: 0,
			marginBottom: 15,
			paddingBottom: 15,
			borderBottom: '1px solid var(--border-table)',
			'& .MuiTypography-root': {
				fontSize: 14,
				fontWeight: 500,
				'&.right': {
					marginLeft: 'auto',
					fontWeight: 700,
					textAlign: 'right'
				}
			},
			'& .right': {
				marginLeft: 'auto',
				textAlign: 'right',
				'& p': {
					fontWeight: 700,
				}
			}
		}
	},

}));

export default useStyles;
