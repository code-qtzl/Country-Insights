/* eslint-disable react/prop-types */
export const Countries = ({ countriesFiltered, handleShow }) => {
	return (
		<ul>
			{countriesFiltered.map((country) => (
				<li key={country.ccn3}>
					{country.name.common}{' '}
					<button onClick={() => handleShow(country.ccn3)}>
						Show
					</button>
				</li>
			))}
		</ul>
	);
};
