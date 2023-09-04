import { memo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BoxFlex } from 'components/common';
import { dataFromCmcArr } from 'utils/constants';
import ListLink from './ListLink';
import ListTag from './ListTag';
import useStyles from './styles';

const BoxLeft = ({ data, id }) => {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={6} lg={4}>
			<BoxFlex pt={2}>
				<img src={data.image['small']} alt={data.name} className={classes.logo} width={30} />
				<Typography className={classes.name}>{data.name}</Typography>
				<Typography className={classes.symbol}>{data.symbol}</Typography>
				<Typography className={classes.rank}>Rank #{data.market_cap_rank}</Typography>
			</BoxFlex>
			{dataFromCmcArr.includes(id) ? (
				<Box>
					<ListLink data={data.urls} dataFromCmc={dataFromCmcArr.includes(id)} />
					{data.tags.length > 0 && (
						<ListTag data={data.tags} coin={data.name} algorithm={data.hashing_algorithm} />
					)}
				</Box>
			) : (
				<Box>
					<ListLink data={data.links} dataFromCmc={dataFromCmcArr.includes(id)} />
					{data.categories.length > 0 && (
						<ListTag data={data.categories} coin={data.name} algorithm={data.hashing_algorithm} />
					)}
				</Box>
			)}
		</Grid>
	);
};

export default memo(BoxLeft);
