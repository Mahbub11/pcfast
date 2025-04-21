import React, { useEffect, useRef, useState } from "react";
import IconSpeakignDot from "../../../../Assets/SVG/IconSpeakingDot";
import IconConversationBot from "../../../../Assets/SVG/IconConversationBot";
import TextArea from "antd/es/input/TextArea";
import SingleConversation from "../../../../Components/Listening/SingleConversation";
import ConverSationContainer from "../../../../Components/Listening/ConverSationContainer";
import { useDispatch, useSelector } from "react-redux";
import { startEvaluateOption } from "../../../../redux/slices/converSationHandler";
import { Skeleton } from "antd";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import { Statistic } from "antd";
const { Countdown } = Statistic;

export default function LLIpage({ data, handleNexOne }) {
  const dispatch = useDispatch();

  const [secondStateTime, setSecondStateTime] = useState(null);
  const [xmState, setxmState] = useState(false);
  let [isStart, setIsStart] = useState(false);
  const [bColor, setBcolor] = useState(true);

  const [questionList, setQuestionList] = useState([]);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const [voiceActor, setVoiceActor] = useState();
  let [qCounter, setQcounter] = useState(0);
  const { error } = useSelector((state) => state.statistic);
  const { evaluateResult } = useSelector((state) => state.converSationHandler);
  const [showSummaryInput, setShowSummaryInput] = useState(false);
  const [showSummaryBox, setShowSummaryBox] = useState(false);
  const [showSummaryBtn, setShowSummaryBtn] = useState(false);
  const [showNextBtn, setShowNxtBtn] = useState(false);
  const [blur, setBlur] = useState(false);
  const [isConversationStart, setIsConversationStart] = useState(false);
  const [showConversationContainer, setShowConversationContainer] =
    useState(false);
  const modalRef = useRef();

  const [voiceIndex, setVoiceIndex] = useState(0);
  const [busy, isBusy] = useState(true);
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [evBtn,setEvBtn] = useState(true)

  useEffect(()=>{
    setDeadline(Date.now() + 4 * 60000)
  
    setEvBtn(true)
  },[data])


  useEffect(() => {
    let pushData = [];
    data.qa.convsersationList.map((val, i) => {
      pushData.push(val[i]);
    });

    setQuestionList(pushData);
    isBusy(false);
  }, [busy]);

  const handleStartQuestion = () => {
    setIsConversationStart(true);

    dispatch(
      startEvaluateOption({
        data: questionList[qCounter],
        currentIndex: qCounter,
        voiceIndex: data.qa.additionalData.voiceActor,
      })
    );
    setIsStart(true);
    setShowConversationContainer(true);
  };
  const handleSmmary = () => {
    setShowSummaryInput(true);
  };
  const handleNextQuestion = () => {
    setQcounter(++qCounter);
    if (qCounter === data.qa.convsersationList.length) {
      setShowConversationContainer(false);
      setVoiceIndex(data.qa.additionalData.voiceActor);
      setxmState(true);
      setShowNxtBtn(true);
    } else {
      dispatch(
        startEvaluateOption({
          data: questionList[qCounter],
          currentIndex: qCounter,
          voiceIndex: data.qa.additionalData.voiceActor,
        })
      );
    }
  };
  const handleNext = () => {
    handleNexOne();
    setEvBtn(false)
  };

  // const handleSummaryBox = () => {
  //   setSecondStateTime(Date.now() + 1.254 * 60000);
  //   setShowNxtBtn(false);
  //   setShowSummaryBox(true);
  //   setBlur(true);
  //   setShowSummaryBtn(true);
  // };

  // const handleNextSection = () => {
  //   const mockData = {
  //     // userAns: userAns,
  //     time: data.time,
  //     type: data.type,
  //     inner_type: data.inner_type,
  //     conversationResult: evaluateResult,
  //     assesment: {
  //       qData: data,
  //       totalQ: questionList.length,
  //       correctConversation: evaluateResult.filter(
  //         (val) => val.severity === true
  //       ).length,
  //       // userSumamryInput:userSumamryInput,
  //       sampleAns: data?.qa.additionalData.summary,
  //     },
  //   };
  //   dispatch(saveMockTestUserAns(mockData));
  // };
  const scrollBtm = () => {
    console.log("cvb");
    modalRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      // inline: "nearest",
    });
  };

  const handleTimeFinish = () => {
    setEvBtn(false)
    handleNexOne();
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
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
                onFinish={handleTimeFinish}
                format="mm:ss"
              />
            </div>
          </div>
          <div className="w-full h-full  px-4 ">
            <h1
              className={`${
                isConversationStart ? "hidden" : "block"
              } sm:text-[17px] md:text-[22px]  sm:text-center  font-montserrat 
           mt-[1rem] font-[600] text-center w-full`}
            >
              You will participate in a conversation about the scenario below
            </h1>

            <div className={`w-[95%] m-auto  rounded-md mt-5 !text-[13px] `}>
              <div
                disabled={blur ? true : false}
                className={`${
                  blur ? " hidden" : ""
                } h-auto w-full flex justify-between px-1 py-2 gap-5 `}
              >
                <div className="sm:hidden md:block md:w-[30%]">
                  <div className=" m-auto rounded-md py-2 opacity-80 md:fixed ">
                    <IconConversationBot
                      height="20rem"
                      width="20rem"
                    ></IconConversationBot>

                    {/* <IconSpeakignDot
                      height="2rem"
                      width="5rem"
                      fill="#c8ddf5"
                    ></IconSpeakignDot> */}
                  </div>
                </div>
                {/* <div className="w-[30%] h-[25rem] m-auto rounded-md py-2 opacity-80  sm:hidden md:block "></div> */}

                <div
                  ref={modalRef}
                  id="journal-scroll"
                  className="md:w-[60%] sm:w-full sm:m-auto   mt-5  h-[25rem] overflow-y-scroll "
                >
                  <div className="m-auto flex flex-col gap-5">
                    <div
                      className={`${
                        isConversationStart ? "hidden" : "block"
                      } md:w-[80%] sm:w-full md:text-[17px] sm:text-[15px]`}
                    >
                      <p className="font-poppins font-[400]">{data.title}</p>
                    </div>

                    <div className="flex justify-start w-[80%]">
                      <div>
                        <button
                          onClick={(e) => handleStartQuestion()}
                          className={`${
                            isStart ? "hidden" : "block "
                          } px-2 py-1 bg-tahiti 
                   font-montserrat rounded-md m-auto text-white w-[5rem] `}
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="md:mt-10 sm:mt-5 !md:text-[17px] ">
                    <div className="">
                      <div>
                        {evaluateResult?.map((val, i) => {
                          return (
                            <SingleConversation
                              key={i}
                              data={val}
                            ></SingleConversation>
                          );
                        })}
                      </div>

                      <div
                        className={`${
                          showConversationContainer ? "block" : "hidden"
                        } mt-5 `}
                      >
                        <ConverSationContainer
                          scrollBtm={scrollBtm}
                          showNextBtn={showNextBtn}
                          handleSmmary={handleSmmary}
                          currentQuestion={1 + qCounter}
                          totalQ={questionList.length}
                          voiceIndex={voiceIndex}
                          handleNextQuestion={handleNextQuestion}
                        ></ConverSationContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-10"></div>
        </div>
      )}
      <div
        className={`${
          showNextBtn ? "flex" : "hidden"
        } w-full justify-end mt-3 px-3 py-3`}
      >
       <button
          disabled={evBtn ? false : true}
          onClick={handleNext}
          className={`${
            evBtn ? "" : "disabled opacity-50"
          } px-5 text-[20px] text-white py-2 bg-tahiti rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
