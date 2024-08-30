'use client';
import React from 'react';
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
import { lineChartData } from '@/constants/data.constants';
import checked from '@iconify/icons-mdi/check-circle';
import { Icon } from '@iconify/react';
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
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Income & Expense Analysis</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 p-4">
        <div className="w-72">
          <CardTitle className="text-lg font-bold">Rs. 200,000</CardTitle>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Income & Expense
          </CardTitle>
          <CardTitle className="mt-5 flex items-center gap-2 align-middle text-sm font-medium text-green-500">
            <Icon icon={checked} /> <p>On track of this area</p>
          </CardTitle>
        </div>

        <div className="relative h-[300px] w-full">
          <LineChart data={lineChartData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseAnalysis;
