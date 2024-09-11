import React from 'react';
import {
  FixedBillingModel,
  SlabWiseRateBillingModel
} from '@/components/forms/billing-model.form';

const BillingModel = () => {
  return (
    <>
      <FixedBillingModel />
      <SlabWiseRateBillingModel />
    </>
  );
};

export default BillingModel;
