import { memo, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Link, List, ListItem, MenuItem } from '@mui/material';
import { convertLink } from 'utils/helpers';
import useStyles from './styles';
import LaunchIcon from '@mui/icons-material/Launch';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

const ListLink = ({ data, dataFromCmc }) => {
	const classes = useStyles();
	const [dropdownId, setDropdownId] = useState(null);

	useEffect(() => {
		const handleHover = (e) => {
			if (!e.target.closest('.item-link')) {
				setDropdownId(null);
			}
		};

		if (dropdownId) {
			document.addEventListener('mouseover', handleHover);
		}

		return () => {
			document.removeEventListener('mouseover', handleHover);
		};
	}, [dropdownId]);

	const handlePopoverOpen = (e, id) => {
		setDropdownId(id);
	};

	return dataFromCmc ? (
		<div>
			<List className={classes.list}>
				<ListItem>
					<Link href={data.website[0]} className={classes.link} target='_blank'>
						<InsertLinkIcon sx={{ transform: 'rotate(-45deg)' }} />
						{convertLink(data.website[0])}
						<LaunchIcon />
					</Link>
				</ListItem>
				<ListItem className='item-link'>
					<Button
						className={classes.link}
						onMouseEnter={(e) => handlePopoverOpen(e, 'explorer')}
						data-menu='explorer'>
						<SearchIcon /> Explorers <KeyboardArrowDownIcon />
					</Button>
					<Box className={classes.popover} style={{ display: dropdownId === 'explorer' ? 'block' : 'none' }}>
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
					</Box>
				</ListItem>

				<ListItem className='item-link'>
					<Button
						className={classes.link}
						onMouseOver={(e) => handlePopoverOpen(e, 'community')}
						data-menu='community'>
						<PeopleIcon /> Community <KeyboardArrowDownIcon />
					</Button>
					<Box className={classes.popover} style={{ display: dropdownId === 'community' ? 'block' : 'none' }}>
						<List>
							{data.message_board && (
								<MenuItem className={classes.menuItem}>
									<Link href={data.message_board} target='_blank'>
										{convertLink(data.message_board)} <LaunchIcon />
									</Link>
								</MenuItem>
							)}
							{data.reddit && (
								<MenuItem className={classes.menuItem}>
									<Link href={data.reddit} target='_blank'>
										{convertLink(data.reddit)} <LaunchIcon />
									</Link>
								</MenuItem>
							)}
						</List>
					</Box>
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
		</div>
	) : (
		<List className={classes.list}>
			<ListItem>
				<Link href='' className={classes.link}>
					<InsertLinkIcon sx={{ transform: 'rotate(-45deg)' }} /> {convertLink(data.homepage[0])}
					<LaunchIcon />
				</Link>
			</ListItem>
			<ListItem className='item-link'>
				<Button
					className={classes.link}
					onMouseOver={(e) => handlePopoverOpen(e, 'explorer')}
					data-menu='explorer'>
					<SearchIcon /> Explorers <KeyboardArrowDownIcon />
				</Button>
				<Box className={classes.popover} style={{ display: dropdownId === 'explorer' ? 'block' : 'none' }}>
					<List>
						{data.blockchain_site && data.blockchain_site.length > 0
							? data.blockchain_site.map(
									(item) =>
										item && (
											<MenuItem key={item} className={classes.menuItem}>
												<Link href={item} target='_blank'>
													{convertLink(item)} <LaunchIcon />
												</Link>
											</MenuItem>
										)
							  )
							: null}
					</List>
				</Box>
			</ListItem>

			<ListItem className='item-link'>
				<Button
					className={classes.link}
					onMouseOver={(e) => handlePopoverOpen(e, 'community')}
					data-menu='community'>
					<PeopleIcon /> Community <KeyboardArrowDownIcon />
				</Button>
				<Box className={classes.popover} style={{ display: dropdownId === 'community' ? 'block' : 'none' }}>
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
				</Box>
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

// https://codesandbox.io/s/material-demo-79he1?file=/demo.js:802-814
// https://codesandbox.io/s/dry-thunder-6h9lfx?file=/demo.js