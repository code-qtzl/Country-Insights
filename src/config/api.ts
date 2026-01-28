export const API_CONFIG = {
	COUNTRIES: {
		REST_COUNTRIES_URL: 'https://restcountries.com/v3.1',
		BASE_URL: 'https://restcountries.com/v3.1',
		ENDPOINTS: {
			ALL: '/all?fields=name,tld,cca2,ccn3,cca3,cioc,independent,status,unMember,currencies,idd,capital,altSpellings,region,subregion,languages,translations,latlng,landlocked,borders,area,demonyms,flag,maps,population,gini,fifa,car,timezones,continents,flags,coatOfArms,startOfWeek,capitalInfo,postalCode',
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
