import React from "react";
import { useSelector } from "react-redux";
import { Progress, Skeleton } from "antd";

export default function AvgScoreCard({ inner_type, module }) {
  const {
    statRC,
    statRS,
    statRI,
    statWAP,
    statWRTW,
    statWS,
    statSAP,
    statSAL,
    statSRS,
    statSLS,
    statSS,
    statLLT,
    statLI,
    statRCL,
    statRSL,
    statRIL,
    statWAPL,
    statWRTWL,
    statWSL,
    statSAPL,
    statSALL,
    statSRSL,
    statSLSL,
    statSSL,
    statLLTL,
    statLIL,
  } = useSelector((state) => state.statistic);


  return (
    <div className="bg-[#ECECEC] md:w-[15rem] md:h-[12rem] rounded-md font-montserrat">
      <div className="px-2 py-2">
        <h1 className="text-center text-[17px]">{module}</h1>
        <h1 className="text-center text-[17px]">
          Total Practiced:
          {inner_type === 31
            ? statRCL
            : inner_type === 32
            ? statRIL
            : inner_type === 11
            ? statRSL
            : inner_type === 21
            ? statWAPL
            : inner_type === 22
            ? statWRTWL
            : inner_type === 23
            ? statWSL
            : inner_type === 42
            ? statSAPL
            : inner_type === 41
            ? statSALL
            : inner_type === 43
            ? statSRSL
            : inner_type === 44
            ? statSLSL
            : inner_type === 45
            ? statSSL
            : inner_type === 51
            ? statLLTL
            : inner_type === 52
            ? statLIL
            : ""}
        </h1>

        <div className="flex flex-col justify-center gap-3  m-auto mt-[1.5rem]">
          <Progress
            className="m-auto"
            type="circle"
            percent={
              inner_type === 31
                ? statRC
                : inner_type === 32
                ? statRI
                : inner_type === 11
                ? statRS
                : inner_type === 21
                ? statWAP
                : inner_type === 22
                ? statWRTW
                : inner_type === 23
                ? statWS
                : inner_type === 42
                ? statSAP
                : inner_type === 41
                ? statSAL
                : inner_type === 43
                ? statSRS
                : inner_type === 44
                ? statSLS
                : inner_type === 45
                ? statSS
                : inner_type === 51
                ? statLLT
                : inner_type === 52
                ? statLI
                : ""
            }
            size={65}
            strokeWidth={10}
          />
        </div>
      </div>
    </div>
  );
}
