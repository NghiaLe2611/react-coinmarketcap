import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	logo: {
        display: 'inline-block',
		marginRight: 15
	},
	name: {
        fontSize: 34,
        fontWeight: 700,
        marginRight: 10
    },
	symbol: {
        lineHeight: 1,
		fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 500,
        color: 'var(--color-sub-txt)',
        padding: '4px 6px',
        borderRadius: 4,
        backgroundColor: 'var(--bg-neutral)'
	},
    rank: {
        lineHeight: 1,
        fontSize: 12,
        backgroundColor: '#858ca2',
        color: '#fff',
        padding: '4px 6px',
        borderRadius: 4,
        marginLeft: 10
    },
    lbl: {
        color: 'var(--color-sub-txt)',
        fontSize: 13
    },
    price: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 34,
        fontWeight: 700,
    }
}));

export default useStyles;
