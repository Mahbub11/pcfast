import React, { useEffect, useState } from "react";
import { Progress, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveStatData } from "../../redux/slices/statistic";
import EVpage from "../Assesment/EVpage";
import { Collapse } from "antd";
import { getWordDetails } from "../../redux/slices/disctionary";
const { fuzzy } = require("fast-fuzzy");

export default function MockAssmentContainer({
  sampleAns,
  fluency = false,
  ga,
  gc,
  ls,
  ld,
  tr,
  sl,
  overall,
  fluencyCal,
  sentenceError,
  userInputSen,
}) {
  const dispatch = useDispatch();
  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };
  return (
    <div className="w-full">
      <div className="w-full mt-[3rem]">
        <div
          className="flex md:flex-row sm:flex-col justify-between gap-5 m-auto  
                w-full text-[20px] sm:text-[15px] font-[500] 
             font-montserrat  text-gray-700"
        >
          <div className="flex justify-center m-auto">
            <div className="flex flex-col gap-5 px-1 py-1 h-full">
              <div className="flex flex-col mt-[13px] justify-center gap-3 w-[10rem] h-[5rem] m-auto">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={overall}
                  size={100}
                  strokeColor="green"
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Ovar all
                </h1>
              </div>
              <div className="mt-5 drop-shadow-sm">
                <Progress
                  className="text-[18px] font-[600] underline font-poppins"
                  strokeColor={{
                    from: "#108ee9",
                    to: "#87d068",
                  }}
                  percent={overall}
                  format={(percent) =>
                    `${Math.round((percent / 100) * 160)} -160`
                  }
                  size="mideum"
                  status="active"
                />
              </div>
            </div>
          </div>

          <div
            className="
             m-auto px-2 py-2 rounded-md grid md:grid-cols-3 gap-2
             sm:grid-cols-2 mt-3"
          >
            <div className="flex flex-col justify-center gap-3 w-[10rem]  m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={ga}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Grammatical accuracy
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={gc}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Grammatical complexity
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={ls}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Lexical sophistication
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] mt-[27px] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={ld}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Lexical diversity
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <div
                className={`${
                  fluency ? "hidden" : "block"
                } flex flex-col justify-center`}
              >
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={sl}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Length
                </h1>
              </div>
              <div
                className={`${
                  fluency ? "block" : "hidden"
                } flex flex-col justify-center`}
              >
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={fluencyCal}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Fluency
                </h1>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
              <Progress
                className="m-auto"
                type="circle"
                percent={tr}
                size={65}
                strokeWidth={10}
              />
              <h1 className="text-center font-[500] font-montserrat">
                Task relevance
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full">
          <EVpage error={sentenceError} userInputSen={userInputSen}></EVpage>
        </div>
        <div className="h-auto w-[92%] m-auto">
          <Collapse
            accordion
            items={[
              {
                key: "1",
                label: "Sample Answer",
                children: (
                  <p className=" text-[17px] font-poppins h-auto px-1 flex flex-wrap gap-1">
                    {sampleAns.split(" ").map((val) => (
                      <span
                        className="cursor-pointer md:hover:text-blue-500 "
                        onClick={handleMeaning}
                      >
                        {" " + val}
                      </span>
                    ))}
                  </p>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
