import CountryCard from './CountryCard';
import { Country } from '../types';

interface CountryGridProps {
  countries: Country[];
  onCountrySelect: (country: Country) => void;
  loading: boolean;
}

export default function CountryGrid({ countries, onCountrySelect, loading }: CountryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md h-72 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 dark:text-gray-300 text-lg">No countries found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
          onClick={() => onCountrySelect(country)}
        />
      ))}
    </div>
  );
}