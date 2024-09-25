// // src/app/(dashboard)/meter/MeterList.tsx
// 'use client';

// import { DataTable } from '@/components/fields/Table';
// import React, { useState } from 'react';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import meterColumn from '@/utils/tableColumn/meter.column';
// import { getMeter } from '@/services/meter.service';
// import Loader from '@/components/CommonComponents/Loader';

// interface MeterListProps {
//   addButton?: React.ReactNode;
//   leasableUnitId: number;
// }

// const MeterList = ({ addButton, leasableUnitId }: MeterListProps) => {
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const { status, isError, data } = useQuery({
//     queryKey: ['meter', page, searchQuery],
//     queryFn: () => getMeter(page, searchQuery, leasableUnitId),
//     placeholderData: keepPreviousData
//   });

//   const handlePrevious = () => {
//     setPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNext = () => {
//     setPage((prev) => prev + 1);
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   if (status === 'pending') {
//     return <Loader />;
//   }

//   return (
//     <div>
//       <DataTable
//         columns={meterColumn}
//         path="/meter/register-meter"
//         data={isError ? [] : data?.items}
//         pagination={data?.pagination}
//         handleNext={handleNext}
//         handlePrevious={handlePrevious}
//         onSearch={handleSearch}
//         addButton={addButton}
//       />
//     </div>
//   );
// };

// export default MeterList;

import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;
