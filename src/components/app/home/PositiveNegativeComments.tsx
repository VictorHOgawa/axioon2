"use client";
// import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { BaseCard } from "@/components/global/BaseCard/BaseCard";
import { BaseCardHeader } from "@/components/global/BaseCard/BaseCardHeader";
import { BaseCardFooter } from "@/components/global/BaseCard/BaseCardFooter";
import { useSocialMediaDataContext } from "@/context/SocialMediaData";
import { Skeleton } from "@/components/global/Skeleton";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PositiveNegativeCommentsChartProps {
  PositiveNegativeCommentsData: {
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

export function PositiveNegativeCommentsChart({
  PositiveNegativeCommentsData,
  series,
  headerData,
}: PositiveNegativeCommentsChartProps) {
  const { isGettingData } = useSocialMediaDataContext();

  return (
    <BaseCard className="p-0">
      <BaseCardHeader title="Comentários" />
      {isGettingData ? (
        <Skeleton className="mx-auto mt-4 h-[17rem] w-11/12" />
      ) : (
        <div className="flex w-full flex-col gap-2 pt-4 lg:h-full">
          <div className="flex w-full items-center justify-evenly">
            {headerData.map((idx, index) => (
              <div key={index}>{idx}</div>
            ))}
          </div>
          <ReactApexChart
            options={PositiveNegativeCommentsData.ChartOptions.options}
            series={series}
          />
        </div>
      )}
      <BaseCardFooter text="Comentários positivos e negativos por publicações." />
    </BaseCard>
  );
}
