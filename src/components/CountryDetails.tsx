import { useEffect, useState } from 'react';
import { API_CONFIG } from '../config/api';
import {
	ArrowLeftIcon,
	MapPinIcon,
	SunIcon,
	CloudIcon,
	ArrowTrendingUpIcon,
	EyeIcon,
} from '@heroicons/react/24/outline';
import { Country } from '../types';
import { useWeather } from '../hooks/useWeather';

interface CountryDetailsProps {
	country: Country;
	onBack: () => void;
}

export default function CountryDetails({
	country,
	onBack,
}: CountryDetailsProps) {
	const {
		weatherData,
		loading: weatherLoading,
		error: weatherError,
		fetchWeatherByCapital,
	} = useWeather();
	const [showMap, setShowMap] = useState(false);

	useEffect(() => {
		if (country.capital && country.capital.length > 0) {
			fetchWeatherByCapital(country.capital[0], country.cca2);
		}
	}, [country, fetchWeatherByCapital]);

	const formatPopulation = (population: number) => {
		return new Intl.NumberFormat().format(population);
	};

	const kelvinToCelsius = (kelvin: number) => {
		return (kelvin - 273.15).toFixed(1);
	};

	const celsiusToFahrenheit = (celsius: number) => {
		return ((celsius * 9) / 5 + 32).toFixed(1);
	};

	const renderWeatherSection = () => {
		if (weatherLoading) {
			return (
				<div className='animate-pulse bg-gray-200 dark:bg-gray-700 h-40 rounded-lg'></div>
			);
		}

		if (weatherError) {
			return (
				<div className='bg-red-50 dark:bg-red-900/20 p-4 rounded-lg'>
					<p className='text-red-600 dark:text-red-400'>
						Failed to load weather data
					</p>
				</div>
			);
		}

		if (!weatherData) {
			return (
				<div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
					<p className='text-gray-500 dark:text-gray-400'>
						No weather data available
					</p>
				</div>
			);
		}

		const tempCelsius = parseFloat(kelvinToCelsius(weatherData.main.temp));
		const tempFahrenheit = parseFloat(celsiusToFahrenheit(tempCelsius));
		const weatherIcon = weatherData.weather[0]?.icon;

		return (
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
				<h3 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>
					Current Weather in {weatherData.name}
				</h3>

				<div className='flex flex-col md:flex-row items-center gap-6'>
					<div className='flex items-center gap-4'>
						{weatherIcon && (
							<img
								src={API_CONFIG.WEATHER.getIconURL(weatherIcon)}
								alt={
									weatherData.weather[0]?.description ||
									'Weather icon'
								}
								className='w-20 h-20'
							/>
						)}
						<div>
							<p className='text-3xl font-bold text-gray-900 dark:text-white'>
								{tempFahrenheit}°F
							</p>
							<p className='text-gray-500 dark:text-gray-400'>
								{tempCelsius}°C
							</p>
							<p className='capitalize text-gray-700 dark:text-gray-300'>
								{weatherData.weather[0]?.description}
							</p>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-4 w-full md:w-auto'>
						<div className='flex items-center gap-2'>
							<CloudIcon className='text-blue-500 h-5 w-5' />
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Humidity
								</p>
								<p className='font-medium text-gray-900 dark:text-white'>
									{weatherData.main.humidity}%
								</p>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<ArrowTrendingUpIcon className='text-blue-500 h-5 w-5' />
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Wind
								</p>
								<p className='font-medium text-gray-900 dark:text-white'>
									{weatherData.wind.speed} m/s
								</p>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<EyeIcon className='text-blue-500 h-5 w-5' />
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Visibility
								</p>
								<p className='font-medium text-gray-900 dark:text-white'>
									{(weatherData.visibility / 1000).toFixed(1)}{' '}
									km
								</p>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<SunIcon className='text-blue-500 h-5 w-5' />
							<div>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Feels like
								</p>
								<p className='font-medium text-gray-900 dark:text-white'>
									{kelvinToCelsius(
										weatherData.main.feels_like,
									)}
									°C
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='animate-fadeIn'>
			<div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
				<button
					onClick={onBack}
					className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
				>
					<ArrowLeftIcon className='h-5 w-5' />
					<span>Back</span>
				</button>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
				<div className='h-64 sm:h-80 lg:h-full overflow-hidden rounded-lg shadow-md'>
					<img
						src={country.flags.svg}
						alt={
							country.flags.alt ||
							`Flag of ${country.name.common}`
						}
						className='w-full h-full object-cover'
					/>
				</div>

				<div>
					<h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
						{country.name.common}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
						<div>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>
									Official Name:
								</span>{' '}
								{country.name.official}
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Population:</span>{' '}
								{formatPopulation(country.population)}
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Region:</span>{' '}
								{country.region}
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Sub Region:</span>{' '}
								{country.subregion || 'N/A'}
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Capital:</span>{' '}
								{country.capital?.join(', ') || 'N/A'}
							</p>
						</div>

						<div>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>
									Top Level Domain:
								</span>{' '}
								{country.tld?.join(', ') || 'N/A'}
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Currencies:</span>{' '}
								{country.currencies
									? Object.values(country.currencies)
											.map(
												(currency) =>
													`${currency.name} (${currency.symbol})`,
											)
											.join(', ')
									: 'N/A'}
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Languages:</span>{' '}
								{country.languages
									? Object.values(country.languages).join(
											', ',
									  )
									: 'N/A'}
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Area:</span>{' '}
								{formatPopulation(country.area)} km²
							</p>
							<p className='text-gray-700 dark:text-gray-300'>
								<span className='font-bold'>Timezones:</span>{' '}
								{country.timezones?.join(', ') || 'N/A'}
							</p>
						</div>
					</div>

					<div className='mt-6'>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							<span className='font-bold'>Border Countries:</span>
						</p>
						<div className='flex flex-wrap gap-2'>
							{country.borders?.length > 0 ? (
								country.borders.map((border) => (
									<span
										key={border}
										className='px-3 py-1 bg-white dark:bg-gray-800 shadow-sm rounded-full text-sm text-gray-700 dark:text-gray-300'
									>
										{border}
									</span>
								))
							) : (
								<span className='text-gray-500 dark:text-gray-400'>
									No bordering countries
								</span>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='space-y-8'>
				<div className='mb-6'>
					<h3 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>
						Weather Information
					</h3>
					{renderWeatherSection()}
				</div>

				<div>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white'>
							Map
						</h3>
						<button
							onClick={() => setShowMap(!showMap)}
							className='flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
						>
							<MapPinIcon className='h-4 w-4' />
							<span>{showMap ? 'Hide Map' : 'Show Map'}</span>
						</button>
					</div>

					{showMap && (
						<div className='h-96 rounded-lg overflow-hidden shadow-md'>
							<iframe
								title={`Map of ${country.name.common}`}
								width='100%'
								height='100%'
								frameBorder='0'
								src={`${API_CONFIG.GOOGLE_MAP.BASE_URL}?key=${API_CONFIG.GOOGLE_MAP.API_KEY}&q=${country.name.common}`}
								allowFullScreen
							></iframe>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
