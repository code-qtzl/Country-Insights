/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Search } from './components/Search';
import { Country } from './components/Country';
import { Countries } from './components/Countries';

const App = () => {
	const [searchFilter, setSearchFilter] = useState('');
	const [countries, setCountries] = useState([]);
	const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

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

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4 text-gray-800'>
				Country Insights
			</h1>
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
