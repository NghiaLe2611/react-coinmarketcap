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
import { dataFromCmcArr } from 'utils/constants';

const ListLink = ({ data, dataFromCmc }) => {
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

	console.log(data);

	return dataFromCmc ? (
		<List className={classes.list}>
			<ListItem>
				<Link href='' className={classes.link}>
					<InsertLinkIcon sx={{ transform: 'rotate(-45deg)' }} />
					{convertLink(data.website[0])}
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
						{data.explorer.length > 0 &&
							data.explorer.map((item) => (
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
						{data.message_board && (
							<MenuItem className={classes.menuItem}>
								{convertLink(data.message_board)} <LaunchIcon />
							</MenuItem>
						)}
						{data.reddit && (
							<MenuItem className={classes.menuItem}>
								{convertLink(data.reddit)} <LaunchIcon />
							</MenuItem>
						)}
					</List>
				</Popover>
			</ListItem>
			<ListItem>
				<Link href={data.source_code} target='_blank' className={classes.link}>
					<CodeIcon /> Source code <LaunchIcon />
				</Link>
			</ListItem>
			<ListItem>
				<Link href={data.technical_doc} target='_blank' className={classes.link}>
					<ArticleIcon /> Whitepaper <LaunchIcon />
				</Link>
			</ListItem>
		</List>
	) : (
		<List className={classes.list}>
			<ListItem>
				<Link href='' className={classes.link}>
					<InsertLinkIcon sx={{ transform: 'rotate(-45deg)' }} /> {convertLink(data.homepage[0])}
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
						{data.blockchain_site.length > 0 &&
							data.blockchain_site.map(
								(item) =>
									item !== '' && (
										<MenuItem key={item} className={classes.menuItem}>
											<Link href={item} target='_blank'>
												{convertLink(item)} <LaunchIcon />
											</Link>
										</MenuItem>
									)
							)}
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
						{data.chat_url.length > 0 &&
							data.chat_url.map(
								(item) =>
									item !== '' && (
										<MenuItem key={item} className={classes.menuItem}>
											<Link href={item} target='_blank'>
												{convertLink(item)} <LaunchIcon />
											</Link>
										</MenuItem>
									)
							)}

						{data.subreddit_url && (
							<MenuItem className={classes.menuItem}>
								{convertLink(data.subreddit_url)} <LaunchIcon />
							</MenuItem>
						)}
					</List>
				</Popover>
			</ListItem>
			{data.repos_url && (
				<ListItem>
					<Link href={data.repos_url.github[0]} target='_blank' className={classes.link}>
						<CodeIcon /> Source code <LaunchIcon />
					</Link>
				</ListItem>
			)}
		</List>
	);
};

export default memo(ListLink);
