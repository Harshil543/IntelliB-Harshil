'use client';
import Loader from '@/components/CommonComponents/Loader';
import TextInput from '@/components/fields/TextInput';
import CardWrapper from '@/components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  createOtherCharges,
  getOtherCharges
} from '@/services/other-charges.service';
import { useForm } from '@tanstack/react-form';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function OtherChargesForm() {
  const queryClient = useQueryClient();

  const [billingModel, setBillingModel] = useState('FIXED');
  const [showForm, setShowForm] = useState(false);

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, data } = useQuery({
    queryKey: ['other-charges', page, searchQuery, limit],
    queryFn: () => getOtherCharges(page, searchQuery, limit),
    placeholderData: keepPreviousData
  });

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // Update this to pass the full data object as the payload
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
      setShowForm(false);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setShowForm(true)}>Add Other Charges</Button>
      </div>

      <CardWrapper>
        <>
          <Input
            placeholder="Search..."
            className="w-full rounded-3xl border-border bg-background"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="my-10 grid w-full grid-cols-3 items-center gap-4">
            {data?.items?.map((item: any, i: number) => {
              const formattedLabel =
                item.name.length <= 3
                  ? item.name.toUpperCase()
                  : item.name.charAt(0).toUpperCase() +
                    item.name.slice(1).toLowerCase();

              return (
                <div key={i}>
                  <Label htmlFor={item.name}>{formattedLabel}</Label>

                  <div className="h-10 rounded-lg border border-border p-2 text-sm">
                    {item.chargeType === 'FIXED' && '₹'} {item.value}
                    {item.chargeType === 'PERCENTAGE' && '%'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex w-full items-end justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!data?.items || page >= data?.totalPages}
            >
              Next
            </Button>
            <Button variant="outline" size="sm">
              <select
                value={limit}
                onChange={handleLimitChange}
                className="h-full w-full bg-transparent"
              >
                {[10, 50, 100].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Button>
          </div>
        </>
      </CardWrapper>

      {showForm && (
        <CardWrapper>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="grid w-full grid-cols-3 items-center gap-0">
              <Label htmlFor="chargesName">Charges Name</Label>
              <form.Field name="name">
                {(field) => (
                  <TextInput field={field} placeholder="Charges name" />
                )}
              </form.Field>
            </div>

            <div className="mt-4 grid w-full grid-cols-3 items-center gap-0">
              <Label>Choose Billing Model</Label>
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

            <div className="mt-4 grid w-full grid-cols-3 items-center gap-0">
              <Label htmlFor="amountPercentage">Amount/Percentage</Label>
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
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || mutation.isPending}
                  >
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
      )}
    </div>
  );
}
