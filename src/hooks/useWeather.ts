import { useState, useCallback } from 'react';
import { WeatherData } from '../types';

// environment variable
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeather = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchWeather = useCallback(async (lat: number, lon: number) => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
			);

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

	const fetchWeatherByCapital = useCallback(
		async (capital: string, country: string) => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${capital},${country}&appid=${API_KEY}&units=metric`,
				);

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
		},
		[],
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
