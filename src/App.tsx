import { CompanyDirectoryProvider, useCompanyDirectory } from './contexts/CompanyContexts';
import { CompanyFiltersBar } from './components/CompanyFiltersBar';
import { CompanyTable } from './components/CompanyTable';
import { CompanyCards } from './components/CompanyCards';
import { CompanyTableSkeleton } from './components/CompanyTableSkeleton';
import { CompanyCardsSkeleton } from './components/CompanyCardsSkeleton';
import { CompanyPagination } from './components/CompanyPagination';
import { ViewToggle } from './components/ViewToggle';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { ArrowUp, ArrowDown, AlertTriangle, RefreshCw, Loader2, Building2, MapPin, Users, Calendar, Factory } from 'lucide-react';
import { LoadingSpinner } from './components/LoadingSpinner';
import type { SortField } from './types/company';
import { useEffect } from 'react';

function AppContent() {
  const {
    viewType,
    isTransitioning,
    isLoading,
    error,
    filteredAndSortedCompanies,
    paginatedCompanies,
    totalPages,
    totalCompanies,
    sortConfig,
    handleSort,
    retry,
  } = useCompanyDirectory();

  // Load data on component mount
  useEffect(() => {
    retry();
  }, [retry]);

  const sortFieldOptions = [
    { value: 'name', label: 'Name', icon: Building2 },
    { value: 'industry', label: 'Industry', icon: Factory },
    { value: 'location', label: 'Location', icon: MapPin },
    { value: 'employees', label: 'Employees', icon: Users },
    { value: 'founded', label: 'Founded', icon: Calendar },
  ];

  const getDirectionIcon = () => {
    return sortConfig.direction === 'asc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />;
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6 min-h-screen w-full bg-background">
      <div className="max-w-7xl mx-auto py-5 space-y-4 sm:space-y-2">
        {/* Header */}
          <div className="flex flex-col items-center justify-center text-center px-2">
            <h1 className="text-2xl font-bold tracking-tight leading-tight">
              Companies Directory 🏢
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs sm:text-sm text-muted-foreground tracking-tight max-w-2xl">
                Discover and explore {totalCompanies} companies across various industries
              </p>
              {isLoading && <LoadingSpinner size="sm" />}
            </div>
          </div>

        {/* Filters */}
        <CompanyFiltersBar />

        {/* Sorting and View Controls */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          {/* Sorting Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm font-medium whitespace-nowrap">Sort by:</span>

            {/* Field Selection */}
            <Select
              value={sortConfig.field}
              onValueChange={(value) => {
                const field = value as SortField;
                if (sortConfig.field !== field) {
                  handleSort(field);
                }
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="w-28 sm:w-32 cursor-pointer">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                {sortFieldOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        {option.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {/* Direction Toggle Button */}
            <Button
              variant="outline"
              size="md"
              onClick={() => handleSort(sortConfig.field)}
              disabled={isLoading}
              className="flex items-center gap-1 cursor-pointer hover:bg-muted px-2 flex-shrink-0"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : getDirectionIcon()}
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex-shrink-0">
            <ViewToggle />
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing {paginatedCompanies.length} of {filteredAndSortedCompanies.length} companies
            </p>
            {isLoading && <LoadingSpinner size="sm" />}
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-hidden">
          {error ? (
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] p-4 sm:p-6">
              <Alert className="max-w-md w-full mx-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Failed to load companies</AlertTitle>
                <AlertDescription className="mt-2">
                  {error}
                </AlertDescription>
                <div className="mt-4">
                  <Button onClick={retry} variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </Alert>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {viewType === 'table' ? (
                <CompanyTableSkeleton />
              ) : (
                <CompanyCardsSkeleton />
              )}
            </div>
          ) : filteredAndSortedCompanies.length === 0 ? (
            <div className="p-6 sm:p-12 text-center">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-3xl sm:text-4xl">🏢</div>
                <h3 className="text-base sm:text-lg font-semibold">No companies found</h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search criteria or filters to find more companies.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isTransitioning
                    ? 'opacity-0 transform translate-x-4'
                    : 'opacity-100 transform translate-x-0'
                }`}
              >
                {viewType === 'table' ? (
                  <CompanyTable />
                ) : (
                  <CompanyCards />
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  className={`transition-all duration-300 ease-in-out mt-4 ${
                    isTransitioning
                      ? 'opacity-0 transform translate-y-4'
                      : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  <CompanyPagination />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CompanyDirectoryProvider>
        <AppContent />
      </CompanyDirectoryProvider>
    </ErrorBoundary>
  );
}