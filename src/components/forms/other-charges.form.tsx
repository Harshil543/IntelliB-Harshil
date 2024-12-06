import CardWrapper from '@/components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import { createOtherCharges } from '@/services/other-charges.service';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TextInput from '../fields/TextInput';
import { Label } from '@radix-ui/react-label';

export default function OtherChargesForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [billingModel, setBillingModel] = useState('FIXED');

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        name: data?.value?.name,
        chargeType: billingModel,
        value: data?.value?.value,
        applicableOn: data?.value?.applicableOn,
        isActive: data?.value?.isActive
      };

      return await createOtherCharges({ payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['other-charges'] });
      toast.success(`${'Added'} successfully`);
      router.push('/settings/other-charges');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm({
    defaultValues: {
      value: 0,
      name: '',
      chargeType: '',
      applicableOn: 'ALL',
      isActive: true
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    }
  });

  return (
    <CardWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="grid grid-cols-1"
      >
        <div className="mt-4 grid w-full grid-cols-1 items-center gap-0 md:grid-cols-4">
          <Label htmlFor="chargesName" className="text-md">
            Charges Name
          </Label>
          <form.Field name="name">
            {(field) => <TextInput field={field} placeholder="Charges name" />}
          </form.Field>
        </div>

        <div className="mt-4 grid w-full grid-cols-1 items-center gap-0 md:grid-cols-4">
          <Label className="text-md">Choose Billing Model</Label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="chargeType"
                value="FIXED"
                checked={billingModel === 'FIXED'}
                onChange={() => setBillingModel('FIXED')}
              />
              <span>Fixed Amount</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="chargeType"
                value="PERCENTAGE"
                checked={billingModel === 'PERCENTAGE'}
                onChange={() => setBillingModel('PERCENTAGE')}
              />
              <span>Percentage</span>
            </label>
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-1 items-center gap-0 md:grid-cols-4">
          <Label htmlFor="amountPercentage" className="text-md">
            Amount/Percentage
          </Label>
          <form.Field name="value">
            {(field) => (
              <TextInput
                type="number"
                field={field}
                placeholder="Amount/Percentage"
              />
            )}
          </form.Field>
        </div>
        <div className="col-span-full mt-10 flex space-x-4">
          <Button
            type="button"
            className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        </div>

        {mutation.isError && (
          <div className="col-span-full text-red-500">
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'An error occurred during submission.'}
          </div>
        )}
      </form>
    </CardWrapper>
  );
}
