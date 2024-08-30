import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { IconifyIcon } from '@iconify/react';
import { Icon } from '@iconify/react';

// Define the type for item
interface DashboardContentItem {
  id: number;
  title: string;
  count: number | string;
  icon: IconifyIcon;
}

interface DashboardContentCardProps {
  data: DashboardContentItem;
}

const DashboardContentCard: React.FC<DashboardContentCardProps> = ({
  data
}) => {
  return (
    <Card key={data.id} className="px-4">
      <div className="flex items-center">
        <div className="rounded-full bg-secondary p-3">
          <Icon icon={data.icon} className="text-2xl" />
        </div>
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {data.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{data.count}</div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

import { dashboardItems } from '@/constants/data.constants';

const DashboardContent = () => {
  return dashboardItems?.map((item, i) => (
    <DashboardContentCard data={item} key={i} />
  ));
};

export default DashboardContent;
