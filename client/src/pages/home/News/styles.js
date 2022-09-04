const classes = {
	title: {
        fontSize: 12,
        fontWeight: 700,
        '@media (min-width: 1280px)': {
            fontSize: 14
        }
    },
    innerItem: {
        '@media (max-width: 768px)': {
            display: 'flex',
            '& img': {
                marginRight: 1
            }
        },
        '& img': {
            marginBottom: '5px',
            height: '80px',
            maxWidth: '120px',
            // width: '100%',
            // objectFit: 'contain',
            '@media (min-width: 1280px)': {
                maxWidth: 'inherit',
                objectFit: 'contain',
                width: '280px',
                height: '140px',
            }
        }
    },
    newsSlider: {
        background: 'red'
    }
};

export default classes;
