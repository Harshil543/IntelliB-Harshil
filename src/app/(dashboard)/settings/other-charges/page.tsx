'use client';
import Loader from '@/components/CommonComponents/Loader';
import CardWrapper from '@/components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getOtherCharges } from '@/services/other-charges.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function OtherChargesForm() {
  const router = useRouter();
  // const [page, setPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [limit, setLimit] = useState<number>(10);

  // const { isLoading, data } = useQuery({
  //   queryKey: ['other-charges', page, searchQuery, limit],
  //   queryFn: () => getOtherCharges(page, searchQuery, limit),
  //   placeholderData: keepPreviousData
  // });

  const { isLoading, data } = useQuery({
    queryKey: ['other-charges'],
    queryFn: () => getOtherCharges(),
    placeholderData: keepPreviousData
  });

  // const handlePrevious = () => {
  //   setPage((prev) => prev - 1);
  // };
  // const handleNext = () => {
  //   setPage((prev) => prev + 1);
  // };
  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  // };
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  //   handleSearch(e.target.value);
  // };

  // const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setLimit(Number(e.target.value));
  //   setPage(1);
  // };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <Button
          onClick={() =>
            router.push('/settings/other-charges/register-other-charges')
          }
        >
          Add Other Charges
        </Button>
        <Button
          onClick={() =>
            router.push('/settings/other-charges/update-other-charges')
          }
        >
          Update Other Charges
        </Button>
      </div>

      <CardWrapper>
        <>
          {/* <Input
            placeholder="Search..."
            className="w-full rounded-3xl border-border bg-background"
            value={searchQuery}
            onChange={handleSearchChange}
          /> */}

          {data?.items?.length > 0 ? (
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
          ) : (
            <p className="text-center"> No results</p>
          )}
          {/* <div className="flex w-full items-end justify-end space-x-2">
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
          </div> */}
        </>
      </CardWrapper>
    </div>
  );
}
