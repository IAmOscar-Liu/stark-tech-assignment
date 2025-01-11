import CardLayout from "./CardLayout";
import { Skeleton } from "./ui/skeleton";

function LoadingSkeleton({ title }: { title: string }) {
  return (
    <CardLayout className="px-4 pb-4">
      <h1 className="mb-2 text-xl font-semibold tracking-tight">{title}</h1>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </CardLayout>
  );
}

export default LoadingSkeleton;
