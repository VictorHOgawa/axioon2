"use client";
// import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BaseCard } from "@/components/global/BaseCard/BaseCard";
import { BaseCardHeader } from "@/components/global/BaseCard/BaseCardHeader";
import { BaseCardFooter } from "@/components/global/BaseCard/BaseCardFooter";
import { useMentionsDataContext } from "@/context/MentionsData";
import { Skeleton } from "@/components/global/Skeleton";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface HashtagsLineGradientChartProps {
  LineGradientChartData: {
    ChartOptions: {
      series: {
        data: number[];
      }[];
      options: ApexOptions;
    };
  };
}

interface SentimentEvolutionProps {
  label: string;
  value: number;
}

interface SeriesProps {
  data: number[];
}

export function HashtagsLineGradientChart({
  LineGradientChartData,
}: HashtagsLineGradientChartProps) {
  const [instagramSentiment, setInstagramSentiment] = useState<
    SentimentEvolutionProps[]
  >([]);
  const [tiktokSentiment, setTikTokSentiment] = useState<
    SentimentEvolutionProps[]
  >([]);
  const [sentimentEvolution, setSentimentEvolution] = useState<SeriesProps[]>(
    [],
  );
  const { isGettingData, hashtagData } = useMentionsDataContext();

  useEffect(() => {
    if (hashtagData) {
      setInstagramSentiment(
        hashtagData.hashtagMentions.commentData.sentimentEvolution.instagram,
      );

      setTikTokSentiment(
        hashtagData.hashtagMentions.commentData.sentimentEvolution.tiktok,
      );
    }
  }, [hashtagData]);

  useEffect(() => {
    const sentimentValues = [instagramSentiment, tiktokSentiment];
    const flatSentimentValues = sentimentValues
      .flat()
      .filter((value) => value !== null);

    const orderedFlatSentimentValues = flatSentimentValues.sort(
      (a, b) => new Date(a.label).getTime() - new Date(b.label).getTime(),
    );

    const series = {
      name: "Sentimento",
      data: orderedFlatSentimentValues.map((value) => value.value),
    };

    setSentimentEvolution([series]);
  }, [instagramSentiment]);

  return (
    <BaseCard className="p-0">
      <BaseCardHeader title="Evolução de Sentimentos" />
      {isGettingData ? (
        <Skeleton className="mx-auto mt-4 h-56 w-11/12" />
      ) : (
        <div className="flex h-56 w-full flex-col lg:h-full">
          <ReactApexChart
            type="area"
            series={sentimentEvolution}
            options={LineGradientChartData.ChartOptions.options}
          />
        </div>
      )}
      <BaseCardFooter text="Sentimento médio por publicação." />
    </BaseCard>
  );
}
