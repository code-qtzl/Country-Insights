import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { Theme } from '../types';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem('theme');
		return savedTheme === 'dark' || savedTheme === 'light'
			? savedTheme
			: 'dark';
	});

	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.documentElement.classList.toggle('dark', theme === 'dark');
		document.documentElement.classList.toggle('light', theme === 'light');
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme: () =>
					setTheme((t) => (t === 'light' ? 'dark' : 'light')),
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context)
		throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};
