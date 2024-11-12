'use client';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle
} from '@components/ui/card';

import Image from 'next/image';
import verticleSeprator from '@assets/images/verticleSeprator.png';
import Select from 'react-select';
import { getDashboardData } from '@/services/dashboard.service';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import { filterOptions } from '@/constants/data.constants';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return <Pie data={data} />;
};

const PaymentAnalysis = () => {
  const [chartData, setChartData] = useState<any>({
    labels: ['Payment Done', 'Payment Pending'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#4318FF', '#6AD2FF']
      }
    ]
  });

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(selectedFilter.value);

    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
    }
  }, [selectedFilter]);

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

  const handleFilterChange = (selectedOption: any) => {
    setSelectedFilter(selectedOption);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', dateRange.startDate, dateRange.endDate],
    queryFn: () =>
      getDashboardData({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      })
  });

  useEffect(() => {
    if (data) {
      const totalPaymentOutstanding = parseFloat(data.totalPaymentOutstanding);
      const totalPaymentReceived = parseFloat(data.totalPaymentReceived);

      if (!isNaN(totalPaymentOutstanding) && !isNaN(totalPaymentReceived)) {
        const total = totalPaymentOutstanding + totalPaymentReceived;

        const percentageOutstanding = (
          (totalPaymentOutstanding / total) *
          100
        ).toFixed(2);
        const percentageReceived = (
          (totalPaymentReceived / total) *
          100
        ).toFixed(2);

        setChartData({
          labels: ['Payment Done', 'Payment Pending'],
          datasets: [
            {
              data: [
                parseFloat(percentageReceived),
                parseFloat(percentageOutstanding)
              ],
              backgroundColor: ['#4318FF', '#6AD2FF']
            }
          ]
        });
      } else {
        console.error('Invalid data for payment values');
      }
    }
  }, [data]);

  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="inline-block">Payment Analysis</CardTitle>
        {/* Dropdown for filtering */}
        <Select
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          className="inline-block h-10 w-40 text-sm"
          isSearchable={false}
        />
      </CardHeader>

      <CardContent className="flex h-[50%] items-center justify-center">
        {chartData ? (
          isLoading ? (
            <Loader />
          ) : (
            <PieChart data={chartData} />
          )
        ) : (
          <div>No data available for the selected range.</div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-center align-middle">
        <Card className="flex w-fit justify-center text-center align-middle">
          <div>
            <CardHeader className="flex flex-row items-center justify-center gap-0 space-y-0 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Payment Done
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {chartData?.datasets[0].data[0]}%
              </div>
            </CardContent>
          </div>
          <div className="my-auto">
            <Image src={verticleSeprator} alt="seprator" className="h-16" />
          </div>
          <div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Payment Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {chartData?.datasets[0].data[1]}%
              </div>
            </CardContent>
          </div>
        </Card>
      </CardFooter>
    </Card>
  );
};

export default PaymentAnalysis;
