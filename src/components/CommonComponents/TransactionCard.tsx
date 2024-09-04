import React from 'react';
import transactionImage from '@assets/images/transactionimg.png';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import eyeIcon from '@iconify/icons-mdi/eye';
import { Icon } from '@iconify/react';

// Define the type for item
interface TransactionItem {
  id: number;
  title: string;
  billNo: string;
  amount: number;
  dueDate: number;
}

interface TransactionCardProps {
  item: TransactionItem;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ item }) => {
  return (
    <Card key={item.id} className="my-4 px-4">
      <div className="flex items-center justify-between align-middle">
        <div className="flex items-center justify-center gap-5 align-middle">
          <Image
            src={transactionImage}
            alt="Transaction Card Image"
            className="h-14 w-14"
          />
          <div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm font-medium text-muted-foreground">
              Bill No. {item.billNo}
            </CardContent>
          </div>
        </div>
        <div>
          <CardTitle className="text-md">Rs. {item.amount}</CardTitle>
        </div>
        <div>
          <Icon icon={eyeIcon} className="cursor-pointer text-2xl" />
        </div>
        <div>
          <CardContent className="text-sm font-medium text-muted-foreground">
            Due in {item.dueDate} Days
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default TransactionCard;
