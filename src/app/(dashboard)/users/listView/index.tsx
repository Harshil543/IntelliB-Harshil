import UserListItems from '@/app/tenant/component/userListItems';
import UserListItemsHeader from '@/app/tenant/component/userListItemsHeader';
import React from 'react';

export default function ListView() {
  const data = [
    {
      name: 'User 1',
      email: 'jake@cornerstore.com',
      contactNumber: '1234567890',
      designation: 'Store Manager',
      role: 'Process bill'
    },
    {
      name: 'User 1',
      email: 'jake@cornerstore.com',
      contactNumber: '1234567890',
      designation: 'Store Manager',
      role: 'Process bill'
    },
    {
      name: 'User 1',
      email: 'jake@cornerstore.com',
      contactNumber: '1234567890',
      designation: 'Store Manager',
      role: 'Process bill'
    },
    {
      name: 'User 1',
      email: 'jake@cornerstore.com',
      contactNumber: '1234567890',
      designation: 'Store Manager',
      role: 'Process bill'
    }
  ];
  return (
    <div className="mt-[22px] grid gap-[5px]">
      <UserListItemsHeader />
      {data.map((item, i) => (
        <div key={i}>
          <UserListItems index={i} {...item} />
        </div>
      ))}
    </div>
  );
}
