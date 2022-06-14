import { makeStyles, withStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
		
	},
	header: {
        "@media (max-width: 1280px)": {
            flexDirection: 'column-reverse'
        }
	},
	navbar: {
		borderBottom: '1px solid #eff2f5'
	},
    logo: {
		marginRight: 30,
        lineHeight: 1
	},
	listTop: {
		display: 'flex',
        "@media (max-width: 1280px)": {
            overflow: 'auto hidden',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }
	},
    listItem: {
        width: 'inherit',
        marginRight: 18
    },
    itemText: {
        fontSize: 11,
        fontWeight: 500,
        color: '#58667e',
        "@media (min-width: 1280px)": {
            fontSize: 12,
        }
    },
    txtBlue: {
        color: '#3862fa',
    },
    menuItem: {
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        height: 48,
        transition: 'all 0.2s ease 0s',
        borderBottom: '1px solid #eff2f5',
        color: '#000',
        '& span': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 15,
            fontWeight: 500
        },
        '& a, & p': {
            color: '#000',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 500
        },
        "@media (min-width: 1280px)": {
            marginRight: 25,
            borderBottom: 0,
            '&:hover a, &:hover p': {
                color: '#3862fa'
            },
        }
		// textTransform: 'capitalize',
		// marginRight: 15,
		// '&:hover': {
		// 	backgroundColor: 'transparent',
		// 	color: '#3862fa',
		// },
        // "@media (max-width: 1280px)": {
        //     marginRight: 0,
        //     display: 'flex',
        //     height: 48,
        //     justifyContent: 'flex-start',
        //     transition: 'all 0.2s ease 0s',
        //     borderBottom: '1px solid #eff2f5'
        // }
    },
    subMenuContainer: {
        // transition: 'max-height 0.36s ease-out',
        overflowY: 'hidden',
        maxHeight: 0
    },
    subMenuList: {
        padding: '5px 10px',
    },
    subMenuItem: {
        // textTransform: 'capitalize',
        padding: '10px 0',
        '& a': {
            display: 'flex',
            alignItems: 'center',
            color: '#000',
            fontSize: 15,
            '& img': {
                marginRight: 10
            }
        }
    },
    iconToggle: {
        transition: 'all 0.36s ease 0s'
    },
    selectLang: {
        fontSize: 13,
        "&:focus": {
			backgroundColor: "yellow"
		}
    },
    menuHeading: {
        display: 'flex',
        alignItesm: 'center',
        justifyContent: 'space-between',
        height: 60,
        padding: '0 16px',
        boxShadow: 'rgb(128 138 157 / 12%) 0px 8px 32px, rgb(128 138 157 / 8%) 0px 1px 2px',
        '& a': {
            display: 'flex',
            alignItems: 'center',
        }
    }
}));

export default useStyles;