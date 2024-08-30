import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { paymentHistory } from '@/constants/data.constants';
import TransactionCard from './TransactionCard';

const RecentTransaction = () => {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Recent Payments</CardTitle>
        <CardTitle className="cursor-pointer rounded-full bg-secondary px-5 py-1 text-xs font-medium">
          See All
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {paymentHistory?.map((item, i) => (
          <TransactionCard item={item} key={i} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
