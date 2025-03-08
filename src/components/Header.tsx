import { SunIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div className='flex items-center'>
					<GlobeAltIcon
						className={`${
							theme === 'light'
								? 'text-orange-500 dark:text-orange-600 mr-2 h-6 w-6'
								: 'text-blue-500 dark:text-blue-400 mr-2 h-6 w-6'
						}`}
					/>
					<h1
						className={`text-xl font-bold ${
							theme === 'light'
								? 'bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-500'
								: 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'
						}
						 bg-clip-text text-transparent`}
					>
						Country Insights
					</h1>
				</div>

				<div className='flex items-center justify-end'>
					<button
						onClick={toggleTheme}
						className='p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200'
						aria-label={
							theme === 'dark'
								? 'Switch to light mode'
								: 'Switch to dark mode'
						}
					>
						{theme === 'dark' ? (
							<SunIcon className='text-yellow-500 h-5 w-5' />
						) : (
							<MoonIcon className='text-purple-600 h-5 w-5' />
						)}
					</button>
				</div>
			</div>
		</header>
	);
}
