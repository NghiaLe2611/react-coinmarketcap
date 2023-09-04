import {createSlice} from '@reduxjs/toolkit';

const prevTheme = localStorage.getItem('theme');

export const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		darkMode: prevTheme === 'dark' ? true : false,
	},
	reducers: {
		toggleTheme: (state) => {
			state.darkMode = !state.darkMode;
		},
	},
});

export const {toggleTheme} = themeSlice.actions;

export const _isDarkMode = (state) => state.theme.darkMode;

export default themeSlice.reducer;
