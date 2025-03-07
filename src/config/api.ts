export const API_CONFIG = {
	COUNTRIES: {
		BASE_URL: 'https://studies.cs.helsinki.fi/restcountries',
		ENDPOINTS: {
			ALL: '/api/all',
		},
	},
	WEATHER: {
		BASE_URL: 'https://api.openweathermap.org/data/2.5',
		ENDPOINTS: {
			WEATHER: '/weather',
		},
		getWeatherURL: {
			byCoordinates: (lat: number, lon: number, apiKey: string) => {
				return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
			},
			byCity: (city: string, country: string, apiKey: string) => {
				return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
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
