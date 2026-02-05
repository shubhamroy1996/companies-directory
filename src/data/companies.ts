import type { Company } from '../types/company';
import data from './data.json';

export const mockCompanies: Company[] = data;

export const getUniqueIndustries = (): string[] => {
  return Array.from(new Set(mockCompanies.map(company => company.industry))).sort();
};

export const getUniqueLocations = (): string[] => {
  return Array.from(new Set(mockCompanies.map(company => company.location))).sort();
};
