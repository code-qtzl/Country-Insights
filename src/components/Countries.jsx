/* eslint-disable react/prop-types */
export const Countries = ({ countriesFiltered, handleShow }) => {
	return (
		<ul className='list-none space-y-2'>
			{countriesFiltered.map((country) => (
				<li
					key={country.ccn3}
					className='flex items-center justify-between p-2 border rounded shadow-sm hover:bg-gray-50 transition-colors dark:text-gray-200 dark:bg-gray-800'
				>
					<span>{country.name.common}</span>
					<button
						onClick={() => handleShow(country.ccn3)}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					>
						Show
					</button>
				</li>
			))}
		</ul>
	);
};
