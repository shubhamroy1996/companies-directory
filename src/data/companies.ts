import type { Company } from '../types/company';
import data from './data.json';

export const mockCompanies: Company[] = data.map(company => {
  const parsedRevenue = typeof company.revenue === 'string' 
    ? parseFloat(company.revenue) 
    : company.revenue;
  
  return {
    ...company,
    revenue: isNaN(parsedRevenue) ? 0 : parsedRevenue
  };
});

export const getUniqueIndustries = (): string[] => {
  return Array.from(new Set(mockCompanies.map(company => company.industry))).sort();
};

export const getUniqueLocations = (): string[] => {
  return Array.from(new Set(mockCompanies.map(company => company.location))).sort();
};
