import {memo} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loader = ({ open, backdrop = true, style }) => {
	return backdrop === false ? (
		<Box sx={style}>
			<CircularProgress color='inherit' />
		</Box>
	) : (
		<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
			<CircularProgress color='inherit' />
		</Backdrop>
	);
};

export default memo(Loader);
