import React, { useEffect, useState } from "react";
import { Progress, Skeleton } from "antd";
import EVpage from "./EVpage";
import { useDispatch, useSelector } from "react-redux";
import { saveStatData } from "../../redux/slices/statistic";
const { fuzzy } = require("fast-fuzzy");

export default function ConversationAssmentContainer({
  sampleAns,
  userSumamryInput,
  correctConversation,
  totalQ,
  qData,

}) {
  const [busy, setBusy] = useState(true);
  const [overallCal, setOverallCal] = useState(false);
  const [overall, setOverall] = useState(0);
  const [tr, setTR] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);
  const { showAssesmentLoading } = useSelector((state) => state.interactiveListening);
  const dispatch = useDispatch();

  useEffect(() => {
    setOverallCal(false);
   
    if (showAssesmentLoading) {
       calculateTaskRelevance();
    
    }

    setBusy(false);
  }, [busy, showAssesmentLoading]);

  useEffect(() => {
    if (overallCal) {
      calculateOverall();
    }
  }, [overallCal]);

  const calculateOverall = () => {
    const correctConversationRatio= (correctConversation/ totalQ)*100
    const avg = (correctConversationRatio + tr) / 2;

    const statData = {
      user: userInfo.id,
      qn: qData.id,
      level: qData.level,
      type: qData.type,
      inner_type: qData.inner_type,
      time: qData.time,
      result: Math.round(avg),
    };
    dispatch(saveStatData(statData));
    setOverall(Math.round(avg));
  };
  const calculateTaskRelevance = (userInputSen) => {
    console.log(userSumamryInput);
    const result = Math.round(
      fuzzy(
        sampleAns.toString(),
        userSumamryInput ? userSumamryInput.toString() : ""
      ) * 100
    );
    setTR(result);
    setOverallCal(true);
  };

  return (
    <div className="w-full">
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="w-full ">
          <div
            className="flex md:flex-row sm:flex-col justify-between gap-5 m-auto  mt-5 
                w-full text-[25px] sm:text-[20px] font-[500] 
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
                    strokeWidth={13}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Ovar all
                  </h1>
                </div>
              </div>
            </div>

            <div
              className="
             m-auto px-2 py-2 rounded-md grid md:grid-cols-3 gap-2
             sm:grid-cols-2 mt-3"
            >
              <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto mt-[-1px]">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={tr}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat mt-4">
                  Task Relevence
                </h1>
              </div>
              <div className="flex flex-col justify-center gap-3 w-[10rem]  m-auto">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={
                    ((totalQ - (totalQ - correctConversation)) / totalQ) * 100
                  }
                  format={(percent) => `${correctConversation} / ${totalQ}`}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Correct Conversation
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
