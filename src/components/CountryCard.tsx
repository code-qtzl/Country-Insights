import { Country } from '../types';

interface CountryCardProps {
	country: Country;
	onClick: () => void;
}

export default function CountryCard({ country, onClick }: CountryCardProps) {
	const formatPopulation = (population: number) => {
		return new Intl.NumberFormat().format(population);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<article
			className='bg-neutral-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-orange-400'
			onClick={onClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role='button'
			aria-label={`View details for ${country.name.common}`}
		>
			<div className='relative h-40 overflow-hidden shadow-md'>
				<img
					src={country.flags.svg}
					alt={country.flags.alt || `Flag of ${country.name.common}`}
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='p-5'>
				<h3 className='font-bold text-lg mb-3 text-stone-800 dark:text-stone-100 truncate'>
					{country.name.common}
				</h3>
				<div className='space-y-2 text-sm text-stone-600 dark:text-stone-300'>
					<p className='flex justify-between'>
						<span className='font-medium'>Capital:</span>
						<span className='text-stone-700 dark:text-stone-200'>
							{country.capital?.join(', ') || 'N/A'}
						</span>
					</p>
					<p className='flex justify-between'>
						<span className='font-medium'>Population:</span>
						<span className='text-stone-700 dark:text-stone-200'>
							{formatPopulation(country.population)}
						</span>
					</p>
					<p className='flex justify-between'>
						<span className='font-medium'>Region:</span>
						<span className='text-stone-700 dark:text-stone-200'>
							{country.region}
						</span>
					</p>
				</div>
			</div>
		</article>
	);
}
