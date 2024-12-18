import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="flex flex-col space-y-3 items-center justify-center">
        <Skeleton className="w-80 h-80 mt-6" />
      </div>
    );
  }