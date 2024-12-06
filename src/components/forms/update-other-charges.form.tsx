import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import CardWrapper from '@/components/layout/CardWrapper';
import {
  getOtherCharges,
  updateOtherCharges
} from '@/services/other-charges.service';
import Loader from '../CommonComponents/Loader';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function UpdateOtherChargesForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updatedItems, setUpdatedItems] = useState<
    { [key: string]: string | number }[]
  >([]);

  const { isLoading, data } = useQuery({
    queryKey: ['other-charges'],
    queryFn: () => getOtherCharges()
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: any) => {
      return updateOtherCharges({ payload: { items: updatedData } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['other-charges'] });
      toast.success(`Updated successfully`);
      router.push('/settings/other-charges');
    },
    onError: (error: Error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  useEffect(() => {
    if (data?.items) {
      setUpdatedItems(
        data.items.map((item: any) => ({
          ...item,
          chargeType: item.chargeType || 'FIXED'
        }))
      );
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedData = [...updatedItems];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    setUpdatedItems(updatedData);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(updatedItems);
  };

  return (
    <CardWrapper>
      <form onSubmit={handleSubmit} className="grid grid-cols-1">
        {updatedItems?.map((item: any, i) => (
          <div key={i} className="border-b py-4">
            {/* Charges Name Section */}
            <div className="mt-4 grid w-full grid-cols-1 items-center gap-0 md:grid-cols-4">
              <Label htmlFor={`chargesName-${i}`} className="text-md">
                Charges Name
              </Label>
              <input
                id={`chargesName-${i}`}
                value={item.name}
                onChange={(e) => handleInputChange(i, 'name', e.target.value)}
                placeholder="Charges name"
                className="rounded-md flex h-10 w-full rounded-lg border border-border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            {/* Billing Model Section */}
            <div className="mt-4 grid w-full grid-cols-1 items-center gap-0 md:grid-cols-4">
              <Label className="text-md">Choose Billing Model</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`chargeType-${i}`}
                    value="FIXED"
                    checked={item.chargeType === 'FIXED'}
                    onChange={() => handleInputChange(i, 'chargeType', 'FIXED')}
                  />
                  <span>Fixed Amount</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`chargeType-${i}`}
                    value="PERCENTAGE"
                    checked={item.chargeType === 'PERCENTAGE'}
                    onChange={() =>
                      handleInputChange(i, 'chargeType', 'PERCENTAGE')
                    }
                  />
                  <span>Percentage</span>
                </label>
              </div>
            </div>

            {/* Amount/Percentage Section */}
            <div className="mt-4 grid w-full grid-cols-1 items-center gap-0 md:grid-cols-4">
              <Label htmlFor={`amountPercentage-${i}`} className="text-md">
                Amount/Percentage
              </Label>
              <input
                id={`amountPercentage-${i}`}
                value={item.value}
                type="number"
                onChange={(e) => handleInputChange(i, 'value', e.target.value)}
                placeholder="Amount/Percentage"
                className="rounded-md flex h-10 w-full rounded-lg border border-border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>
        ))}

        <div className="col-span-full mt-10 flex space-x-4">
          <Button
            type="button"
            className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
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
