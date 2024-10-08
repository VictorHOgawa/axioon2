"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BaseCard } from "@/components/global/BaseCard/BaseCard";
import { BaseCardHeader } from "@/components/global/BaseCard/BaseCardHeader";
import { BaseCardFooter } from "@/components/global/BaseCard/BaseCardFooter";
import { useLegalDataContext } from "@/context/LegalData";
import { Skeleton } from "@/components/global/Skeleton";

interface PersonalIrsDataProps {
  full_name: string;
  status: string;
  personalData: {
    estimated_patrimony: string;
    estimated_recipe: string;
    fatherName: string;
    federalCrime: string;
    federalCrimeCertificate: string;
    federalStatus: string;
    id: string;
    politician_id: string;
  }[];
  incomeTax: {
    bankAgency: string | null;
    id: string;
    politician_id: string;
    situation: string;
    year: string;
  }[];
}

export function Irs() {
  const [personalIrsData, setPersonalIrsData] =
    useState<PersonalIrsDataProps>();
  const { legalData, isGettingData } = useLegalDataContext();

  useEffect(() => {
    if (legalData) {
      setPersonalIrsData(legalData);
    }
  }, [legalData]);

  return (
    <BaseCard className="justify-between p-0">
      <BaseCardHeader title="Dados da Receita Federal" />
      {isGettingData ? (
        <Skeleton className="mx-auto mt-4 h-96 w-11/12" />
      ) : (
        <>
          <div className="flex items-center gap-4 p-4">
            <Image
              src="/Logos/irs.png"
              width={100}
              height={100}
              alt=""
              className="w-1/3 object-contain md:w-40 lg:w-1/4 xl:h-24"
            />
            <div className="flex flex-col text-[10px] text-black lg:text-xs 2xl:text-sm 3xl:text-base">
              <strong>{personalIrsData?.full_name}</strong>
              <span>
                Status:{" "}
                <strong>
                  {personalIrsData?.status === "ACTIVE" ? "ATIVO" : "INATIVO"}
                </strong>
              </span>
              <span>
                Estimativa de Receita Mensal:{" "}
                <strong>
                  {personalIrsData?.personalData.length !== 0
                    ? personalIrsData?.personalData[0].estimated_recipe
                    : "Sem dados"}
                </strong>
              </span>
              <span>
                Estimativa de Patrimônio Líquido:
                <strong>
                  {personalIrsData?.personalData.length !== 0
                    ? personalIrsData?.personalData[0].estimated_patrimony
                    : "Sem dados"}
                </strong>
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="h-60 flex-wrap justify-around gap-4 overflow-y-scroll lg:mb-0 lg:flex lg:h-[17rem] xl:h-[20rem] 2xl:h-[16.75rem] 3xl:h-[26rem]">
              {personalIrsData?.incomeTax.length !== 0 ? (
                personalIrsData?.incomeTax.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-auto min-h-16 w-11/12 flex-col items-center justify-between gap-2 rounded-md bg-zinc-50 p-2 shadow-md xl:w-[45%]"
                  >
                    <strong className="text-[10px] text-[#031E53] lg:text-xs 2xl:text-sm 3xl:text-base">
                      {item.year}
                    </strong>
                    <strong className="text-center text-xs lg:text-sm 2xl:text-base 3xl:text-lg">
                      {item.situation}
                    </strong>
                    <strong className="text-[10px] text-zinc-500 lg:text-xs 2xl:text-sm 3xl:text-base">
                      {item.bankAgency}
                    </strong>
                  </div>
                ))
              ) : (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  Não conseguimos encontrar esses dados.
                </span>
              )}
            </div>
          </div>
        </>
      )}
      <BaseCardFooter text="Informações da Receita Federal." />
    </BaseCard>
  );
}
