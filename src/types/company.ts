export interface Company {
  id: string;
  name: string;
  industry: string;
  employees: number;
  founded: number;
  revenue: number;
  website: string;
  description: string;
  logo: string;
  location: string;
}

export type ViewType = 'table' | 'card'

export interface CompanyFilters {
  search: string;
  industry: string;
  location: string;
}

export type SortField = 'name' | 'industry' | 'location' | 'employees' | 'founded'

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection

}