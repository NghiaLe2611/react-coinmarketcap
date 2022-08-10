import { useState } from 'react';
import { Grid, CardMedia, Typography, Link, Skeleton, Box  } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import coinApi from 'api/coinApi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import "swiper/css/navigation";
import './slider.scss';
import classes from './styles';

const getNews = async () => {
	const data = await coinApi.getNews();
	return data.data.articles;
};

const News = () => {
    // const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
	
	const { data: news, isLoading, error } = useQuery(['list-news'], getNews, {
		onSuccess: (res) => {
			console.log(222, res);
		}
	});
	
	if (isLoading) {
		return (
			<Grid container spacing={3} sx={{mb: 5}}>
				{Array(5)
					.fill()
					.map((i) => (
						<Grid item xs key={i}>
							<Skeleton variant='rectangular' width="100%" height={140} />
							<Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
						</Grid>
					))}
			</Grid>
		);
	};

	return (
		<Swiper className='news-slider'
			navigation={true}
			modules={[Navigation]}
			spaceBetween={25}
			slidesPerView={'auto'}>
			{news && news.map((item, index) => (
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
