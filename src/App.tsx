import { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { API_CONFIG } from './config/api';
import { useCountries } from './hooks/useCountries';
import { useDebounce } from './hooks/useDebounce';
import { Country } from './types';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CountryGrid from './components/CountryGrid';
import CountryDetails from './components/CountryDetails';

export default function App() {
	const [selectedCountry, setSelectedCountry] = useState<Country | null>(
		null,
	);

	const {
		countries,
		filteredCountries,
		loading,
		error,
		searchTerm,
		setSearchTerm,
		setRegionFilter,
	} = useCountries();

	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const regions = useMemo(() => {
		const uniqueRegions = new Set(
			countries.map((country) => country.region),
		);
		return Array.from(uniqueRegions).sort();
	}, [countries]);

	const handleCountrySelect = (country: Country) => {
		setSelectedCountry(country);
	};

	const handleBackToList = () => {
		setSelectedCountry(null);
	};

	return (
		<ThemeProvider>
			<div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200'>
				<Header />

				<main className={`w-full mx-auto bg-gray-100 dark:bg-gray-900`}>
					{error && (
						<div className='bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6'>
							<p className='text-red-600 dark:text-red-400'>
								{error}
							</p>
							<p className='text-red-500 dark:text-red-300 text-sm mt-1'>
								Please try refreshing the page or check your
								internet connection.
							</p>
						</div>
					)}

					{!selectedCountry && (
						<>
							<SearchBar
								onSearch={setSearchTerm}
								onRegionFilter={setRegionFilter}
								regions={regions}
							/>
							<div className='container relative mx-auto -mt-40 px-4 py-8'>
								<h2 className='text-4xl font-bold text-center text-gray-700 dark:text-white mb-16'>
									Explore Countries
								</h2>
								<CountryGrid
									countries={filteredCountries}
									onCountrySelect={handleCountrySelect}
									loading={loading}
								/>
							</div>
						</>
					)}

					{selectedCountry && (
						<CountryDetails
							country={selectedCountry}
							onBack={handleBackToList}
						/>
					)}
				</main>

				<footer className='bg-white dark:bg-gray-800 py-6 '>
					<div className='container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm'>
						<p>
							Country data provided by{' '}
							<a
								href='https://restcountries.com/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500 hover:underline'
							>
								REST Countries API
							</a>
						</p>
						<p className='mt-1'>
							Weather data provided by{' '}
							<a
								href={API_CONFIG.WEATHER.SITE_URL}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-500 hover:underline'
							>
								OpenWeatherMap API
							</a>
						</p>
					</div>
				</footer>
			</div>
		</ThemeProvider>
	);
}
