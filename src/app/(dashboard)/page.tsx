'use client';
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import PaymentAnalysis from '@/components/CommonComponents/PaymentAnalysis';
import IncomeExpenseAnalysis from '@/components/CommonComponents/IncomeExpenseAnalysis';
import RecentTransaction from '@/components/CommonComponents/RecentTransaction';
import Select from 'react-select';
import DashboardContent from '@/components/CommonComponents/DashboardContentCard';

export default function Dashbord() {
  const filterOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'halfyearly', label: 'Half Yearly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: ''
  });

  // This effect will be triggered whenever the selected filter changes
  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(selectedFilter.value);

    // Ensure the startDate and endDate are valid before updating the state
    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
    }
  }, [selectedFilter]);

  const calculateDateRange = (filter: string) => {
    const now = new Date();
    let startDate = new Date(now);
    let endDate = new Date(now);

    // Helper function to get the last day of a given month
    const getLastDayOfMonth = (month: number, year: number) => {
      return new Date(year, month + 1, 0); // Last day of the month
    };

    switch (filter) {
      case 'monthly':
        startDate.setDate(1);
        endDate = getLastDayOfMonth(now.getMonth(), now.getFullYear());
        break;

      case 'quarterly':
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const prevQuarterStartMonth = currentQuarter * 3;
        let prevQuarterStartDate = new Date(now);
        prevQuarterStartDate.setMonth(prevQuarterStartMonth - 3);
        prevQuarterStartDate.setDate(1);
        endDate = getLastDayOfMonth(
          prevQuarterStartDate.getMonth() + 2,
          prevQuarterStartDate.getFullYear()
        );
        startDate = prevQuarterStartDate;
        break;

      case 'halfyearly':
        const isFirstHalfYear = now.getMonth() < 6;
        let halfYearStartMonth = isFirstHalfYear ? 0 : 6;
        startDate.setMonth(halfYearStartMonth - 6);
        startDate.setDate(1);
        endDate = getLastDayOfMonth(
          startDate.getMonth() + 5,
          startDate.getFullYear()
        );
        break;

      case 'yearly':
        startDate.setFullYear(now.getFullYear() - 1);
        startDate.setMonth(9);
        startDate.setDate(1);
        endDate = getLastDayOfMonth(9, startDate.getFullYear());
        break;

      default:
        break;
    }

    // Ensure that both startDate and endDate are valid ISO 8601 date strings
    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };

  const handleFilterChange = (selectedOption: any) => {
    setSelectedFilter(selectedOption);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-end">
              <Select
                options={filterOptions}
                value={selectedFilter}
                onChange={handleFilterChange}
                className="inline-block h-10 w-40 text-sm"
                isSearchable={false}
              />
            </div>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-6">
              {/* Passing the dateRange to DashboardContent */}
              <DashboardContent dateRange={dateRange} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Passing the dateRange to other components */}
              <IncomeExpenseAnalysis />
              <PaymentAnalysis />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
              {/* Passing the dateRange to RecentTransaction */}
              <RecentTransaction />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
