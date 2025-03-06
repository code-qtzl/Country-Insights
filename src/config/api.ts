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
		},
	},
} as const;
