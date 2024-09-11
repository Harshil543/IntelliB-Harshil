'use client';
import {
  createFixedBillingModel,
  updateFixedBillingModel
} from '@/services/billing-model.service';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CardWrapper from '../layout/CardWrapper';
import Heading from '../fields/Heading';
import TextInput from '../fields/TextInput';
import { Button } from '../ui/button';
import editIcon from '@iconify/icons-mdi/edit';
import { Icon } from '@iconify/react';
import { useState } from 'react';

// Interface for form values, including id for update cases
interface FixedBillingFormValue {
  id?: number;
  rs: number;
  ps: number;
}

interface FixedBillingFormProps {
  initialValues?: FixedBillingFormValue;
}

interface SlabWiseRateBillingFormValue {
  id?: number;
  rs: number;
  ps: number;
  slabStartUnit: number;
  slabEndUnit: number;
}

interface SlabWiseRateFixedBillingFormProps {
  initialValues?: SlabWiseRateBillingFormValue;
}

// Fixed Billing Model
export const FixedBillingModel = ({ initialValues }: FixedBillingFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: FixedBillingFormValue) => {
      if (initialValues?.id) {
        return await updateFixedBillingModel(initialValues.id, data);
      } else {
        return await createFixedBillingModel(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-model'] });
      router.push('/billing-model/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<FixedBillingFormValue>({
    defaultValues: initialValues || {
      rs: 0,
      ps: 0
    },
    onSubmit: async (values: any) => {
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
      >
        <div className="flex justify-between">
          <div className="flex items-end gap-5">
            <Heading className="text-lg">Fixed Flat Race</Heading>
            <Heading className="text-lg">₹</Heading>
            <div className="align-center flex w-12 items-center justify-center align-middle">
              <form.Field
                name="rs"
                validators={{
                  onChange: ({ value }) => {
                    if (value === null || isNaN(value))
                      return 'RS is required and must be a number';
                    return undefined;
                  }
                }}
              >
                {(field) => (
                  <TextInput
                    label=""
                    type="number"
                    field={field}
                    placeholder="Enter RS value"
                    disabled={false}
                  />
                )}
              </form.Field>
            </div>
            <Heading className="text-lg">.</Heading>
            <div className="align-center flex w-12 items-center justify-center align-middle">
              <form.Field
                name="ps"
                validators={{
                  onChange: ({ value }) => {
                    if (value === null || isNaN(value))
                      return 'PS is required and must be a number';
                    return undefined;
                  }
                }}
              >
                {(field) => (
                  <TextInput
                    label=""
                    type="number"
                    field={field}
                    placeholder="Enter PS value"
                    disabled={false}
                  />
                )}
              </form.Field>
            </div>
          </div>
          <div>
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
            <Button
              type="button"
              className="text-dark hover:text-dark ml-3 bg-secondary hover:bg-opacity-80"
              onClick={() => router.back()}
            >
              <Icon icon={editIcon} />
            </Button>
          </div>
        </div>
      </form>
    </CardWrapper>
  );
};

// Slab Wise Billing Model

export const SlabWiseRateBillingModel = ({
  initialValues
}: SlabWiseRateFixedBillingFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Initialize slab state with one slab
  const [slabs, setSlabs] = useState([
    {
      slabStartUnit: 0,
      slabEndUnit: 0,
      rs: 0,
      ps: 0,
      disabled: false
    }
  ]);

  const mutation = useMutation({
    mutationFn: async (data: FixedBillingFormValue) => {
      if (initialValues?.id) {
        return await updateFixedBillingModel(initialValues.id, data);
      } else {
        return await createFixedBillingModel(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-model'] });
      router.push('/billing-model/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<SlabWiseRateBillingFormValue>({
    defaultValues: initialValues || {
      rs: 0,
      ps: 0,
      slabStartUnit: 0,
      slabEndUnit: 0
    },
    onSubmit: async (values: any) => {
      await mutation.mutateAsync(values);
    }
  });

  const handleAddSlab = () => {
    setSlabs((prevSlabs) => [
      ...prevSlabs.map((slab) => ({ ...slab, disabled: true })),
      {
        slabStartUnit: 0,
        slabEndUnit: 0,
        rs: 0,
        ps: 0,
        disabled: false
      }
    ]);
  };

  return (
    <CardWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Heading className="text-lg">Slab-Wise Rate</Heading>
        <table className="w-full">
          <thead>
            <tr className="rounded-md h-10 bg-secondary">
              <th>Slab</th>
              <th>Slab Start Unit</th>
              <th>Slab End Unit</th>
              <th>RS.</th>
              <th>PS.</th>
            </tr>
          </thead>
          <tbody>
            {slabs.map((slab, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="px-24">
                  <form.Field name={`slabs[${index}].slabStartUnit`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        field={field}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="px-24">
                  <form.Field name={`slabs[${index}].slabEndUnit`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        field={field}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="px-24">
                  <form.Field name={`slabs[${index}].rs`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        field={field}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="px-24">
                  <form.Field name={`slabs[${index}].ps`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        field={field}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-5 flex w-full items-center justify-center align-middle">
          <Button type="button" onClick={handleAddSlab}>
            Add Slab
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
