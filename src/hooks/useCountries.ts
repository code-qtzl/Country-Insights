import { useState, useEffect, useCallback } from 'react';
import { API_CONFIG } from '../config/api';
import { Country } from '../types';

export type SortOption = 'region' | 'alphabetical' | 'population';
export type SortDirection = 'asc' | 'desc';

const collator = new Intl.Collator('en', {
	sensitivity: 'base',
});

const getDefaultSortDirection = (sortOption: SortOption): SortDirection => {
	return sortOption === 'population' ? 'desc' : 'asc';
};

const sortCountries = (
	countries: Country[],
	sortOption: SortOption,
	sortDirection: SortDirection,
) => {
	const sortedCountries = [...countries];

	sortedCountries.sort((leftCountry, rightCountry) => {
		const directionMultiplier = sortDirection === 'asc' ? 1 : -1;

		if (sortOption === 'population') {
			return (
				(leftCountry.population - rightCountry.population) *
				directionMultiplier
			);
		}

		if (sortOption === 'alphabetical') {
			return (
				collator.compare(
					leftCountry.name.common,
					rightCountry.name.common,
				) * directionMultiplier
			);
		}

		const regionComparison = collator.compare(
			leftCountry.region,
			rightCountry.region,
		);

		if (regionComparison !== 0) {
			return regionComparison * directionMultiplier;
		}

		return (
			collator.compare(
				leftCountry.name.common,
				rightCountry.name.common,
			) * directionMultiplier
		);
	});

	return sortedCountries;
};

export const useCountries = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOption, setSortOption] = useState<SortOption>('population');
	const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

	const fetchCountries = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`${API_CONFIG.COUNTRIES.BASE_URL}${API_CONFIG.COUNTRIES.ENDPOINTS.ALL}`,
			);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch countries: ${response.status}`,
				);
			}

			const data: Country[] = await response.json();
			setCountries(data);
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

			setFilteredCountries(
				sortCountries(results, sortOption, sortDirection),
			);
		}
	}, [countries, searchTerm, sortOption, sortDirection]);

	const handleSortChange = useCallback(
		(nextSortOption: SortOption) => {
			if (nextSortOption === sortOption) {
				setSortDirection((currentDirection) =>
					currentDirection === 'asc' ? 'desc' : 'asc',
				);
				return;
			}

			setSortOption(nextSortOption);
			setSortDirection(getDefaultSortDirection(nextSortOption));
		},
		[sortOption],
	);

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
		sortOption,
		sortDirection,
		handleSortChange,
		getCountryByCode,
		refreshCountries: fetchCountries,
	};
};
