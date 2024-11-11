'use client';
import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import type { IconifyIcon } from '@iconify/react';
import { Icon } from '@iconify/react';
import usersIcon from '@iconify/icons-mdi/user';
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '@/services/dashboard.service';

interface DashboardContentItem {
  id: number;
  title: string;
  count: number | string;
  icon: IconifyIcon;
}

interface DashboardContentCardProps {
  item: DashboardContentItem;
  loading: boolean;
}

const DashboardContentCard: React.FC<DashboardContentCardProps> = ({
  item,
  loading
}) => (
  <Card key={item.id}>
    <div className="p- flex w-full flex-col gap-3 p-3">
      <div className="w-fit rounded-full bg-secondary p-2">
        <Icon icon={item.icon} className="text-2xl" />
      </div>
      <div>
        <CardTitle className="text-xs text-muted-foreground">
          {item.title}
        </CardTitle>
        <div className="text-sm font-bold">
          {loading ? (
            <div className="mt-5 flex h-8 items-center justify-start align-middle">
              <div className="h-5 w-5 animate-spin rounded-full border-t-4 border-primary"></div>
            </div>
          ) : (
            item.count
          )}
        </div>
      </div>
    </div>
  </Card>
);

interface DashboardContentProps {
  dateRange: { startDate: string; endDate: string };
}

const DashboardContent: React.FC<DashboardContentProps> = ({ dateRange }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', dateRange],
    queryFn: () => getDashboardData(dateRange)
  });

  const dashboardItems = [
    { id: 1, title: 'No of Tenants', count: 0, icon: usersIcon },
    {
      id: 2,
      title: 'No of Bills Raised',
      count: data?.noOfBillsRaised > 0 ? data?.noOfBillsRaised : 0,
      icon: usersIcon
    },
    {
      id: 3,
      title: 'No of Bills Paid',
      count: data?.noOfBillsPaid > 0 ? data?.noOfBillsPaid : 0,
      icon: usersIcon
    },
    {
      id: 4,
      title: 'Total Billing Value',
      count: data?.totalBillValue > 0 ? data?.totalBillValue : 0,
      icon: usersIcon
    },
    {
      id: 5,
      title: 'Total Payment Received',
      count: data?.totalPaymentReceived > 0 ? data?.totalPaymentReceived : 0,
      icon: usersIcon
    },
    {
      id: 6,
      title: 'Total Payment Outstanding',
      count:
        data?.totalPaymentOutstanding > 0 ? data?.totalPaymentOutstanding : 0,
      icon: usersIcon
    }
  ];

  return dashboardItems.map((item, i) => (
    <DashboardContentCard item={item} key={i} loading={isLoading} />
  ));
};

export default DashboardContent;
