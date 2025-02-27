import UserGridCard from '@/app/tenant/component/userGridCard';
import React from 'react';

export default function GridView() {
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
    <div className="custom-scrollbar mt-[22px] grid h-[calc(100vh-236px)] grid-cols-1 gap-[10px] overflow-y-auto pr-[10px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((item, i) => (
        <div key={i}>
          <UserGridCard {...item} />
        </div>
      ))}
    </div>
  );
}
