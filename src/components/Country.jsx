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
		<>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h3>languages:</h3>
			<ul>
				{Object.values(country.languages).map((language, i) => (
					<li key={i}>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt={`Flag of ${country.name.common}`}
				width='150'
			/>
			{weather && (
				<>
					<h3>Weather in {country.capital}</h3>
					<p>
						<strong>temperature:</strong> {weather.main.temp}{' '}
						Celsius
					</p>
					<img src={icon} alt='Weather icon' width='100' />
					<p>
						<strong>wind:</strong> {weather.wind.speed} m/s
					</p>
				</>
			)}
		</>
	);
};
