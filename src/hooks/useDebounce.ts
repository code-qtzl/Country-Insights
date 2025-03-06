import { useEffect, useState } from 'react';

/*
  useDebounce is a custom hook that delays the value update until the user stops typing.
  This hook is useful for:
  - Reducing API calls
  - Preventing excessive re-renders
  - Handling frequent search inputs
*/

export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
