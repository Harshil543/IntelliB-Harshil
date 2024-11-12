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
import Loader from './Loader';

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
  const filterOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'half-yearly', label: 'Half Yearly' },
    { value: 'yearly', label: 'Yearly' }
  ];

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
        return new Date(year, month + 1, 0);
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

        case 'half-yearly':
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

    const { startDate, endDate } = calculateDateRange(selectedFilter);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDashboardLineChartData(
          { startDate, endDate },
          selectedFilter
        );

        // Format the data for the chart
        const formattedData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Paid Amount',
              data: data.incomeData,
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.2)'
            },
            {
              label: 'Unpaid Amount',
              data: data.expenseData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)'
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
      {loading ? (
        <Loader />
      ) : (
        <CardContent className="flex flex-row flex-wrap gap-4 p-4 md:flex-nowrap">
          <div className="relative h-[300px] w-full">
            {chartData ? (
              <LineChart data={chartData} />
            ) : (
              <div>No data available for the selected filter.</div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default IncomeExpenseAnalysis;
