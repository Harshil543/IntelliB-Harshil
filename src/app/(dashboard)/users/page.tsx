'use client';
import React, { useState } from 'react';
// import FiltersTag from '../../component/filtersTag';
// import ToggleButton from '../../component/toggleButton';
import ListView from './listView';
import GridView from './gridView';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function TenantUsers() {
  const [listView, setListView] = useState(true);
  const router = useRouter();
  return (
    <div className="mt-[24px] rounded-[20px] bg-[#ffffff] p-[15px]">
      <div className="flex flex-wrap items-center justify-end gap-[10px]">
        <Button variant="outline" onClick={() => setListView(!listView)}>
          <Icon
            icon={`mdi:${listView ? 'view-list' : 'view-dashboard'}`}
            className="h-6 w-6"
          />
        </Button>
        <Button variant="outline" onClick={() => {}}>
          Filter
        </Button>
        <Button onClick={() => router.push('/users/add-user')}>Add User</Button>
      </div>
      {listView ? <ListView /> : <GridView />}
    </div>
  );
}
