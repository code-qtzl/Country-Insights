export const API_CONFIG = {
	COUNTRIES: {
		BASE_URL: 'https://studies.cs.helsinki.fi/restcountries',
		ENDPOINTS: {
			ALL: '/api/all',
		},
	},
	WEATHER: {
		BASE_URL: 'https://api.openweathermap.org',
		ENDPOINTS: {
			WEATHER: '/data/2.5/weather',
			ICON_URL: 'https://openweathermap.org/img/wn',
		},
		getIconURL: (icon: string) => {
			return `https://openweathermap.org/img/wn/${icon}@2x.png`;
		},
	},
	GOOGLE_MAP: {
		BASE_URL: 'https://www.google.com/maps/embed/v1/place',
		API_KEY: import.meta.env.VITE_MAPS_API_KEY,
	} as const,
};
