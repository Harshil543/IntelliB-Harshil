'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import PaymentAnalysis from '@/components/CommonComponents/PaymentAnalysis';
import IncomeExpenseAnalysis from '@/components/CommonComponents/IncomeExpenseAnalysis';
import RecentTransaction from '@/components/CommonComponents/RecentTransaction';
import DashboardContent from '@/components/CommonComponents/DashboardContentCard';
import ComapnyPage from './company/page';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/user.service';

export default function Dashbord() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  return isLoading ? (
    'loading....'
  ) : (
    <ScrollArea className="h-full">
      {data.data.role === 'super_admin' ? (
        <ComapnyPage />
      ) : (
        <div className="flex-1">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <DashboardContent />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <IncomeExpenseAnalysis />
                <PaymentAnalysis />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
                <RecentTransaction />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </ScrollArea>
  );
}
