'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import type { IconifyIcon } from '@iconify/react';
import usersIcon from '@iconify/icons-mdi/user';
import { useQuery } from '@tanstack/react-query';
import {
  getDashboardData,
  getTenantDashboardData
} from '@/services/dashboard.service';
import Select from 'react-select';
import { filterOptions } from '@/constants/data.constants';

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

const DashboardContent = () => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: ''
  });

  const calculateDateRange = (filter: string) => {
    const now = new Date();
    let startDate = new Date(now);
    let endDate = new Date(now);

    const getLastDayOfMonth = (month: number, year: number) => {
      return new Date(year, month, 0);
    };

    switch (filter) {
      case 'monthly':
        startDate.setDate(2);
        startDate.setHours(0, 0, 0, 0);

        endDate = getLastDayOfMonth(now.getMonth() + 1, now.getFullYear());
        endDate.setHours(23, 59, 59, 999);
        break;

      case 'quarterly':
        // Start date: 1st of the month, 3 months ago
        startDate.setMonth(now.getMonth() - 2);
        startDate.setDate(2);
        startDate.setHours(0, 0, 0, 0);

        endDate = getLastDayOfMonth(now.getMonth() + 1, now.getFullYear());
        endDate.setHours(23, 59, 59, 999);
        break;

      case 'half-yearly':
        // Start date: 1st of the month, 6 months ago
        startDate.setMonth(now.getMonth() - 5);
        startDate.setDate(2);
        startDate.setHours(0, 0, 0, 0);

        // End date: last day of the current month
        endDate = getLastDayOfMonth(now.getMonth() + 1, now.getFullYear());
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'yearly':
        // Start date: 1st of the month, 6 months ago
        startDate.setMonth(now.getMonth() - 11);
        startDate.setDate(2);
        startDate.setHours(0, 0, 0, 0);

        // End date: last day of the current month
        endDate = getLastDayOfMonth(now.getMonth() + 1, now.getFullYear());
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        break;
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };

  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(selectedFilter.value);

    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
    }
  }, [selectedFilter]);

  const handleFilterChange = (selectedOption: any) => {
    setSelectedFilter(selectedOption);
  };

  // Use useQuery with Promise.all for parallel fetching
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['dashboard', dateRange.startDate, dateRange.endDate],
    queryFn: async () => {
      const [dashboardResponse, tenantResponse] = await Promise.all([
        getDashboardData({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        }),
        getTenantDashboardData({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        })
      ]);

      return { dashboardData: dashboardResponse, tenantData: tenantResponse };
    },
    enabled: !!dateRange.startDate && !!dateRange.endDate
  });

  const dashboardItems = [
    {
      id: 1,
      title: 'No of Tenants',
      count:
        dashboardData?.tenantData?.length > 0
          ? dashboardData?.tenantData?.length
          : 0,
      icon: usersIcon
    },
    {
      id: 2,
      title: 'No of Bills Raised',
      count:
        dashboardData?.dashboardData?.noOfBillsRaised > 0
          ? dashboardData?.dashboardData?.noOfBillsRaised
          : 0,
      icon: usersIcon
    },
    {
      id: 3,
      title: 'No of Bills Paid',
      count:
        dashboardData?.dashboardData?.noOfBillsPaid > 0
          ? dashboardData?.dashboardData?.noOfBillsPaid
          : 0,
      icon: usersIcon
    },
    {
      id: 4,
      title: 'Total Billing Value',
      count:
        dashboardData?.dashboardData?.totalBillValue > 0
          ? dashboardData?.dashboardData?.totalBillValue
          : 0,
      icon: usersIcon
    },
    {
      id: 5,
      title: 'Total Payment Received',
      count:
        dashboardData?.dashboardData?.totalPaymentReceived > 0
          ? dashboardData?.dashboardData?.totalPaymentReceived
          : 0,
      icon: usersIcon
    },
    {
      id: 6,
      title: 'Total Payment Outstanding',
      count:
        dashboardData?.dashboardData?.totalPaymentOutstanding > 0
          ? dashboardData?.dashboardData?.totalPaymentOutstanding
          : 0,
      icon: usersIcon
    }
  ];

  return (
    <>
      <div className="flex w-full justify-end">
        <Select
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          className="inline-block h-10 w-40 text-sm"
          isSearchable={false}
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-6">
        {dashboardItems.map((item, i) => (
          <DashboardContentCard
            item={item}
            key={i}
            loading={isDashboardLoading}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardContent;
