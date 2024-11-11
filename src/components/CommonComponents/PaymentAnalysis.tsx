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
import { getDashboardData } from '@/services/dashboard.service'; // Import your API function
import Image from 'next/image';
import verticleSeprator from '@assets/images/verticleSeprator.png';
import Select from 'react-select';
import Loader from './Loader';

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
  const [selectedFilter, setSelectedFilter] = useState('yearly');

  const [chartData, setChartData] = useState<any>({
    labels: ['Payment Done', 'Payment Pending'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#4318FF', '#6AD2FF']
      }
    ]
  }); /// State to store fetched chart data
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading state

  const filterOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'halfyearly', label: 'Half Yearly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  // Calculate date range based on the selected filter
  const calculateDateRange = (filter: string) => {
    const now = new Date();
    let startDate = new Date(now);
    let endDate = new Date(now);

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

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  };

  // Handle filter change
  const handleFilterChange = (selectedOption: any) => {
    setSelectedFilter(selectedOption.value);
  };

  // Fetch the dashboard data based on the date range and selected filter
  useEffect(() => {
    const { startDate, endDate } = calculateDateRange(selectedFilter);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDashboardData({ startDate, endDate });

        const chartData = {
          labels: ['Payment Done', 'Payment Pending'],
          datasets: [
            {
              data: [
                data.totalPaymentReceived ? data.totalPaymentReceived : 0,
                data.totalPaymentOutstanding ? data.totalPaymentOutstanding : 0
              ],
              backgroundColor: ['#4318FF', '#6AD2FF']
            }
          ]
        };
        setChartData(chartData); // Set fetched chart data
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter]);

  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="inline-block">Payment Analysis</CardTitle>
        {/* Dropdown for filtering */}
        <Select
          options={filterOptions}
          defaultValue={filterOptions[0]}
          onChange={handleFilterChange}
          className="inline-block h-10 w-40 text-sm"
          isSearchable={false}
        />
      </CardHeader>
      {loading ? (
        <Loader />
      ) : (
        <CardContent className="flex h-[50%] items-center justify-center">
          {chartData ? (
            <PieChart data={chartData} />
          ) : (
            <div>No data available for the selected range.</div>
          )}
        </CardContent>
      )}
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
