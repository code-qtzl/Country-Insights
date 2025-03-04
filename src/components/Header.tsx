import { SunIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className='bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10'>
			<div className='container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div className='flex items-center'>
					<GlobeAltIcon className='text-blue-500 mr-2 h-6 w-6' />
					<h1 className='text-xl font-bold text-gray-900 dark:text-white'>
						Country Insights
					</h1>
				</div>

				<div className='flex items-center justify-end'>
					<button
						onClick={toggleTheme}
						className='p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
						aria-label={
							theme === 'dark'
								? 'Switch to light mode'
								: 'Switch to dark mode'
						}
					>
						{theme === 'dark' ? (
							<SunIcon className='h-5 w-5' />
						) : (
							<MoonIcon className='h-5 w-5' />
						)}
					</button>
				</div>
			</div>
		</header>
	);
}
