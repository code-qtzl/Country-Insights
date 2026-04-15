import { useState, useEffect } from 'react';
import {
	ArrowDownIcon,
	ArrowUpIcon,
	MagnifyingGlassIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDebounce } from '../hooks/useDebounce';
import { SortDirection, SortOption } from '../hooks/useCountries';

interface SearchBarProps {
	onSearch: (term: string) => void;
	sortOption: SortOption;
	onSortChange: (sortOption: SortOption) => void;
	sortDirection: SortDirection;
}

const sortButtons: Array<{ label: string; value: SortOption }> = [
	{ label: 'A-Z', value: 'alphabetical' },
	{ label: 'Population', value: 'population' },
	{ label: 'Region', value: 'region' },
];

export default function SearchBar({
	onSearch,
	sortOption,
	onSortChange,
	sortDirection,
}: SearchBarProps) {
	const [inputValue, setInputValue] = useState('');

	const debouncedSearchTerm = useDebounce(inputValue, 300);

	useEffect(() => {
		onSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm, onSearch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const clearSearch = () => {
		setInputValue('');
	};

	return (
		<div className='search-gradient'>
			<div className='search-container py-16'>
				<h2 className='text-4xl font-bold text-center text-white mb-4'>
					Explore the World
				</h2>
				<p className='text-center text-white/90 mb-8'>
					Discover information about countries around the globe
				</p>

				<search role='search' aria-label='Search countries'>
					<div className='search-input-wrapper'>
						<input
							type='text'
							className='search-input'
							placeholder='Search for a country...'
							value={inputValue}
							onChange={handleInputChange}
							aria-label='Search for a country'
						/>
						<div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500'>
							{inputValue ? (
								<button
									type='button'
									onClick={clearSearch}
									className='hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
									aria-label='Clear search'
								>
									<XMarkIcon className='h-5 w-5' />
								</button>
							) : (
								<MagnifyingGlassIcon
									className='h-5 w-5'
									aria-hidden='true'
								/>
							)}
						</div>
					</div>
				</search>

				<div className='flex flex-wrap items-center justify-center gap-2'>
					<div
						className='flex flex-wrap items-center justify-center gap-2'
						role='group'
						aria-label='Sort countries'
					>
						{sortButtons.map((button) => {
							const isActive = sortOption === button.value;
							const isAscending =
								isActive && sortDirection === 'asc';
							const isDescending =
								isActive && sortDirection === 'desc';

							return (
								<button
									key={button.value}
									type='button'
									onClick={() => onSortChange(button.value)}
									aria-pressed={isActive}
									aria-label={`${button.label} sort${
										isActive
											? sortDirection === 'asc'
												? ', ascending'
												: ', descending'
											: ''
									}. Click again to reverse the order.`}
									className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
										isActive
											? 'bg-white text-gray-900 shadow-sm'
											: 'bg-white/10 text-white hover:bg-white/20'
									}`}
								>
									<span className='flex items-center gap-2'>
										{button.label}
										<span
											className='flex items-center gap-0.5'
											aria-hidden='true'
										>
											<ArrowUpIcon
												className={`h-4 w-4 transition-opacity duration-200 ${
													isAscending
														? 'opacity-100'
														: 'opacity-45'
												}`}
											/>
											<ArrowDownIcon
												className={`h-4 w-4 transition-opacity duration-200 ${
													isDescending
														? 'opacity-100'
														: 'opacity-45'
												}`}
											/>
										</span>
									</span>
								</button>
							);
						})}
					</div>
				</div>
			</div>
			<div className='arch-separator' />
		</div>
	);
}
