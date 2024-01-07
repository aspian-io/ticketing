import React from 'react';
import { Card, CardBody, Skeleton } from '@nextui-org/react';

export default function ListSkeleton() {
  return (
    <div className="w-full flex flex-col items-center">
      <Card className="mb-3 w-full py-5">
        <CardBody className="flex flex-row w-full font-bold pb-7">
          <div className="w-1/2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
          <div className="flex justify-end w-1/2">
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        </CardBody>
      </Card>
      <Card className="mb-3 w-full py-5">
        <CardBody className="flex flex-row w-full font-bold pb-7">
          <div className="w-1/2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
          <div className="flex justify-end w-1/2">
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        </CardBody>
      </Card>
      <Card className="mb-3 w-full py-5">
        <CardBody className="flex flex-row w-full font-bold pb-7">
          <div className="w-1/2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
          <div className="flex justify-end w-1/2">
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        </CardBody>
      </Card>
      <Card className="mb-3 w-full py-5">
        <CardBody className="flex flex-row w-full font-bold pb-7">
          <div className="w-1/2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </div>
          <div className="flex justify-end w-1/2">
            <Skeleton className="h-3 w-2/5 rounded-lg" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
