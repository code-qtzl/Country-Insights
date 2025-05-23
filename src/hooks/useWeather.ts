import { useState, useCallback } from 'react';
import { API_CONFIG } from '../config/api';
import { WeatherData } from '../types';

export const useWeather = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchWeatherData = useCallback(async (url: string) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch weather data: ${response.status}`,
				);
			}

			const data: WeatherData = await response.json();
			setWeatherData(data);
			return data;
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'An unknown error occurred',
			);
			console.error('Error fetching weather data:', err);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchWeather = useCallback(
		async (lat: number, lon: number) => {
			const url = API_CONFIG.WEATHER.getWeatherURL.byCoordinates(
				lat,
				lon,
			);
			return fetchWeatherData(url);
		},
		[fetchWeatherData],
	);

	const fetchWeatherByCapital = useCallback(
		async (capital: string, country: string) => {
			const url = API_CONFIG.WEATHER.getWeatherURL.byCity(
				capital,
				country,
			);
			return fetchWeatherData(url);
		},
		[fetchWeatherData],
	);

	const clearWeather = useCallback(() => {
		setWeatherData(null);
		setError(null);
	}, []);

	return {
		weatherData,
		loading,
		error,
		fetchWeather,
		fetchWeatherByCapital,
		clearWeather,
	};
};
