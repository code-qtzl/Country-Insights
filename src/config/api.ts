export const API_CONFIG = {
	COUNTRIES: {
		REST_COUNTRIES_URL: 'https://studies.cs.helsinki.fi/restcountries',
		BASE_URL: 'https://studies.cs.helsinki.fi/restcountries',
		ENDPOINTS: {
			ALL: '/api/all',
		},
	},
	WEATHER: {
		SITE_URL: 'https://openweathermap.org/api',
		BASE_URL: 'https://api.openweathermap.org/data/2.5',
		API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
		ENDPOINTS: {
			WEATHER: '/weather',
		},
		getWeatherURL: {
			byCoordinates: (lat: number, lon: number) => {
				return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG.WEATHER.API_KEY}&units=metric`;
			},
			byCity: (city: string, country: string) => {
				return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_CONFIG.WEATHER.API_KEY}&units=metric`;
			},
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
