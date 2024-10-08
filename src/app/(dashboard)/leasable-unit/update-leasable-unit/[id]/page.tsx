'use client';

import * as React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getLeasableUnitById } from '@/services/leasable-unit.service';
import LeasableUnitForm from '@/components/forms/leasable-unit.form';
import CardWrapper from '@/components/layout/CardWrapper';
import Heading from '@/components/fields/Heading';
import { Button } from '@/components/ui/button';
import { MeterFormModal } from '@/components/CommonComponents/meter.modal';
import MeterList from '@/components/CommonComponents/MeterList';
import { getMeter } from '@/services/meter.service';
import Loader from '@/components/CommonComponents/Loader';

export default function LeasableUnitUpdate() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { id } = useParams();
  const pathname = usePathname();
  const lastSegment = pathname.split('/').filter(Boolean).pop();
  const leasableUnitId = Number(lastSegment) || 0;

  const {
    data: leasableData,
    isLoading: isLoadingLeasable,
    isError: isErrorLeasable
  } = useQuery({
    queryKey: ['leasable-unit', id],
    queryFn: () => getLeasableUnitById(Number(id)),
    placeholderData: keepPreviousData
  });

  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const {
    data: meterData,
    status,
    isError: isErrorMeter
  } = useQuery({
    queryKey: ['meter', page, searchQuery],
    queryFn: () => getMeter(page, searchQuery, leasableUnitId)
  });

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  console.log('meterData', meterData);

  if (isLoadingLeasable || status === 'pending') {
    return <Loader />;
  }

  if (isErrorLeasable) {
    return <div>Error loading leasable unit data</div>;
  }

  if (isErrorMeter) {
    return <div>Error loading meter data</div>;
  }

  return (
    <div>
      <LeasableUnitForm initialValues={leasableData} />
      <CardWrapper>
        <Heading>Meter Data</Heading>
        <MeterList
          data={meterData}
          isError={isErrorMeter}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSearch={handleSearch}
          addButton={<Button onClick={() => setIsOpen(true)}>Add</Button>}
        />
      </CardWrapper>
      {isOpen && (
        <MeterFormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          leasableUnitId={leasableUnitId}
        />
      )}
    </div>
  );
}
