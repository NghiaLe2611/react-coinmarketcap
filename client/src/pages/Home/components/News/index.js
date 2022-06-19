import { useEffect, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation} from 'swiper'; // import required modules
import 'swiper/css';
import "swiper/css/navigation";
import './slider.scss';
import coinApi from '../../../../api/coinApi';
import { Link as RouterLink } from 'react-router-dom';
import {Box, CardMedia, IconButton, Link, List, ListItem, Popover, Typography} from '@mui/material';
import classes from './styles';

const News = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchNews() {
            const response = await coinApi.getNews();
            if (response.data) {
                setNews(response.data.articles);
            }
        }
        fetchNews();
    }, []);

	return (
		<Swiper className='news-slider'
			navigation={true}
			modules={[Navigation]}
			spaceBetween={25}
			slidesPerView={'auto'}>
			{news.map((item, index) => (
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
