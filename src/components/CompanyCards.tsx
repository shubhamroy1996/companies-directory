import { ExternalLink, Users, Calendar, MapPin, Building } from 'lucide-react';
import { useCompanyDirectory } from '../contexts/CompanyContexts'
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export function CompanyCards() {
  const { paginatedCompanies } = useCompanyDirectory();

  return (
    <div className="bg-background rounded-2xl sm:rounded-3xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 pt-2 sm:pt-3 gap-3 sm:gap-4">
      {paginatedCompanies.map((company) => (
        <div
          key={company.id}
          className="group relative flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-500 ease-out hover:-translate-y-1 cursor-pointer"
        >
          {/* Avatar with enhanced styling */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 sm:mb-3 rounded-full p-0.5 border-2 border-white/20 ring-2 ring-background/50">
            <Avatar className="w-full h-full">
              <AvatarImage src={company.logo} alt={company.name} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-xs sm:text-sm">
                {company.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Company Name */}
          <h3 className="text-sm sm:text-base font-bold text-card-foreground text-center mb-1 leading-tight px-1">
            {company.name}
          </h3>

          {/* Industry Badge */}
          <Badge variant="secondary" className="mb-2 text-xs bg-primary/10 text-primary hover:bg-primary/20">
            {company.industry}
          </Badge>

          {/* Description */}
          <div className="min-h-[1.5rem] sm:min-h-[2rem] flex items-center mb-2 sm:mb-3">
            <p className="text-center text-xs leading-snug text-muted-foreground line-clamp-2 px-1 w-full">
              {company.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3 p-1 sm:p-2 rounded-lg sm:rounded-xl">
            <div className="flex flex-col items-center text-center">
              <Users className="h-3 w-3 text-primary mb-0.5" />
              <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground">Employees</span>
              <span className="text-[10px] sm:text-xs font-semibold">{company.employees.toLocaleString()}</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Calendar className="h-3 w-3 text-primary mb-0.5" />
              <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground">Founded</span>
              <span className="text-[10px] sm:text-xs font-semibold">{company.founded}</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <MapPin className="h-3 w-3 text-primary mb-0.5" />
              <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground">Location</span>
              <span className="text-[9px] sm:text-[10px] font-semibold truncate max-w-full">{company.location}</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <Building className="h-3 w-3 text-primary mb-0.5" />
              <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground">Revenue</span>
              <span className="text-[9px] sm:text-[10px] font-semibold">{company.revenue}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => window.open(company.website, '_blank')}
            size="sm"
            className="flex items-center justify-center gap-1 rounded-full font-medium text-xs sm:text-sm backdrop-blur-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 group bg-primary text-primary-foreground shadow-md hover:shadow-lg"
            style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
          >
            <span>Visit Website</span>
            <ExternalLink className="h-3 w-3 transition-transform duration-300 ease-out group-hover:rotate-45" />
          </Button>

          {/* Background gradient effect */}
          <div className="m-2 sm:m-3 absolute inset-0 rounded-xl sm:rounded-2xl -z-10 transition-all duration-500 ease-out blur-xl opacity-20 bg-gradient-to-r from-chart-2/30 to-chart-3/30 group-hover:opacity-40" />
        </div>
      ))}
    </div>
  );
}