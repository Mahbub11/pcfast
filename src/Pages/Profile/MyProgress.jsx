import React, { useEffect } from "react";
import ProgressStatistic from "./ProgressStatistic";
import AvgScoreCard from "../../Components/Progress/AvgScoreCard";
import { useDispatch, useSelector } from "react-redux";
import { getStatDuolingo } from "../../redux/slices/statistic";
import { Progress, Skeleton } from "antd";

export default function MyProgress() {
  const { statAvgScore } = useSelector((state) => state.statistic);

  console.log(statAvgScore)

  return (
    <div className="w-full h-auto px-2 py-2 ">
      <div
        className="sm:w-[90%] md:w-[75%] h-auto
       m-auto mt-[1rem]  font-poppins text-justify text-[20px] "
      >
        <h1 className="text-[25px] font-[600] text-center">My Progress</h1>
        <div className="mt-[2rem] flex-col gap-10 ">
          <ProgressStatistic></ProgressStatistic>
          <div>
            <div className=" w-full h-auto px-2 py-3 ">
              <h1 className="ml-3 font-[600] text-[20px]">Average Score</h1>
              <div>
                <div
                  className="h-full w-full  mt-2 grid sm:grid-cols-2 md:grid-cols-4 md:gap-3 sm:gap-5
                  lg:gap-5 place-items-center "
                >
                  <AvgScoreCard
                    inner_type={31}
                    module={"Read and Complete"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={11}
                    module={"Read and Select"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={32}
                    module={"Interactive Reading"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={21}
                    module={"Write about the Photo"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={22}
                    module={"Read then Write"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={23}
                    module={"Writing Sample"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={42}
                    module={"Speak about the Photo"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={41}
                    module={"Read Aloud"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={43}
                    module={"Read then Speak"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={44}
                    module={"Listen then Speak"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={45}
                    module={"Speaking Sample"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={51}
                    module={"Listen and Type"}
                  ></AvgScoreCard>
                  <AvgScoreCard
                    inner_type={52}
                    module={"Interactive Listening"}
                  ></AvgScoreCard>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="h-[10rem] w-[97%] m-auto bg-[#ECECEC] mt-10">
            <div className="px-2 py-2">
              <h1 className="font-[600] text-[20px] text-center">
                Total Average Score
              </h1>
              <div className="w-[70%]  h-10 m-auto mt-10">
                <div className="mt-5 drop-shadow-sm">
                  <Progress
                    className="text-[18px] font-[600] underline font-poppins"
                    strokeColor={{
                      from: "#108ee9",
                      to: "#87d068",
                    }}
                    
                    percent={statAvgScore}
                    format={(percent) => `${statAvgScore} -160`}
                    size="mideum"
                    status="active"
                  />
                </div>
              </div>
            </div>
          </div> */}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
