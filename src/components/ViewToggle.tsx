import { Table, Grid3X3 } from 'lucide-react';
import { useCompanyDirectory } from '../contexts/CompanyContexts';
import { Button } from './ui/button';

export function ViewToggle() {
  const { viewType, handleViewChange, isLoading } = useCompanyDirectory();
  return (
    <div className="flex w-fit items-center gap-1 p-1 bg-primary/10 rounded-lg">
      <Button
        variant={viewType === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleViewChange('table')}
        disabled={isLoading}
        className="gap-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        <Table className="h-4 w-4 transition-transform duration-300" />
        <span className="hidden sm:inline">Table</span>
      </Button>
      <Button
        variant={viewType === 'card' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleViewChange('card')}
        disabled={isLoading}
        className="gap-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        <Grid3X3 className="h-4 w-4 transition-transform duration-300" />
        <span className="hidden sm:inline">Cards</span>
      </Button>
    </div>
  );
}