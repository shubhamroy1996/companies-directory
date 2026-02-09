import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type {
  Company,
  ViewType,
  CompanyFilters,
  SortConfig,
  SortField
} from '../types/company';
import { mockCompanies, getUniqueIndustries, getUniqueLocations } from '../data/companies';

const ITEMS_PER_PAGE = 8;

interface CompanyDirectoryContextType {
  // State
  viewType: ViewType;
  isTransitioning: boolean;
  isLoading: boolean;
  error: string | null;
  filters: CompanyFilters;
  sortConfig: SortConfig;
  currentPage: number;
  filteredAndSortedCompanies: Company[];
  paginatedCompanies: Company[];
  totalPages: number;
  totalCompanies: number;

  // Industries and locations for filters
  industries: string[];
  locations: string[];

  // Actions
  handleViewChange: (newViewType: ViewType) => void;
  handleFilterChange: (newFilters: Partial<CompanyFilters>) => void;
  handleSort: (field: SortField) => void;
  handlePageChange: (page: number) => void;
  clearError: () => void;
  retry: () => void;
}

const CompanyDirectoryContext = createContext<CompanyDirectoryContextType | undefined>(undefined);

export function useCompanyDirectory() {
  const context = useContext(CompanyDirectoryContext);
  if (context === undefined) {
    throw new Error('useCompanyDirectory must be used within a CompanyDirectoryProvider');
  }
  return context;
}

interface CompanyDirectoryProviderProps {
  children: ReactNode;
}

export function CompanyDirectoryProvider({ children }: CompanyDirectoryProviderProps) {
  const [viewType, setViewType] = useState<ViewType>('table');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CompanyFilters>({
    search: '',
    industry: '',
    location: ''
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    direction: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate data loading with error handling
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate potential error (5% chance)
      if (Math.random() < 0.05) {
        throw new Error('Failed to load companies data');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    if (error) return [];
    
    const filtered = mockCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           company.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesIndustry = !filters.industry || company.industry === filters.industry;
      const matchesLocation = !filters.location || company.location === filters.location;

      return matchesSearch && matchesIndustry && matchesLocation;
    });

    // Sort companies
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      return 0;
    });

    return filtered;
  }, [filters, sortConfig, error]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = filteredAndSortedCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (newFilters: Partial<CompanyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (newViewType: ViewType) => {
    if (newViewType === viewType) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setViewType(newViewType);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 150);
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const retry = useCallback(() => {
    loadData();
  }, [loadData]);

  const value: CompanyDirectoryContextType = {
    // State
    viewType,
    isTransitioning,
    isLoading,
    error,
    filters,
    sortConfig,
    currentPage,
    filteredAndSortedCompanies,
    paginatedCompanies,
    totalPages,
    totalCompanies: mockCompanies.length,
    industries: getUniqueIndustries(),
    locations: getUniqueLocations(),

    // Actions
    handleViewChange,
    handleFilterChange,
    handleSort,
    handlePageChange,
    clearError,
    retry,
  };

  return (
    <CompanyDirectoryContext.Provider value={value}>
      {children}
    </CompanyDirectoryContext.Provider>
  );
}
