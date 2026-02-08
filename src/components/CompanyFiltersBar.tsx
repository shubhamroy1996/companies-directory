import { Search, Filter, X, MapPin, Factory } from 'lucide-react';
import { useCompanyDirectory } from '../contexts/CompanyContexts';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

export function CompanyFiltersBar() {
  const { filters, handleFilterChange, industries, locations, isLoading } = useCompanyDirectory();
  const activeFiltersCount = [filters.industry, filters.location].filter(Boolean).length;


  const clearFilter = (filterKey: keyof typeof filters) => {
    handleFilterChange({ [filterKey]: '' });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative flex-1 order-1 sm:order-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search companies..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className={`pl-10 ${filters.search ? 'pr-10' : ''}`}
            disabled={isLoading}
          />
          {filters.search && (
            <button
              onClick={() => handleFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground h-4 w-4 flex items-center justify-center cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Industry and Location Filters - Same row on mobile, separate on desktop */}
        <div className="flex gap-3 sm:gap-4 order-2 sm:order-2">
          {/* Industry Filter */}
          <div className="w-1/2 sm:w-48">
            <Select
              value={filters.industry}
              onValueChange={(value) => handleFilterChange({ industry: value === 'all' ? '' : value })}
              disabled={isLoading}
            >
              <SelectTrigger className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Factory className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Industry" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location Filter */}
          <div className="w-1/2 sm:w-48">
            <Select
              value={filters.location}
              onValueChange={(value) => handleFilterChange({ location: value === 'all' ? '' : value })}
              disabled={isLoading}
            >
              <SelectTrigger className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Active filters:</span>
            <span className="sm:hidden">Filters:</span>
          </div>
          {filters.industry && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Factory className="h-3 w-3" />
              <span className="hidden sm:inline">Industry: </span>
              {filters.industry}
              <button
                onClick={() => clearFilter('industry')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Location: </span>
              {filters.location}
              <button
                onClick={() => clearFilter('location')}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}