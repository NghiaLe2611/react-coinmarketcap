import { Box, CardMedia, Grid, Link, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';
import { useState } from 'react';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import useCheckScreen from 'hooks/useCheckScreen';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.scss';
import classes from './styles';

const getNews = async () => {
	const data = await coinApi.getNews();
	return data.data.articles;
};

const News = () => {
	const isMobile = useCheckScreen();
	const [page, setPage] = useState(1);

	const {
		data: news,
		isLoading,
		error,
	} = useQuery(
		['list-news'],
		getNews,
		{
			refetchOnWindowFocus: false,
		},
		{
			onSuccess: (res) => {
				console.log(222, res);
			},
		}
	);

	if (isLoading) {
		return (
			<Grid container spacing={3} sx={{ mb: 5 }}>
				{Array(isMobile ? 2 : 5)
					.fill()
					.map((_, i) =>
						isMobile ? (
							<Grid item xs='6' key={i}>
								<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
									<Skeleton variant='rectangular' width={120} height={80} sx={{ mr: 1 }} />
									<Box sx={{flex: 1}}>
										<Skeleton
											variant='rectangular'
											width={'100%'}
											sx={{ mb: 1, fontSize: '0.6rem' }}
										/>
										<Skeleton variant='rectangular' width={'80%'} sx={{ fontSize: '0.5rem' }} />
									</Box>
								</Box>
							</Grid>
						) : (
							<Grid item xs key={i}>
								<Skeleton variant='rectangular' width='100%' height={140} />
								<Skeleton variant='text' sx={{ fontSize: '1.5rem' }} />
							</Grid>
						)
					)}
			</Grid>
		);
	}

	return (
		<Swiper
			className='news-slider'
			navigation={true}
			modules={[Navigation]}
			spaceBetween={20}
			slidesPerView={1.5}
			breakpoints={{
				768: {
					slidesPerView: 2.5,
				},
				1280: {
					slidesPerView: 4.5,
				},
			}}
			// slidesPerView={'auto'}
		>
			{news &&
				news.map((item, index) => (
					<SwiperSlide key={index}>
						<Typography component={Link} href={item.url} target='_blank' sx={classes.innerItem}>
							<CardMedia component='img' image={item.urlToImage} alt={item.title} />
							<Typography variant='h4' sx={classes.title}>
								{item.title}
							</Typography>
						</Typography>
					</SwiperSlide>
				))}
		</Swiper>
	);
};

export default News;
