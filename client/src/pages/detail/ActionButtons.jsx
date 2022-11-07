import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import useStyles from './styles';

const ActionButtons = ({ onShowFullScreen, onDownloadImage }) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleOpenMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

    const handleDownloadImage = (type) => {
        onDownloadImage(type);
        handleClose();
    }

	return (
		<Box display='flex' alignItems='center'>
			<IconButton className={classes.btn} onClick={onShowFullScreen}>
				<FullscreenIcon />
			</IconButton>
			<IconButton className={classes.btn} onClick={handleOpenMenu}>
				<MoreHorizIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				sx={{
					'& li': {
						fontSize: 13,
						fontWeight: 500,
					},
				}}>
				<MenuItem onClick={() => handleDownloadImage('png')}>Download PNG Image</MenuItem>
				<MenuItem onClick={() => handleDownloadImage('jpeg')}>Download JPEG Image</MenuItem>
			</Menu>
		</Box>
	);
};

export default ActionButtons;
