import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    logo: {
        display: 'inline-block',
        '@media (max-width: 1280px)': {
			marginBottom: '30px'
		},
    },
    heading: {
       fontWeight: 700,
       fontSize: 16
    },
    list: {
        marginBottom: 30
    }
}));

export default useStyles;