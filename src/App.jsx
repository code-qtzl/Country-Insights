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
		<>
			<Search
				text={'filter shown with:'}
				value={searchFilter}
				onChange={handleSearchFilter}
			/>
			{showCountryData ? (
				<Country country={countriesFiltered[0]} />
			) : (
				<>
					{countriesFiltered.length > 10 ? (
						<p>Too many matches, specify another filter</p>
					) : (
						<Countries
							countriesFiltered={countriesFiltered}
							handleShow={handleShow}
						/>
					)}
				</>
			)}
		</>
	);
};

export default App;
