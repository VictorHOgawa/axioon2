"use client";
// import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { BaseCard } from "@/components/global/BaseCard/BaseCard";
import { BaseCardHeader } from "@/components/global/BaseCard/BaseCardHeader";
import { BaseCardFooter } from "@/components/global/BaseCard/BaseCardFooter";
import { Skeleton } from "@/components/global/Skeleton";
import { useComparatorDataContext } from "@/context/ComparatorData";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PositiveCommentsProps {
  PositiveCommentsData: {
    ChartOptions: {
      series: {
        name: string;
        data: number[];
      }[];
      options: ApexOptions;
    };
  };
  series: {
    name: string;
    data: number[];
  }[];
  headerData: React.ReactNode[];
}

export function PositiveComments({
  PositiveCommentsData,
  series,
  headerData,
}: PositiveCommentsProps) {
  const { isGettingData } = useComparatorDataContext();

  return (
    <BaseCard className="p-0">
      <BaseCardHeader title="Comentários Positivos" />
      {isGettingData ? (
        <Skeleton className="mx-auto mt-4 h-[17rem] w-11/12" />
      ) : (
        <div className="flex h-96 w-full flex-col gap-2 p-2 lg:h-full lg:gap-1 lg:p-1">
          <div className="flex w-full items-center justify-between">
            {headerData.map((idx, index) => (
              <div key={index}>{idx}</div>
            ))}
          </div>
          <div className="flex h-full w-full flex-col justify-center">
            <ReactApexChart
              options={PositiveCommentsData.ChartOptions.options}
              series={series}
            />
          </div>
        </div>
      )}
      <BaseCardFooter text="Comparativo dos comentários positivos." />
    </BaseCard>
  );
}
