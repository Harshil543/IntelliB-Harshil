'use client';
import {
  createFixedBillingModel,
  updateFixedBillingModel
} from '@/services/billing-model.service';
import { FormApi, useForm } from '@tanstack/react-form';
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
          <div className="flex gap-5">
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
            <button
              type="button"
              className="text-dark hover:text-dark ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary align-middle hover:bg-opacity-80"
              onClick={() => router.back()}
            >
              <Icon icon={editIcon} />
            </button>
          </div>
        </div>
      </form>
    </CardWrapper>
  );
};

// Slab Wise Billing Model

interface SlabWiseRateBillingFormValue {
  slabs: {
    slabStartUnit: number;
    slabEndUnit: number;
    rs: number;
    ps: number;
  }[];
}

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
    defaultValues: initialValues,
    onSubmit: async ({
      value
    }: {
      value: SlabWiseRateBillingFormValue;
      formApi: FormApi<SlabWiseRateBillingFormValue, undefined>;
    }) => {
      await mutation.mutateAsync(value);
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
        <div className="mb-7 flex justify-between">
          <Heading className="text-lg">Slab-Wise Rate</Heading>
          <button
            type="button"
            className="text-dark hover:text-dark ml-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary align-middle hover:bg-opacity-80"
            onClick={() => router.back()}
          >
            <Icon icon={editIcon} />
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="my-10 h-10 rounded-lg bg-secondary">
              <th className="px-8">Slab</th>
              <th>Slab Start Unit</th>
              <th>Slab End Unit</th>
              <th>Rs.</th>
              <th>Ps.</th>
            </tr>
          </thead>
          <tbody>
            {slabs.map((slab, index) => (
              <tr key={index}>
                <td className="px-8">{index + 1}</td>
                <td className="px-20">
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
                <td className="px-20">
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
                <td className="px-20">
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
                <td className="px-20">
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
