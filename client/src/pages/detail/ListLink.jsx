import { memo, useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LaunchIcon from '@mui/icons-material/Launch';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Link, List, ListItem, Menu, MenuItem, Popover } from '@mui/material';
import useStyles from './styles';
import { useEffect } from 'react';
import { convertLink } from 'utils/helpers';

const ListLink = ({ data }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [dropdownId, setDropdownId] = useState(null);

	useEffect(() => {
		const handleHover = (e) => {
			const backdrop = e.target.classList.contains('MuiBackdrop-root');
			if (dropdownId && backdrop) {
				setAnchorEl(null);
				setDropdownId(null);
			}
		};

		document.addEventListener('mouseover', handleHover);

		return () => {
			document.removeEventListener('mouseover', handleHover);
		};
	}, [dropdownId]);

	const handlePopoverOpen = (e, id) => {
		setAnchorEl(e.currentTarget);
		setDropdownId(id);
	};

	return (
		<List className={classes.list}>
			<ListItem>
				<Link href='' className={classes.link}>
					<InsertLinkIcon sx={{ transform: 'rotate(-45deg)' }} /> {convertLink(data.urls.website)}{' '}
					<LaunchIcon />
				</Link>
			</ListItem>
			<ListItem>
				<Button
					sx={{ zIndex: 1302, position: 'relative' }}
					className={classes.link}
					onMouseOver={(e) => handlePopoverOpen(e, 'explorer')}
					data-menu='explorer'>
					<SearchIcon /> Explorers <KeyboardArrowDownIcon />
				</Button>
				<Popover
					id='explorer'
					// keepMounted
					className={classes.popover}
					open={dropdownId === 'explorer'}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}>
					<List>
						{data.urls.explorer.length > 0 &&
							data.urls.explorer.map((item) => (
								<MenuItem key={item} className={classes.menuItem}>
									<Link href={item} target='_blank'>
										{convertLink(item)} <LaunchIcon />
									</Link>
								</MenuItem>
							))}
					</List>
				</Popover>
			</ListItem>
			<ListItem>
				<Button
					sx={{ zIndex: 1302, position: 'relative' }}
					className={classes.link}
					onMouseOver={(e) => handlePopoverOpen(e, 'community')}
					data-menu='community'>
					<PeopleIcon /> Community <KeyboardArrowDownIcon />
				</Button>
				<Popover
					id='community'
					className={classes.popover}
					open={dropdownId === 'community'}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}>
					<List>
						{data.urls.message_board && (
							<MenuItem className={classes.menuItem}>
								{data.urls.message_board} <LaunchIcon />
							</MenuItem>
						)}
						{data.urls.reddit && (
							<MenuItem className={classes.menuItem}>
								{data.urls.reddit} <LaunchIcon />
							</MenuItem>
						)}
					</List>
				</Popover>
			</ListItem>
			<ListItem>
				<Link href={data.urls.source_code} target='_blank' className={classes.link}>
					<CodeIcon /> Source code <LaunchIcon />
				</Link>
			</ListItem>
			<ListItem>
				<Link href={data.urls.technical_doc} target='_blank' className={classes.link}>
					<ArticleIcon /> Whitepaper <LaunchIcon />
				</Link>
			</ListItem>
		</List>
	);
};

export default memo(ListLink);
