/* eslint-disable react/prop-types */
export const Search = ({ text, value, onChange }) => {
	return (
		<div className='mb-4'>
			<label
				htmlFor='search'
				className='block text-gray-700 text-sm font-bold mb-2'
			>
				{text}
			</label>
			<input
				type='text'
				id='search'
				value={value}
				placeholder='Search...'
				onChange={onChange}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
		</div>
	);
};
