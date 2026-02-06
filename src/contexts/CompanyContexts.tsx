import { createContext, useContext, useState, type ReactNode } from "react";

import type {
  Company,
  ViewType,
  CompanyFilters,
  SortConfig,
  SortField,
} from "../types/company";

import {
  mockCompanies,
  getUniqueIndustries,
  getUniqueLocations,
} from "../data/companies";

const ITEMS_PER_PAGE = 10;

interface CompanyDirectoryContextType {
  // Industries and locations for filters
  industries: string[];
  locations: string[];

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

  // Actions
  handleViewChange: (newViewType: ViewType) => void;
  handleFilterChange: (newFilters: Partial<CompanyFilters>) => void;
  handleSort: (field: SortField) => void;
  handlePageChange: (page: number) => void;
  clearError: () => void;
  retry: () => void;
}

const CompanyDirectoryContext = createContext<
  CompanyDirectoryContextType | undefined
>(undefined);

export function useCompanyDirectory() {
  const context = useContext(CompanyDirectoryContext);

  if (context === undefined) {
    throw new Error(
      "useCompanyDirectory must be used within a CompanyDirectoryProvider",
    );
  }
  return context;
}

interface CompanyDirectoryProviderProps {
  children: ReactNode;
}

export function CompanyDirectoryProvider({
  children,
}: CompanyDirectoryProviderProps) {
  const [viewType, setViewType] = useState<ViewType>("table");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CompanyFilters>({
    search: "",
    industry: "",
    location: "",
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewChange = (newViewType: ViewType) => {
    if (newViewType === viewType) return;

    setIsTransitioning((prev) => !prev);
    setTimeout(() => {
      setViewType(newViewType);
      setTimeout(() => {
        setIsTransitioning((prev) => !prev);
      }, 150);
    }, 150);
  };

  const clearError = () => {
    setError(null);
  };

  //simulate data loading with error handling
  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 600));

      if (Math.random() < 0.05) {
        throw new Error("Failed to load companies data");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const retry = () => {
    loadData();
  };

  // Filter and sort companies
  const filteredAndSortedCompanies = () => {
    const filtered = mockCompanies.filter((company) => {
      const matchesSearch =
        company.name
          .toLocaleLowerCase()
          .includes(filters.search.toLocaleLowerCase()) ||
        company.description
          .toLocaleLowerCase()
          .includes(filters.search.toLocaleLowerCase());

      const matchesIndustry =
        !filters.industry || company.industry === filters.industry;
      const matchesLocation =
        !filters.location || company.location === filters.location;

      return matchesSearch && matchesIndustry && matchesLocation;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });

    return filtered;
  };

  const handleFilterChange = (newFilters: Partial<CompanyFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedCompanies().length / ITEMS_PER_PAGE,
  );
  const paginatedCompanies = filteredAndSortedCompanies().slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const value: CompanyDirectoryContextType = {
    // State
    viewType,
    isTransitioning,
    isLoading,
    error,
    filters,
    sortConfig,
    currentPage,
    filteredAndSortedCompanies: filteredAndSortedCompanies(),
    totalPages,
    paginatedCompanies,
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
