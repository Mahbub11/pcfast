import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import { Button, Statistic } from "antd";
const { Countdown } = Statistic;
const { fuzzy } = require("fast-fuzzy");

export default function LliSummaryBox({ data, handleNextQuestion }) {
  const [userSumamryInput, setUserSummaryInput] = useState();
  const { evaluateResult } = useSelector((state) => state.converSationHandler);
  const dispatch = useDispatch();
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(Date.now() + 0.2 * 60000);
  const [xmFinish,setXmFinish] = useState(false)
  const [evBtn,setEvBtn] = useState(true)
  const [loadings, setLoadings] = useState(false);


  useEffect(()=>{
    setDeadline(Date.now() + 69000)
    setXmFinish(false)
    setEvBtn(true)
  },[data])

  useEffect(()=>{
    if(xmFinish){
      handleNext()
    }
  },[xmFinish])


  const handleNext = () => {
    const crossWithModeleAns = Math.round(
      fuzzy(
        data.data?.qa.additionalData.summary.toString(),
        userSumamryInput ? userSumamryInput.toString() : ""
      ) * 100
    );
    const correctConversation= evaluateResult.filter(
      (val) => val.severity === true
    ).length
   const totalQuestion= data.data.qa.convsersationList.length
    const correctConversationRatio = (correctConversation / totalQuestion) * 100;
    const avgScore = (correctConversationRatio + crossWithModeleAns) / 2;

    const mockData = {
      // userAns: userAns,
      time: data.data.time,
      type: data.data.type,
      inner_type: data.data.inner_type,
      conversationResult: evaluateResult,
      result:avgScore,
      assesment: {
        qData: data.data,
        totalQ: totalQuestion,
        correctConversation: correctConversation,
        userSumamryInput: userSumamryInput,
        sampleAns: data.data?.qa.additionalData.summary,
      },
    };
    dispatch(saveMockTestUserAns(mockData));
    setLoadings(false)
    handleNextQuestion();
  };

  const handleSave=()=>{
    setLoadings(true)
    setEvBtn(false)
     if(!xmFinish){
      setXmFinish(true)
     }
  }

  return (
    <div>
      <div>
      <div className="w-full flex justify-end px-2 py-[1rem]">
            <div
              className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0  md:mt-0"
            >
              <Countdown
                onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                value={deadline}
                onFinish={handleSave}
                format="mm:ss"
              />
            </div>
          </div>
        <div
          className={`w-[90%] 
                m-auto px-2 py-2 flex flex-col justify-center gap-3 mt-10`}
        >
          <h1 className="text-center font-poppins text-[20px] font-[600]">
            Summarize the Conversation you just had in 75 seconds.
          </h1>

          <TextArea
            onChange={(e) => setUserSummaryInput(e.target.value)}
            placeholder="Your response"
            rows={5}
            spellcheck="false"
            className="text-[18px] font-poppins"
          ></TextArea>
        </div>
      </div>

      <div className={`flex w-full justify-end mt-3 px-3 py-3`}>
        <Button
         style={{ color: "white", border: "none", backgroundColor: "#3AB7BF",height:'3rem' }}
         loading={loadings} 
          onClick={handleSave}
          className="px-5 text-[20px] py-[10px] text-white rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
