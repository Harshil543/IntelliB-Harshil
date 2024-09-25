'use client';

import * as React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getLeasableUnitById } from '@/services/leasable-unit.service';
import LeasableUnitForm from '@/components/forms/leasable-unit.form';
import CardWrapper from '@/components/layout/CardWrapper';
import Heading from '@/components/fields/Heading';
import { Button } from '@/components/ui/button';
import { MeterFormModal } from '@/components/CommonComponents/meter.modal';
import MeterList from '@/components/CommonComponents/MeterList';

export default function LeasableUnitUpdate() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { id } = useParams();
  const pathname = usePathname();
  const lastSegment = pathname.split('/').filter(Boolean).pop();
  const leasableUnitId = Number(lastSegment) || 0;

  const { data } = useQuery({
    queryKey: ['leasable-unit', id],
    queryFn: () => getLeasableUnitById(Number(id))
  });

  return (
    <div>
      <LeasableUnitForm initialValues={data} />
      <CardWrapper>
        <Heading>Meter Data</Heading>
        <MeterList
          addButton={<Button onClick={() => setIsOpen(true)}>Add</Button>}
          leasableUnitId={leasableUnitId}
        />
      </CardWrapper>
      <MeterFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        leasableUnitId={leasableUnitId}
      />
    </div>
  );
}
