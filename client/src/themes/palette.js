export default function themePalette(themeMode) {
	if (themeMode === 'dark') {
		return {
			mode: 'dark',
			background: {
				default: '#17171a',
			},
			text: {
				primary: '#fff',
			},
		};
	}

	return {
		mode: 'light',
		text: {
			primary: '#000',
		},
	};
}
