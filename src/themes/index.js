import { createTheme } from '@mui/material';
import themePalette from './palette';
import componentStyleOverrides from './stylesOverride';

const typography = {
	fontFamily: ['Inter', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
};

export const theme = (themeMode) => {

    const themeOptions = {
        palette: themePalette(themeMode),
        typography: typography,
        mixins: {
            
        },
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOptions);

    // console.log(themes);
    return themes;
};

export default theme;