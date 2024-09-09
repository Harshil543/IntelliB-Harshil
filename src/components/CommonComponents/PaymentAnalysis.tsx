'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle
} from '@components/ui/card';
import {
  pieChartDataYearly,
  pieChartDataMonthly,
  pieChartDataQuarterly
} from '@/constants/data.constants';
import Image from 'next/image';
import verticleSeprator from '@assets/images/verticleSeprator.png';
import Select from 'react-select';

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
  // State to hold selected filter option
  const [selectedFilter, setSelectedFilter] = useState('yearly');

  // Dropdown options
  const filterOptions = [
    { value: 'yearly', label: 'Yearly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  // Handle filter change
  const handleFilterChange = (selectedOption: any) => {
    setSelectedFilter(selectedOption.value);
  };

  // Get the appropriate data based on the selected filter
  let chartData;
  if (selectedFilter === 'yearly') {
    chartData = pieChartDataYearly;
  } else if (selectedFilter === 'monthly') {
    chartData = pieChartDataMonthly;
  } else {
    chartData = pieChartDataQuarterly;
  }

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
      <CardContent className="flex h-[50%] items-center justify-center">
        <PieChart data={chartData} />
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
              <div className="text-lg font-bold">63%</div>
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
              <div className="text-lg font-bold">25%</div>
            </CardContent>
          </div>
        </Card>
      </CardFooter>
    </Card>
  );
};

export default PaymentAnalysis;
