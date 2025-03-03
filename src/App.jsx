/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Search } from './components/Search';
import { Country } from './components/Country';
import { Countries } from './components/Countries';

const App = () => {
	const [searchFilter, setSearchFilter] = useState('');
	const [countries, setCountries] = useState([]);
	const [darkMode, setDarkMode] = useState(false);
	const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

	useEffect(() => {
		localStorage.setItem('darkMode', darkMode);

		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	useEffect(() => {
		axios
			.get(baseUrl)
			.then((response) => {
				setCountries(response.data);
			})
			.catch((error) => {
				console.error('Error fetching countries:', error);
			});
	}, []);

	const handleSearchFilter = (event) => {
		setSearchFilter(event.target.value);
	};

	const countriesFiltered = countries.filter((country) =>
		country.name.common.toLowerCase().includes(searchFilter.toLowerCase()),
	);

	const showCountryData = countriesFiltered.length === 1;

	const handleShow = (id) => {
		const country = countriesFiltered.find(
			(country) => country.ccn3 === id,
		);
		if (country) {
			setSearchFilter(country.name.common);
		}
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<div className='container mx-auto p-4 dark:bg-gray-900 dark:text-white'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
					Country Insights
				</h1>
				<button
					onClick={toggleDarkMode}
					className='bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					{darkMode ? 'Light Mode' : 'Dark Mode'}
				</button>
			</div>
			<Search
				text={'Filter countries:'}
				value={searchFilter}
				onChange={handleSearchFilter}
			/>
			{showCountryData ? (
				<Country country={countriesFiltered[0]} />
			) : (
				<>
					{searchFilter && countriesFiltered.length > 10 ? (
						<p className='text-red-500'>
							Too many matches, specify another filter
						</p>
					) : !searchFilter ? (
						<p className='text-gray-500'>
							Start typing to search for a country
						</p>
					) : (
						<Countries
							countriesFiltered={countriesFiltered}
							handleShow={handleShow}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default App;
