import { useState, useEffect, useRef } from 'react';
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
	const [activeIndex, setActiveIndex] = useState(-1);

	const menuRef = useRef<HTMLDivElement>(null);
	const filterButtonRef = useRef<HTMLButtonElement>(null);
	const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const debouncedSearchTerm = useDebounce(inputValue, 300);

	useEffect(() => {
		onSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm, onSearch]);

	useEffect(() => {
		if (!showRegionFilter) {
			setActiveIndex(-1);
			return;
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node) &&
				!filterButtonRef.current?.contains(e.target as Node)
			) {
				setShowRegionFilter(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [showRegionFilter]);

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
		filterButtonRef.current?.focus();
	};

	const clearRegionFilter = () => {
		setSelectedRegion('');
		onRegionFilter('');
	};

	const toggleDropdown = () => {
		const opening = !showRegionFilter;
		setShowRegionFilter(opening);
		if (opening) {
			setActiveIndex(0);
			requestAnimationFrame(() => {
				menuItemRefs.current[0]?.focus();
			});
		}
	};

	const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowDown': {
				e.preventDefault();
				const nextIndex =
					activeIndex < regions.length - 1
						? activeIndex + 1
						: 0;
				setActiveIndex(nextIndex);
				menuItemRefs.current[nextIndex]?.focus();
				break;
			}
			case 'ArrowUp': {
				e.preventDefault();
				const prevIndex =
					activeIndex > 0
						? activeIndex - 1
						: regions.length - 1;
				setActiveIndex(prevIndex);
				menuItemRefs.current[prevIndex]?.focus();
				break;
			}
			case 'Escape':
				e.preventDefault();
				setShowRegionFilter(false);
				filterButtonRef.current?.focus();
				break;
			case 'Home': {
				e.preventDefault();
				setActiveIndex(0);
				menuItemRefs.current[0]?.focus();
				break;
			}
			case 'End': {
				e.preventDefault();
				const lastIndex = regions.length - 1;
				setActiveIndex(lastIndex);
				menuItemRefs.current[lastIndex]?.focus();
				break;
			}
			case 'Tab':
				setShowRegionFilter(false);
				break;
		}
	};

	const handleFilterButtonKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowDown' && !showRegionFilter) {
			e.preventDefault();
			toggleDropdown();
		}
	};

	const menuId = 'region-filter-menu';

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
					<div className='relative'>
						<button
							ref={filterButtonRef}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20
                         text-white transition-colors duration-200 ${
								showRegionFilter ? 'ring-2 ring-white/50' : ''
							}`}
							onClick={toggleDropdown}
							onKeyDown={handleFilterButtonKeyDown}
							aria-expanded={showRegionFilter}
							aria-haspopup='true'
							aria-controls={
								showRegionFilter ? menuId : undefined
							}
						>
							<FunnelIcon className='h-4 w-4' aria-hidden='true' />
							<span>Filter by Region</span>
						</button>

						{showRegionFilter && (
							<div
								ref={menuRef}
								id={menuId}
								className='absolute z-10 mt-2 w-56 rounded-xl shadow-lg bg-white dark:bg-gray-800
                            ring-1 ring-black ring-opacity-5 overflow-hidden'
								role='menu'
								aria-orientation='vertical'
								aria-label='Region filter options'
								onKeyDown={handleDropdownKeyDown}
							>
								<div className='py-1'>
									{regions.map((region, index) => (
										<button
											key={region}
											ref={(el) => {
												menuItemRefs.current[index] = el;
											}}
											role='menuitem'
											className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200
                                ${
									selectedRegion === region
										? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
										: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
								}`}
											onClick={() =>
												handleRegionSelect(region)
											}
											aria-current={
												selectedRegion === region
													? 'true'
													: undefined
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
							<button
								onClick={clearRegionFilter}
								aria-label={`Remove ${selectedRegion} filter`}
								className='rounded-full p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
							>
								<XMarkIcon className='h-4 w-4' aria-hidden='true' />
							</button>
						</div>
					)}
				</div>
			</div>
			<div className='arch-separator' />
		</div>
	);
}
