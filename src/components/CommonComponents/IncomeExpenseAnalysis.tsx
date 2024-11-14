'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { getDashboardLineChartData } from '@/services/dashboard.service';
import checked from '@iconify/icons-mdi/check-circle';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import { filterOptions } from '@/constants/data.constants';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

// LineChart Component
interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return <Line data={data} options={{ maintainAspectRatio: false }} />;
};

// IncomeExpenseAnalysis Component
const IncomeExpenseAnalysis = () => {
  const [selectedFilter, setSelectedFilter] = useState('monthly');
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handle filter change
  const handleFilterChange = (selectedOption: any) => {
    setSelectedFilter(selectedOption.value);
  };

  // Fetch data based on selected filter
  useEffect(() => {
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

    const { startDate, endDate } = calculateDateRange(selectedFilter);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDashboardLineChartData(
          { startDate, endDate },
          selectedFilter
        );

        const formattedData = {
          labels: data.map((entry: { date: string }) => entry.date),
          datasets: [
            {
              label: 'Paid Amount',
              data: data.map(
                (entry: { paidAmount: number }) => entry.paidAmount
              ),
              borderColor: '#4318FF',
              backgroundColor: '#4318FF',
              fill: false
            },
            {
              label: 'Unpaid Amount',
              data: data.map(
                (entry: { unpaidAmount: number }) => entry.unpaidAmount
              ),
              borderColor: '#6AD2FF',
              backgroundColor: '#6AD2FF',
              fill: false
            }
          ]
        };

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching income/expense data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter]);

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="inline-block">
            Income & Expense Analysis
          </CardTitle>
          <CardTitle className="flex items-center gap-2 align-middle text-sm font-medium text-green-500">
            <Icon icon={checked} /> <p>On track of this area</p>
          </CardTitle>
        </div>
        <Select
          options={filterOptions}
          defaultValue={filterOptions[0]}
          onChange={handleFilterChange}
          className="inline-block h-10 w-40 text-sm"
          isSearchable={false}
        />
      </CardHeader>
      <div className="flex w-full items-center justify-center">
        {loading ? (
          <div className="mt-5 flex h-8 items-center justify-start align-middle">
            <div className="h-5 w-5 animate-spin rounded-full border-t-4 border-primary"></div>
          </div>
        ) : (
          <CardContent className="flex w-full flex-row flex-wrap gap-4 p-4 md:flex-nowrap">
            <div className="relative h-[300px] w-full">
              {chartData ? (
                <LineChart data={chartData} />
              ) : (
                <div>No data available for the selected filter.</div>
              )}
            </div>
          </CardContent>
        )}
      </div>
    </Card>
  );
};

export default IncomeExpenseAnalysis;
