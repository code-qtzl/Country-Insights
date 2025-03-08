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
		<div className='search-gradient'>
			<div className='search-container py-16'>
				<h2 className='text-4xl font-bold text-center text-white mb-4'>
					Explore the World
				</h2>
				<p className='text-center text-white/90 mb-8'>
					Discover information about countries around the globe
				</p>

				<div className='search-input-wrapper'>
					<input
						type='text'
						className='search-input'
						placeholder='Search for a country...'
						value={inputValue}
						onChange={handleInputChange}
					/>
					<div className='search-icon'>
						{inputValue ? (
							<XMarkIcon
								className='h-5 w-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300'
								onClick={clearSearch}
							/>
						) : (
							<MagnifyingGlassIcon className='h-5 w-5' />
						)}
					</div>
				</div>

				<div className='flex flex-wrap items-center justify-center gap-2'>
					<div className='relative'>
						<button
							className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                         text-white transition-colors duration-200 ${
								showRegionFilter ? 'ring-2 ring-white/50' : ''
							}`}
							onClick={() =>
								setShowRegionFilter(!showRegionFilter)
							}
						>
							<FunnelIcon className='h-4 w-4' />
							<span>Filter by Region</span>
						</button>

						{showRegionFilter && (
							<div
								className='absolute z-10 mt-2 w-56 rounded-xl shadow-lg bg-white dark:bg-gray-800 
                            ring-1 ring-black ring-opacity-5 overflow-hidden'
							>
								<div
									className='py-1'
									role='menu'
									aria-orientation='vertical'
								>
									{regions.map((region) => (
										<button
											key={region}
											className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200
                                ${
									selectedRegion === region
										? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
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
						<div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm'>
							<span>{selectedRegion}</span>
							<button onClick={clearRegionFilter}>
								<XMarkIcon className='h-4 w-4' />
							</button>
						</div>
					)}
				</div>
			</div>
			<div className='arch-separator' />
		</div>
	);
}
