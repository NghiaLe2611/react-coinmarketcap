import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	light: {
        background: 'linear-gradient(rgb(248, 250, 253) 0%, rgba(248, 250, 253, 0) 413px)'
    },
    dark: {
        background: 'linear-gradient(rgb(34, 37, 49) 0%, rgba(34, 37, 49, 0) 413px)'  
    }
}));

export default useStyles;