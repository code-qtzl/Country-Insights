/* eslint-disable react/prop-types */
export const Search = ({ text, value, onChange }) => {
	return (
		<>
			{text} <input value={value} onChange={onChange} />
		</>
	);
};
