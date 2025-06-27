import React, { useEffect, useRef, useState } from "react";
import { Collapse, Input, Skeleton } from "antd";
import { notification } from "antd";

import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Reading/RadioBtn.css";
import { getWordDetails } from "../../redux/slices/disctionary";
import { useNavigate, useParams } from "react-router-dom";
import ConverSationContainer from "../../Components/Listening/ConverSationContainer";
import {
  EndEvaluateOption,
  startEvaluateOption,
} from "../../redux/slices/converSationHandler";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import SingleConversation from "../../Components/Listening/SingleConversation";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import ConversationAssmentContainer from "../../Components/Assesment/ConversationAssmentContainer";
import {
  clearInteractiveListeningResult,
  getInteractiveResult,
} from "../../redux/slices/interactiveListening";
import TeacherSpeakingAnimation from "../../Components/TeacherSpeakingAnimation";
import FTeacherSpeakingAnimation from "../../Components/FTeacherSpeakingAnimation";

const { TextArea } = Input;
const { Countdown } = Statistic;

export default function PracticePageLLR({ id, handleCloseModal }) {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const { rid } = useParams();
  let [index, setIndex] = useState(rid);

  const { listLLR } = useSelector((state) => state.getListeningList);
  let [data, setData] = useState({});
  const [deadline, setDeadline] = useState(0);
  const [secondStateTime, setSecondStateTime] = useState(null);
  const [xmState, setxmState] = useState(false);
  let [isStart, setIsStart] = useState(false);
  const [bColor, setBcolor] = useState(true);
  let dataLength = listLLR.length;
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
  const [showNextBtn, setShowNxtBtn] = useState(true);
  const [blur, setBlur] = useState(false);
  const [isConversationStart, setIsConversationStart] = useState(false);
  const [showConversationContainer, setShowConversationContainer] =
    useState(false);
  const [showEvaluate, setShowEvaluate] = useState(false);
  let [openPanels, setOpenPanels] = useState([]);
  const [userSumamryInput, setUserSummaryInput] = useState();
  const [correctConversation, setCorrectConversation] = useState(0);
  const [inputavailable, setInputavailable] = useState(true);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [bootCounter, setbootCounter] = useState(true);
  const [avatarState, setAvatarState] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setIndex(id);
  //   setxmState(false);
  // }, [id]);

  useEffect(() => {
    notification.destroy();
    if (!bootCounter) {
      setbootCounter(true);
      setData(undefined);
      setDeadline(undefined);
    }
  }, [bootCounter]);

  useEffect(() => {
    if (id) {
      const data = listLLR.filter((val) => index === val.index);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      setDeadline(Date.now() + 4 * 60000);
      // setDeadline(Date.now() + data[0]?.time * 60000 - 90000);
      let pushData = [];
      data[0].qa.convsersationList.map((val, i) => {
        pushData.push(val[i]);
      });

      setQuestionList(pushData);
    } else {
      const data = listLLR.filter((val) => parseInt(rid) === val.index);
      setDeadline(Date.now() + data[0]?.time * 60000 - 90000);
      setData(data[0]);
      setBcolor(data[0].bookmark);
      let pushData = [];
      data[0].qa.convsersationList.map((val, i) => {
        pushData.push(val[i]);
      });

      setQuestionList(pushData);
    }

    setTimeout(() => {
      isBusy(false);
    }, 1000);
    // setDeadline(Date.now() + data[0].time * 60000);
  }, [data, index, busy, bootCounter]);

  console.log(data);

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      handleRetry();
      dispatch(clearInteractiveListeningResult());
      isBusy(true);
      navigate(`/practice/llr-l/${index}`);
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      dispatch(clearInteractiveListeningResult());
      isBusy(true);
      handleRetry();
      navigate(`/practice/llr-l/${index}`);
    }
  };

  const openNotification = () => {
    notification.open({
      message: `Conversation Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
    handleSummaryBox();
  };
  const openXmEnd = () => {
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
    setInputavailable(false);
  };

  const handleEvaluate = () => {
    dispatch(clearInteractiveListeningResult());
    dispatch(getInteractiveResult());
    setSecondStateTime(null);
    setDeadline(null);
    const conversationCorrect = evaluateResult.filter(
      (val) => val.severity === true
    ).length;
    setCorrectConversation(conversationCorrect);
    setShowEvaluate(true);
    setOpenPanels(["1"]);
    setBlur(false);
  };

  const handleRetry = () => {
    setQcounter(0);
    setIsStart(false);
    setShowSummaryInput(false);
    dispatch(EndEvaluateOption());
    setxmState(false);
    setShowSummaryBox(false);
    setUserSummaryInput("");
    setBlur(false);
    setIsConversationStart(false);
    setDeadline(null);
    setShowEvaluate(false);
    setShowNxtBtn(true);
    setInputavailable(true);
    dispatch(clearInteractiveListeningResult());
    setShowSummaryBtn(false);
    window.scrollTo(0, 0);
  };

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  const handleNextQuestion = () => {
    setQcounter(++qCounter);
    if (qCounter === questionList.length) {
      setShowConversationContainer(false);
      setVoiceIndex(data.qa.additionalData.voiceActor);
      setxmState(true);
    } else {
      dispatch(
        startEvaluateOption({
          data: questionList[qCounter],
          currentIndex: qCounter,
          voiceIndex: data.qa.additionalData.voiceActor,
          sname: data.qa.additionalData.sname,
        })
      );
    }
  };

  const handleStartQuestion = () => {
    console.log(questionList);
    setIsConversationStart(true);
    setDeadline(Date.now() + 4 * 60000);

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
  const handleBookmark = (id, type, inner_type) => {
    setBcolor(!bColor);
    const data = {
      id,
      type,
      inner_type,
    };
    dispatch(toggleBookmark(data));
  };

  const handleSmmary = () => {
    setShowSummaryInput(true);
  };

  const handleSummaryBox = () => {
    setSecondStateTime(Date.now() + 1.254 * 60000);
    setShowNxtBtn(false);
    setShowSummaryBox(true);
    setBlur(true);
    setShowSummaryBtn(true);
  };

  return (
    <div>
      {busy ? (
        <div className="w-full h-[30rem] flex justify-center m-auto sm:px-5 sm:py-10">
          <Skeleton></Skeleton>
        </div>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
          {/* <div
            onClick={closeModalWindow}
            className="absolute right-0 mr-3 md:mt-[-1rem] sm:mt-[10px]  cursor-pointer"
          >
            <span>
              <IconCross height="1rem" width="1rem"></IconCross>
            </span>
          </div> */}
          <div className="flex flex-col gap-5">
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Interactive Listening
            </h1> */}
            <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5">
              <div className="flex m-auto w-full md:mt-0 sm:mt-5">
                <div
                  title="Back to List"
                  className="mt-[6px] md:pr-4 sm:pr-2 cursor-pointer"
                  onClick={() => navigate(`/duolingo/module/listening`)}
                >
                  {" "}
                  <span>
                    <IconsArrowLeft
                      height="1.3rem"
                      width="1.3rem"
                    ></IconsArrowLeft>
                  </span>
                </div>
                <div className="self-start">
                  <div className="flex justify-start md:gap-4 sm:gap-2 sm:text-[13px] font-[400] sm:ml-3 md:ml-0">
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      {data.level === 1
                        ? "Easy"
                        : data.level === 2
                        ? "Medium "
                        : "Hard"}
                    </p>
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      Practice: {data.practice}
                    </p>
                    <p className="bg-[#EFECEC] px-2 py-2 rounded-md">
                      Total Attempt: {data.total_tested}
                    </p>
                  </div>
                </div>
                <div
                  className="cursor-pointer px-2 py-2 ml-3 md:mt-[2px] sm:mt-[1px]"
                  onClick={() =>
                    handleBookmark(data.id, data.type, data.inner_type)
                  }
                >
                  {bColor ? (
                    <StarFilled
                      style={{ fontSize: "20px", color: "#08c" }}
                    ></StarFilled>
                  ) : (
                    <StarOutlined
                      style={{ fontSize: "20px", color: "#08c" }}
                    ></StarOutlined>
                  )}
                </div>
              </div>

              <div className="ml-1 font-[700] text-[20px]  w-min fixed right-0 z-10">
                <Countdown
                  className={`${
                    isStart && !showSummaryBox ? "blcok" : "hidden"
                  } bg-[#DDE9F8]  px-2 py-1
                  rounded-md`}
                  onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                  valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                  onFinish={openNotification}
                  value={deadline}
                  format="mm:ss"
                />
                <Countdown
                  className={`${
                    showSummaryBox ? "block" : "hidden"
                  } bg-[#DDE9F8]  px-2 py-1
                  rounded-md`}
                  onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                  valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                  onFinish={openXmEnd}
                  value={secondStateTime}
                  format="mm:ss"
                />
              </div>
            </div>

            <div className={`w-[98%] m-auto  rounded-md `}>
              <div
                disabled={blur ? true : false}
                className={`${
                  blur ? " blur-sm" : ""
                } h-auto w-full flex justify-between px-1 py-2 gap-5`}
              >
                <div className="sm:hidden md:block md:w-[52%]">
                  <div className=" rounded-md m-auto mt-10 py-2 opacity-80 md:sticky">
                    {data.qa.additionalData.voiceActor === 1 ? (
                      !avatarState ? (
                        <TeacherSpeakingAnimation
                          isStopped={true}
                          widht={300}
                          height={500}
                        ></TeacherSpeakingAnimation>
                      ) : (
                        <TeacherSpeakingAnimation
                          isStopped={false}
                          widht={300}
                          height={500}
                        ></TeacherSpeakingAnimation>
                      )
                    ) : !avatarState ? (
                      <FTeacherSpeakingAnimation
                        isStopped={true}
                        widht={400}
                        height={500}
                      ></FTeacherSpeakingAnimation>
                    ) : (
                      <FTeacherSpeakingAnimation
                        isStopped={false}
                        widht={400}
                        height={500}
                      ></FTeacherSpeakingAnimation>
                    )}

                    {/* <img
                      src={TeacherSpeakingMouthOff}
                      className="h-[22rem] w-[20rem]"
                    ></img> */}
                    {/* <IconConversationBot
                      height="20rem"
                      width="20rem"
                    ></IconConversationBot> */}
                    {/* <IconSpeakingDot
                      height="2rem"
                      width="5rem"
                      fill="#c8ddf5"
                    ></IconSpeakingDot> */}
                  </div>
                </div>
                {/* <div className="w-[30%] h-[25rem] m-auto rounded-md py-2 opacity-80  sm:hidden md:block "></div> */}

                <div
                  id="journal-scroll"
                  className="md:w-[70%] sm:w-full sm:m-auto md:h-[35rem] shadow-sm z-10 py-3 overflow-y-scroll  mt-5"
                >
                  <div
                    className={`${
                      isConversationStart ? "h-auto" : "h-full"
                    } m-auto flex flex-col justify-center gap-5`}
                  >
                    <h1
                      className={`${
                        isConversationStart ? "hidden" : "block"
                      } sm:text-[17px] md:text-[22px]  sm:text-center md:text-start
                       font-poppins  font-[700]`}
                    >
                      You will participate in a conversation about the scenario
                      below
                    </h1>
                    <div
                      className={`${
                        isConversationStart ? "hidden" : "block"
                      } md:w-[80%] sm:w-full md:text-[20px] sm:text-[17px] `}
                    >
                      <p className="font-poppins font-[400]">{data.title}</p>
                    </div>

                    <div className="flex justify-start w-[80%]">
                      <div>
                        <button
                          onClick={(e) => handleStartQuestion()}
                          className={`${
                            isStart ? "hidden" : "block "
                          } px-5 py-3 bg-tahiti 
                   font-montserrat rounded-md m-auto text-white w-[5rem] `}
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="md:mt-10 sm:mt-5">
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
                          showNextBtn={showNextBtn}
                          handleSmmary={handleSmmary}
                          currentQuestion={1 + qCounter}
                          totalQ={questionList.length}
                          voiceIndex={voiceIndex}
                          handleNextQuestion={handleNextQuestion}
                          setAvatarState={setAvatarState}
                        ></ConverSationContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${showSummaryInput ? "block" : "hidden"}
               w-full px-2 py-2 mt-[2rem] flex justify-end`}
              >
                <div className={`${showSummaryBox ? "hidden" : "block"}`}>
                  <button
                    onClick={handleSummaryBox}
                    className="bg-[#3AB7BF]  px-4 py-2 m-auto rounded-md 
                font-poppins text-[17px] font-[600] flex justify-end w-full text-white"
                  >
                    Next Step
                  </button>
                </div>
              </div>

              <div
                className={`${showSummaryBox ? "block" : "hidden"} w-[90%] 
                m-auto px-2 py-2 flex flex-col justify-center gap-3 mt-10`}
              >
                <h1 className="text-center font-poppins text-[20px] font-[600]">
                  Summarize the Conversation you just had in 75 seconds.
                </h1>

                <TextArea
                  disabled={inputavailable ? false : true}
                  onChange={(e) => setUserSummaryInput(e.target.value)}
                  placeholder="Your response"
                  rows={5}
                  spellcheck="false"
                  className="text-[18px] font-poppins"
                ></TextArea>
              </div>
            </div>

            <div
              className={`${
                isStart ? "block" : "hidden"
              } flex gap-5 justify-center mt-10
            m-auto  font-poppins font-[500] sm:text-[12px] md:text-[15px]`}
            >
              <button
                onClick={handleRetry}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md drop-shadow-sm"
              >
                Retry
              </button>
              <button
                disabled={showSummaryBtn ? false : true}
                onClick={handleEvaluate}
                className={`${
                  showSummaryBtn ? "opacity-100" : "opacity-50"
                } bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm`}
              >
                Evaluate
              </button>
            </div>

            <div className="mr-3">
              <div className="flex gap-2 justify-center m-auto w-min">
                <span
                  onClick={handlePrev}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowLeft width="1rem" height="1rem"></IconsArrowLeft>
                </span>
                <h1 className="border-[2px] text-[20px] font-[600] border-[#3AB7BF] px-2 py-2 rounded-md">
                  {index}
                </h1>
                <span
                  onClick={handleNext}
                  className="m-auto w-min cursor-pointer"
                >
                  {" "}
                  <IconsArrowRight width="1rem" height="1rem"></IconsArrowRight>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5  flex justify-center">
            <div
              className={`${
                showEvaluate ? "block" : "hidden"
              } "h-auto w-[95%] m-auto"`}
            >
              <Collapse
                activeKey={openPanels}
                onChange={setOpenPanels}
                style={{ backgroundColor: "#DDE9F8" }}
                accordion
                items={[
                  {
                    key: "1",
                    label: "Evaluation Result",
                    children: (
                      <div className="flex flex-col gap-2 justify-between">
                        <div className="md:w-full sm:w-full m-auto md:flex md:flex-row sm:flex-col justify-center ">
                          {/* <AssmentContainer finalUserAns={finalUserAns} sampleAns={data?.qa?.a}></AssmentContainer> */}
                          <ConversationAssmentContainer
                            qData={data}
                            totalQ={questionList.length}
                            correctConversation={correctConversation}
                            userSumamryInput={userSumamryInput}
                            sampleAns={data?.qa.additionalData.summary}
                          ></ConversationAssmentContainer>
                        </div>
                        <div>
                          <div className="h-auto w-[92%] m-auto mt-5">
                            <Collapse
                              accordion
                              items={[
                                {
                                  key: "1",
                                  label: "Sample Answer",
                                  children: (
                                    <p className=" text-[17px] font-poppins h-auto px-1 flex flex-wrap gap-1">
                                      {data?.qa.additionalData?.summary
                                        .split(" ")
                                        .map((val) => (
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
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
