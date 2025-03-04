import { useState, useEffect } from 'react';
import {
	MagnifyingGlassIcon,
	XMarkIcon,
	FunnelIcon,
} from '@heroicons/react/24/outline';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
	onSearch: (term: string) => void;
	onRegionFilter: (region: string) => void;
	regions: string[];
}

export default function SearchBar({
	onSearch,
	onRegionFilter,
	regions,
}: SearchBarProps) {
	const [inputValue, setInputValue] = useState('');
	const [showRegionFilter, setShowRegionFilter] = useState(false);
	const [selectedRegion, setSelectedRegion] = useState('');

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

	const handleRegionSelect = (region: string) => {
		setSelectedRegion(region);
		onRegionFilter(region);
		setShowRegionFilter(false);
	};

	const clearRegionFilter = () => {
		setSelectedRegion('');
		onRegionFilter('');
	};

	return (
		<div className='w-full mb-8 space-y-4'>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
					<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
				</div>
				<input
					type='text'
					className='block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
					placeholder='Search for a country...'
					value={inputValue}
					onChange={handleInputChange}
				/>
				{inputValue && (
					<button
						className='absolute inset-y-0 right-0 pr-3 flex items-center'
						onClick={clearSearch}
					>
						<XMarkIcon className='h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200' />
					</button>
				)}
			</div>

			<div className='flex flex-wrap items-center gap-2'>
				<div className='relative'>
					<button
						className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
							showRegionFilter
								? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
								: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
						}`}
						onClick={() => setShowRegionFilter(!showRegionFilter)}
					>
						<FunnelIcon className='h-4 w-4' />
						<span>Filter by Region</span>
					</button>

					{showRegionFilter && (
						<div className='absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5'>
							<div
								className='py-1'
								role='menu'
								aria-orientation='vertical'
							>
								{regions.map((region) => (
									<button
										key={region}
										className={`block w-full text-left px-4 py-2 text-sm ${
											selectedRegion === region
												? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
												: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
										}`}
										onClick={() =>
											handleRegionSelect(region)
										}
									>
										{region}
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				{selectedRegion && (
					<div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm'>
						<span>{selectedRegion}</span>
						<button onClick={clearRegionFilter}>
							<XMarkIcon className='h-4 w-4' />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
