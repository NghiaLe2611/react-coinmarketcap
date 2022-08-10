const classes = {
	title: {
        fontSize: 12,
        fontWeight: 700,
        '@media (min-width: 1280px)': {
            fontSize: 14
        }
    },
    innerItem: {
        '& img': {
            marginBottom: '5px',
            height: '80px',
            width: '100%',
            objectFit: 'contain',
            '@media (min-width: 1280px)': {
                height: '140px'
            }
        }
    },
    newsSlider: {
        background: 'red'
    }
};

export default classes;
