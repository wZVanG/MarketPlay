import { Card, CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden shadow-lg border border-gray-200 rounded-lg">
            <div className="relative h-40 w-full bg-gray-100">
                <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t border-gray-200 p-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </CardFooter>
        </Card>
    );
}
