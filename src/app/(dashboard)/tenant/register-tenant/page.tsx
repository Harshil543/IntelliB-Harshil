'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you're using ShadCN UI for buttons
import {
  TenantBillingForm,
  TenantDataForm,
  TenantLeasableForm
} from '@/components/forms/tenant.form';

export default function TenantRegister() {
  const [currentStep, setCurrentStep] = useState(1);

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="p-4">
      <div className="mt-6">
        <div className="mb-2 flex justify-between">
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className={`text-sm font-bold ${currentStep >= step ? 'textprimary' : 'text-gray-400'}`}
            >
              {step === 1
                ? 'Tenant Data'
                : step === 2
                  ? 'Leasable Unit Data'
                  : 'Billing Data'}
            </span>
          ))}
        </div>

        <div className="relative h-2 w-full rounded-lg bg-gray-200">
          <div
            className="absolute left-0 top-0 h-2 rounded-lg bg-primary transition-all"
            style={{
              width: `${(currentStep / 3) * 100}%`
            }}
          ></div>
        </div>
      </div>

      {currentStep === 1 && (
        <div>
          <TenantDataForm />
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              className="w-28 rounded-lg"
              onClick={handleNextStep}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <TenantLeasableForm />
          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              className="w-28 rounded-lg"
              onClick={handlePrevStep}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="w-28 rounded-lg"
              onClick={handleNextStep}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <TenantBillingForm />
          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              className="w-28 rounded-lg"
              onClick={handlePrevStep}
            >
              Previous
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
