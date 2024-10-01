import { FlatRateBillingModel } from '@/components/forms/flat-billing-model-rate.form';
import { SlabWiseRateBillingModel } from '@/components/forms/slab-wise-billing-model-rate.form';
import React from 'react';

const BillingModel = () => {
  return (
    <>
      <FlatRateBillingModel />
      <SlabWiseRateBillingModel />
    </>
  );
};

export default BillingModel;
