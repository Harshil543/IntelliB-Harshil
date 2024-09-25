// 'use client';

// import * as React from 'react';
// import LeasableUnitForm from '@/components/forms/leasable-unit.form';
// import CardWrapper from '@/components/layout/CardWrapper';
// import Heading from '@/components/fields/Heading';
// import { MeterFormModal } from '@/components/CommonComponents/meter.modal';
// import { Button } from '@/components/ui/button';
// import Meter from '../../meter/page';

// export default function LeasableUnitRegister() {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [leasableUnitId, setLeasableUnitId] = React.useState(null);

//   return (
//     <>
//       <LeasableUnitForm setLeasableUnitId={setLeasableUnitId} />
//       {leasableUnitId ? (
//         <CardWrapper>
//           <Heading>Meter Data</Heading>
//           <Meter
//             addButton={<Button onClick={() => setIsOpen(true)}>Add</Button>}
//             leasableUnitId={leasableUnitId}
//           />
//         </CardWrapper>
//       ) : null}
//       <MeterFormModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         leasableUnitId={leasableUnitId}
//       />
//     </>
//   );
// }

// components/LeasableUnitRegister.tsx
'use client';

import * as React from 'react';
import LeasableUnitForm from '@/components/forms/leasable-unit.form';
import CardWrapper from '@/components/layout/CardWrapper';
import Heading from '@/components/fields/Heading';
import { MeterFormModal } from '@/components/CommonComponents/meter.modal';
import { Button } from '@/components/ui/button';
import Meter from '../../meter/page';

export default function LeasableUnitRegister() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [leasableUnitId, setLeasableUnitId] = React.useState<number | null>(
    null
  );

  return (
    <>
      <LeasableUnitForm setLeasableUnitId={setLeasableUnitId} />
      {leasableUnitId ? (
        <CardWrapper>
          <Heading>Meter Data</Heading>
          <Meter
            addButton={<Button onClick={() => setIsOpen(true)}>Add</Button>}
            leasableUnitId={leasableUnitId}
          />
        </CardWrapper>
      ) : null}
      <MeterFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        leasableUnitId={leasableUnitId}
      />
    </>
  );
}
