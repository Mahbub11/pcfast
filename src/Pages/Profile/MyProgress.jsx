import React from "react";
import ProgressStatistic from "./ProgressStatistic";
import AvgScoreCard from "../../Components/Progress/AvgScoreCard";
import { useSelector } from "react-redux";
import { Progress } from "antd";

export default function MyProgress() {
  const { statAvgScore } = useSelector((state) => state.statistic);

  return (
    <div className="w-full h-auto px-2 py-2 ">
      <div
        className="sm:w-[90%] md:w-[75%] h-auto
       m-auto mt-[1rem]  font-poppins text-justify text-[20px] "
      >
        <h1 className="text-3xl font-semibold text-center mb-10 text-[#333]">
          My Progress
        </h1>

        {/* Progress Statistic */}
        <div className="mb-12">
          <ProgressStatistic />
        </div>

        {/* Average Score Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#444] px-2">
            Average Score by Module
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
            {[
              { inner_type: 31, module: "Read and Complete" },
              { inner_type: 11, module: "Read and Select" },
              { inner_type: 32, module: "Interactive Reading" },
              { inner_type: 21, module: "Write about the Photo" },
              { inner_type: 22, module: "Read then Write" },
              { inner_type: 23, module: "Writing Sample" },
              { inner_type: 42, module: "Speak about the Photo" },
              { inner_type: 41, module: "Read Aloud" },
              { inner_type: 43, module: "Read then Speak" },
              { inner_type: 44, module: "Listen then Speak" },
              { inner_type: 45, module: "Speaking Sample" },
              { inner_type: 51, module: "Listen and Type" },
              { inner_type: 52, module: "Interactive Listening" },
            ].map((item) => (
              <div key={item.inner_type} className="w-full">
                <AvgScoreCard
                  inner_type={item.inner_type}
                  module={item.module}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Total Average Score */}
        <div className="bg-white rounded-lg  py-6 px-4 mt-12">
          <h2 className="text-xl font-semibold text-center mb-4">
            Total Average Score
          </h2>
          <div className="flex justify-center">
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%]">
              <Progress
                type="line"
                strokeLinecap="square"
                strokeColor="#103f5eb3"
                trailColor="#DDE9F8"
                percent={statAvgScore}
                status="active"
                strokeWidth={12}
                format={(percent) => `${percent} / 160`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
