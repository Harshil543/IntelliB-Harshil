'use client';
import Loader from '@/components/CommonComponents/Loader';
import MeterReadingForm from '@/components/forms/meter.reading.form';
import { getMeterReadingById } from '@/services/meter-reading.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const ViewMeterReading = () => {
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['meter-reading', id],
    queryFn: () => getMeterReadingById(Number(id))
  });
  if (status === 'pending') {
    return <Loader />;
  }

  return <MeterReadingForm initialValues={data} />;
};

export default ViewMeterReading;
