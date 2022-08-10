import { createTheme } from '@mui/material';
import themePalette from './palette';

const typography = {
	fontFamily: ['Inter', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
};

export const theme = (themeMode) => {

    const themeOptions = {
        palette: themePalette(themeMode),
        typography: typography
    };

    const themes = createTheme(themeOptions);
    // themes.components = componentStyleOverrides(themeOption);

    // console.log(themes);
    return themes;
};

export default theme;