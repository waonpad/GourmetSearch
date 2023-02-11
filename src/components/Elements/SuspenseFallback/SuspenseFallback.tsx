import { Spinner } from '@/components/Elements';

export const SuspenseFallback = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Spinner size="xl" />
    </div>
  );
};
