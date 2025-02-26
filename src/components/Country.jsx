/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Country = ({ country }) => {
	const [weather, setWeather] = useState(null);
	const [icon, setIcon] = useState('');

	useEffect(() => {
		const API_KEY = import.meta.env.VITE_SOME_KEY;
		const lat = country.latlng[0];
		const lng = country.latlng[1];
		const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;

		axios
			.get(baseUrl)
			.then((response) => {
				setWeather(response.data);

				const iconCode = response.data.weather[0].icon;
				const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
				setIcon(iconURL);
			})
			.catch((error) => {
				console.error('Error fetching weather:', error);
			});
	}, [country.latlng]);

	return (
		<div className='bg-white rounded-lg shadow-md p-6'>
			<h2 className='text-2xl font-bold mb-4'>{country.name.common}</h2>
			<p className='mb-2'>
				<span className='font-semibold'>Capital:</span>{' '}
				{country.capital}
			</p>
			<p className='mb-2'>
				<span className='font-semibold'>Area:</span> {country.area} km²
			</p>
			<h3 className='text-lg font-semibold mt-4 mb-2'>Languages:</h3>
			<ul className='list-disc list-inside mb-4'>
				{Object.values(country.languages).map((language, i) => (
					<li key={i}>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt={`Flag of ${country.name.common}`}
				className='w-48 h-auto mb-4 rounded'
			/>
			{weather && (
				<div className='mt-4'>
					<h3 className='text-lg font-semibold mb-2'>
						Weather in {country.capital}
					</h3>
					<p className='mb-2'>
						<span className='font-semibold'>Temperature:</span>{' '}
						{weather.main.temp} °C
					</p>
					<div className='flex items-center mb-2'>
						<img
							src={icon}
							alt='Weather icon'
							className='w-12 h-12 mr-2'
						/>
						<p className='font-semibold'>
							{weather.weather[0].description}
						</p>
					</div>
					<p className='mb-2'>
						<span className='font-semibold'>Wind:</span>{' '}
						{weather.wind.speed} m/s
					</p>
				</div>
			)}
		</div>
	);
};
