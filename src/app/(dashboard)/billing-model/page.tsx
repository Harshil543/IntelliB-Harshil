'use client';
import { FlatRateBillingModel } from '@/components/forms/flat-billing-model-rate.form';
import { SlabWiseRateBillingModel } from '@/components/forms/slab-wise-billing-model-rate.form';
import CardWrapper from '@/components/layout/CardWrapper';
import React, { useState } from 'react';

const BillingModel = () => {
  const meterTypes = [
    { name: 'electricity', label: 'Electricity' },
    { name: 'diesel_generator', label: 'Diesel Generator' }
  ];
  const [activeTab, setActiveTab] = useState(meterTypes[0].name);
  const [billingType, setBillingType] = useState('flat');

  const handleTabClick = (name: string) => {
    setActiveTab(name);
  };

  const handleBillingTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingType(e.target.value);
  };

  return (
    <>
      <div className="mt-5 flex gap-3">
        {meterTypes.map((item, i) => (
          <div
            key={i}
            className={`cursor-pointer p-2 capitalize ${activeTab === item.name ? 'border-b-2 border-primary font-bold' : ''}`}
            onClick={() => handleTabClick(item.name)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <CardWrapper>
        <h2 className="mt-4 text-lg font-semibold capitalize">{activeTab}</h2>
        <div className="mt-4">
          <div className="mb-4 flex gap-4">
            <label className="flex items-center justify-center gap-2 align-middle">
              <input
                type="radio"
                value="flat"
                checked={billingType === 'flat'}
                onChange={handleBillingTypeChange}
              />
              <span>Flat Rate</span>
            </label>
            <label className="flex items-center justify-center gap-2 align-middle">
              <input
                type="radio"
                value="slab"
                checked={billingType === 'slab'}
                onChange={handleBillingTypeChange}
              />
              <span>Slab Wise</span>
            </label>
          </div>

          {billingType === 'flat' && (
            <FlatRateBillingModel meterType={activeTab} />
          )}
          {billingType === 'slab' && (
            <SlabWiseRateBillingModel meterType={activeTab} />
          )}
        </div>
      </CardWrapper>
    </>
  );
};

export default BillingModel;
