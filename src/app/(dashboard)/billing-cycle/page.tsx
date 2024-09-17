'use client';
// import { DataTable } from '@/components/fields/Table';
import BillingCyleForm from '@/components/forms/billing-cycle.form';
import CardWrapper from '@/components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
// import billingCycleColumn from '@/utils/tableColumn/billing-cycle.column';
import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const BillingCycle = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-10 align-middle">
        <CardWrapper>
          <div className="flex justify-between">
            <div className="flex gap-10">
              <Avatar>
                <AvatarImage
                  src="https://picsum.photos/40"
                  alt="User Name"
                  className="rounded-full"
                />
              </Avatar>
              <div className="items-cente flex flex-col">
                <div>User Name</div>
                <div className="text-xs text-muted-foreground">userIdName</div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col items-center justify-center">
                <div className="text-xs text-muted-foreground">Total Bill</div>
                <div>Rs. 200,000</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-xs text-muted-foreground">
                  Total Days Left
                </div>
                <div>25</div>
              </div>
            </div>
          </div>
        </CardWrapper>
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
          >
            Cancel
          </Button>
          <Button>Reminder</Button>
        </div>
      </div>
      <BillingCyleForm />
      {/* <DataTable columns={billingCycleColumn} data={[]} path="" /> */}
    </>
  );
};

export default BillingCycle;
