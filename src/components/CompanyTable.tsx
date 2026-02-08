import { ExternalLink, Users, Calendar, Building2, MapPin, DollarSign, Link, Factory } from 'lucide-react';
import { useCompanyDirectory } from '../contexts/CompanyContexts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';

export function CompanyTable() {
  const { paginatedCompanies } = useCompanyDirectory();

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Company
                </div>
              </TableHead>
              <TableHead className="min-w-[80px]">
                <div className="flex items-center gap-2">
                  <Factory className="h-4 w-4 text-muted-foreground" />
                  Industry
                </div>
              </TableHead>
              <TableHead className="min-w-[80px]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Location
                </div>
              </TableHead>
              <TableHead className="min-w-[80px]">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Employees
                </div>
              </TableHead>
              <TableHead className="min-w-[70px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Founded
                </div>
              </TableHead>
              <TableHead className="min-w-[80px]">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Revenue
                </div>
              </TableHead>
              <TableHead className="w-[80px]">
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  Links
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCompanies.map((company) => (
              <TableRow key={company.id} className="hover:bg-muted/50">
                <TableCell className="min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback className="text-xs">
                        {company.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs sm:text-sm truncate">{company.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {company.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-[80px]">
                  <Badge variant="outline" className="text-xs">{company.industry}</Badge>
                </TableCell>
                <TableCell className="min-w-[80px] text-muted-foreground text-xs">
                  {company.location}
                </TableCell>
                <TableCell className="min-w-[80px]">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs">{company.employees.toLocaleString()}</span>
                  </div>
                </TableCell>
                <TableCell className="min-w-[70px]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs">{company.founded}</span>
                  </div>
                </TableCell>
                <TableCell className="min-w-[80px] font-medium text-xs">
                  {company.revenue}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(company.website, '_blank')}
                    className="gap-1 cursor-pointer hover:bg-primary/10 p-1 h-6"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}