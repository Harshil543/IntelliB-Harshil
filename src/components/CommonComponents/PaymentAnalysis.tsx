// components/PieChart.tsx
'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle
} from '@components/ui/card';
import { pieChartData } from '@/constants/data.constants';
import Image from 'next/image';
import verticleSeprator from '@assets/images/verticleSeprator.png';

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
  return (
    <>
      <Card className="col-span-4 md:col-span-3">
        <CardHeader>
          <CardTitle>Payment Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[50%] items-center justify-center">
          <PieChart data={pieChartData} />
        </CardContent>
        <CardFooter className="flex items-center justify-center align-middle">
          <Card className="flex w-fit justify-center text-center align-middle">
            <div>
              <CardHeader className="flex flex-row items-center justify-center gap-0 space-y-0 pb-0">
                {/* <Icon icon={dotIcon} fontSize={50} color="#4318FF" /> */}
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
                {/* <Icon icon={dotIcon} fontSize={50} color="#6AD2FF" /> */}
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
    </>
  );
};

export default PaymentAnalysis;
