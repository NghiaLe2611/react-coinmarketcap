import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { memo, useState } from 'react';
import useStyles from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { formatCategoryName } from 'utils/helpers';

const ListTag = ({ coin, algorithm, data }) => {
	const classes = useStyles();
    const [open, setOpen] = useState(false);

    const showFullTags = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

	return (
		<>
			<Stack direction='row' flexWrap='wrap' spacing={1}>
				{data.slice(0, 4).map((tag) => (
					<Chip
						key={tag}
						label={<Link to={`/category/${formatCategoryName(tag)}`}>{tag}</Link>}
						className={classes.tag}
					/>
				))}
				{data.length > 1 && (
					<Chip label='View all' className={`${classes.tag} view-all`} onClick={showFullTags} />
				)}
			</Stack>

			<Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 500, borderRadius: 6 } }}>
				<DialogTitle className={classes.dialogTitle}>
					{coin} Tags
					<IconButton aria-label='close' onClick={handleClose} className='close'>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Box mb={1}>
						<Typography className={classes.dialogLbl}>Algorithm</Typography>
						{algorithm && (
							<Stack className={classes.tags} direction='row' spacing={1}>
								<Chip label={algorithm} className={classes.tag} />
							</Stack>
						)}
					</Box>
					<Box>
						<Typography className={classes.dialogLbl}>Category</Typography>
						<Stack className={classes.tags} direction='row' spacing={1}>
							{data.map((tag) => (
								<Chip
									key={tag}
									label={<Link to={`/category/${formatCategoryName(tag)}`}>{tag}</Link>}
									className={classes.tag}
								/>
							))}
						</Stack>
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default memo(ListTag);
