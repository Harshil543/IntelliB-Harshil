// 'use client';

// import * as React from 'react';
// import { useParams } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { getMeterById } from '@/services/meter.service';
// import MeterForm from '@/components/forms/meter.form';

// export default function MeterUpdate() {
//   const { id } = useParams();
//   const { data } = useQuery({
//     queryKey: ['meter', id],
//     queryFn: () => getMeterById(Number(id))
//   });

//   return (
//     <div>
//       <MeterForm initialValues={data} />
//     </div>
//   );
// }

import React from 'react';

const UpdateMeter = () => {
  return <div>UpdateMeter</div>;
};

export default UpdateMeter;
