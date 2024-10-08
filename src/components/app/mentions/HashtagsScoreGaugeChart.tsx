"use client";
import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";
import { BaseCard } from "@/components/global/BaseCard/BaseCard";
import { BaseCardHeader } from "@/components/global/BaseCard/BaseCardHeader";
import { BaseCardFooter } from "@/components/global/BaseCard/BaseCardFooter";
import { Skeleton } from "@/components/global/Skeleton";
import { useMentionsDataContext } from "@/context/MentionsData";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface HashtagsScoreGaugeChartProps {
  ScoreGaugeChartData: {
    name: string;
    sentimentData: {
      name: string;
      value: number;
    }[];
  };
  onlyGauge?: boolean;
  className?: string;
}

export function HashtagsScoreGaugeChart({
  ScoreGaugeChartData,
  onlyGauge = true,
  className,
}: HashtagsScoreGaugeChartProps) {
  const { isGettingData, hashtagData } = useMentionsDataContext();
  const [instagramSentiment, setInstagramSentiment] = useState<number | null>(
    0,
  );
  const [tiktokSentiment, setTiktokSentiment] = useState<number | null>(0);

  const [series, setSeries] = useState([0]);
  useEffect(() => {
    if (hashtagData) {
      setInstagramSentiment(
        hashtagData.hashtagMentions.commentData.currentSentiment.instagram,
      );
      setTiktokSentiment(
        hashtagData.hashtagMentions.commentData.currentSentiment.tiktok,
      );
    }
  }, [hashtagData]);

  useEffect(() => {
    const sentimentValues = [instagramSentiment, tiktokSentiment];
    const numberOfValues = sentimentValues.filter(
      (value) => value !== null && typeof value === "number",
    ).length;
    const sum = sentimentValues.reduce(
      (acc: number, value) => acc + (value || 0),
      0,
    );
    setSeries([parseFloat(Number(sum / numberOfValues / 10).toFixed(2))]);
  }, [instagramSentiment, tiktokSentiment]);

  const [options] = useState<ApexOptions>({
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          value: {
            fontSize: "20px",
            offsetY: -20,
            fontWeight: "bold",
            color: undefined,
            formatter: (val: number) => {
              return (val * 10).toString();
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [""],
  });

  return (
    <BaseCard className="p-0">
      <BaseCardHeader title={"Score Atual"} />
      {isGettingData ? (
        <Skeleton className={twMerge("mx-auto mt-4 h-48 w-11/12", className)} />
      ) : (
        <div
          className={twMerge(
            "flex h-56 w-full gap-8 lg:h-full",
            onlyGauge && "items-center justify-center",
          )}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height={500}
          />
          {!onlyGauge && (
            <div className="flex items-center gap-2">
              <Image
                src={
                  ScoreGaugeChartData.sentimentData[0].value >= 650
                    ? "/Icons/positiveScore.svg"
                    : ScoreGaugeChartData.sentimentData[0].value < 650 &&
                        ScoreGaugeChartData.sentimentData[0].value >= 450
                      ? "/Icons/neutralScore.svg"
                      : "/Icons/negativeScore.svg"
                }
                width={50}
                height={50}
                alt=""
              />
              <span>
                {ScoreGaugeChartData.sentimentData[0].value >= 650
                  ? "Positivo"
                  : ScoreGaugeChartData.sentimentData[0].value < 650 &&
                      ScoreGaugeChartData.sentimentData[0].value >= 450
                    ? "Neutro"
                    : "Negativo"}
              </span>
            </div>
          )}
        </div>
      )}
      <BaseCardFooter text="Valor médio dos sentimentos." />
    </BaseCard>
  );
}
