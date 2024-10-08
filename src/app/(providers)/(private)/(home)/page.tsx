"use client";
import { useEffect, useState } from "react";
import { CommentsSummary } from "@/components/app/home/CommentsSummary";
import { DefendantsAndDetractorsList } from "@/components/app/home/DefendantsAndDetractorsList";
import { EngagementTimes } from "@/components/app/home/EngagementTimes";
import { PostsAndComments } from "@/components/app/home/PostsAndComments";
import { WordCloud } from "@/components/app/home/WordCloud";
import { WordsList } from "@/components/app/home/WordsList";
import {
  CommentsDonutGraphData,
  EngagementTimesData,
  FollowerProgressionChartData,
  LineGradientChartData2,
  ScoreGaugeChartData,
  WordCloudData,
} from "@/components/data/HomeData";
import { LineGradientChart } from "@/components/app/home/LineGradientChart";
import { FollowerProgressionChart } from "@/components/app/home/FollowerProgressionChart";
import { HeaderCards } from "@/components/app/home/HeaderCards";
import { IndicatorsCards } from "@/components/app/home/IndicatorsCards";
import { HomeHeaderCard } from "@/components/app/home/HomeHeaderCard";
import { PositiveNegativeWrapper } from "@/components/app/home/PositiveNegativeWrapper";
import { ScoreGaugeChart } from "@/components/app/home/ScoreGaugeChart";
import { CommentsDonutGraph } from "@/components/app/home/CommentsDonutGraph";
import { useSocialMediaDataContext } from "@/context/SocialMediaData";
import { SelectedAccounts } from "@/components/app/home/SelectedAccounts";

interface IndicatorsProps {
  name: string;
  value: number;
  trendingUp: boolean;
  trendingValue: number;
}

export default function Home() {
  const [facebookIndicators, setFacebookIndicators] = useState<
    IndicatorsProps[] | null
  >(null);
  const [instagramIndicators, setInstagramIndicators] = useState<
    IndicatorsProps[] | null
  >(null);
  const [tiktokIndicators, setTiktokIndicators] = useState<
    IndicatorsProps[] | null
  >(null);
  const [youtubeIndicators, setYoutubeIndicators] = useState<
    IndicatorsProps[] | null
  >(null);
  const [indicators, setIndicators] = useState<IndicatorsProps[]>([]);
  const { socialMediaData } = useSocialMediaDataContext();

  useEffect(() => {
    if (socialMediaData) {
      setFacebookIndicators(socialMediaData.profileEvolution.facebook);
      setInstagramIndicators(socialMediaData.profileEvolution.instagram);
      setTiktokIndicators(socialMediaData.profileEvolution.tiktok);
      setYoutubeIndicators(socialMediaData.profileEvolution.youtube);
    }
  }, [socialMediaData]);

  useEffect(() => {
    const allIndicators = [
      facebookIndicators,
      instagramIndicators,
      tiktokIndicators,
      youtubeIndicators,
    ];
    if (allIndicators.filter((x) => x).length > 0) {
      const result = allIndicators
        .filter((x) => x)
        .flat()
        .reduce<Record<string, IndicatorsProps>>((acc, item) => {
          const { name, value, trendingValue } = item as IndicatorsProps;

          if (!acc[name]) {
            acc[name] = {
              name,
              value: 0,
              trendingUp: false,
              trendingValue: 0,
            };
          }
          acc[name].value += value;
          acc[name].trendingValue += trendingValue;
          return acc;
        }, {});
      setIndicators(Object.values(result));
    }
  }, [
    facebookIndicators,
    instagramIndicators,
    tiktokIndicators,
    youtubeIndicators,
  ]);

  return (
    <div className="flex flex-col gap-4 pb-28 lg:grid lg:grid-cols-12">
      <div className="lg:col-span-12">
        <HomeHeaderCard title="Mídias Sociais" />
      </div>
      <div className="w-full lg:col-span-12">
        <SelectedAccounts />
      </div>

      <div className="w-full lg:col-span-12">
        <HeaderCards />
        <div className="h-40">
          <IndicatorsCards />
        </div>
      </div>
      {indicators.length !== 0 && (
        <>
          <div className="flex flex-col gap-4 lg:col-span-12 lg:grid lg:h-[100vh] lg:grid-cols-12 lg:grid-rows-12 2xl:h-[75vh]">
            <div className="lg:col-span-8 lg:row-span-5">
              <LineGradientChart
                LineGradientChartData={LineGradientChartData2}
              />
            </div>
            <div className="col-span-4 row-span-5">
              <ScoreGaugeChart ScoreGaugeChartData={ScoreGaugeChartData} />
            </div>
            <div className="col-span-7 row-span-7">
              <FollowerProgressionChart
                FollowerProgressionChartData={FollowerProgressionChartData}
              />
            </div>
            <div className="col-span-5 row-span-7">
              <EngagementTimes EngagementTimesData={EngagementTimesData} />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-12 lg:grid lg:h-[150vh] lg:grid-cols-12 lg:grid-rows-12 2xl:h-[120vh]">
            <div className="lg:col-span-7 lg:row-span-4">
              <CommentsSummary />
            </div>
            <div className="lg:col-span-5 lg:row-span-4">
              <CommentsDonutGraph
                CommentsDonutGraphData={CommentsDonutGraphData}
              />
            </div>
            <div className="lg:col-span-8 lg:row-span-4">
              <PositiveNegativeWrapper />
            </div>
            <div className="lg:col-span-4 lg:row-span-4">
              <DefendantsAndDetractorsList />
            </div>
            <div className="lg:col-span-7 lg:row-span-4">
              <WordCloud WordCloudData={WordCloudData} />
            </div>
            <div className="lg:col-span-5 lg:row-span-4">
              <WordsList />
            </div>
          </div>
          <div className="lg:col-span-12">
            <PostsAndComments />
          </div>
        </>
      )}
    </div>
  );
}
