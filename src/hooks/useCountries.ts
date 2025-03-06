import { useState, useEffect, useCallback } from 'react';
import { API_CONFIG } from '../config/api';
import { Country } from '../types';

export const useCountries = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [regionFilter, setRegionFilter] = useState<string>('');

	const fetchCountries = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`${API_CONFIG.COUNTRIES.BASE_URL}/api/all`,
			);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch countries: ${response.status}`,
				);
			}

			const data: Country[] = await response.json();
			setCountries(data);
			setFilteredCountries(data);
			setError(null);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'An unknown error occurred',
			);
			console.error('Error fetching countries:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCountries();
	}, [fetchCountries]);

	useEffect(() => {
		if (countries.length > 0) {
			let results = [...countries];

			if (searchTerm) {
				const searchLower = searchTerm.toLowerCase();
				results = results.filter(
					(country) =>
						country.name.common
							.toLowerCase()
							.includes(searchLower) ||
						country.name.official
							.toLowerCase()
							.includes(searchLower) ||
						(country.capital &&
							country.capital.some((cap) =>
								cap.toLowerCase().includes(searchLower),
							)),
				);
			}

			if (regionFilter) {
				results = results.filter(
					(country) => country.region === regionFilter,
				);
			}

			setFilteredCountries(results);
		}
	}, [countries, searchTerm, regionFilter]);

	const getCountryByCode = useCallback(
		(code: string) => {
			return countries.find(
				(country) =>
					country.cca3 === code ||
					country.cca2 === code ||
					country.ccn3 === code,
			);
		},
		[countries],
	);

	return {
		countries,
		filteredCountries,
		loading,
		error,
		searchTerm,
		setSearchTerm,
		regionFilter,
		setRegionFilter,
		getCountryByCode,
		refreshCountries: fetchCountries,
	};
};
