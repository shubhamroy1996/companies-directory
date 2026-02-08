import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Building2, MapPin, Users, Calendar, DollarSign, Link, Factory } from 'lucide-react';

export function CompanyTableSkeleton() {
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
            {Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
                    <div className="space-y-1 min-w-0 flex-1">
                      <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                      <Skeleton className="h-3 w-24 sm:w-32" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-[80px]">
                  <Skeleton className="h-4 w-12 rounded-full" />
                </TableCell>
                <TableCell className="min-w-[80px]">
                  <Skeleton className="h-3 w-16" />
                </TableCell>
                <TableCell className="min-w-[80px]">
                  <Skeleton className="h-3 w-12" />
                </TableCell>
                <TableCell className="min-w-[70px]">
                  <Skeleton className="h-3 w-10" />
                </TableCell>
                <TableCell className="min-w-[80px]">
                  <Skeleton className="h-3 w-14" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
