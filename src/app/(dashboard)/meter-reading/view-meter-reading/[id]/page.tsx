'use client';
import { getMeterReadingById } from '@/services/meter-reading.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const ViewMeterReading = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['meter-reading', id],
    queryFn: () => getMeterReadingById(Number(id))
  });
  console.log('data', data);

  return <div>ViewMeterReading</div>;
};

export default ViewMeterReading;
