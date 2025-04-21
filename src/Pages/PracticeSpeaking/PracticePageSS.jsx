import React, { useEffect, useRef, useState } from "react";
import { Tag, Button, notification, Progress, Collapse } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Reading/RadioBtn.css";
import { IconMicrophone } from "../../Assets/SVG/IconMicrophone";
import { IconMicOffCircle } from "../../Assets/SVG/IconMicOff";
import { ReactMic } from "react-mic";
import { useParams } from "react-router-dom";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { getWordDetails } from "../../redux/slices/disctionary";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import IconSpeakingAvatar from "../../Assets/SVG/IconSpeakingAvatar";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import AssmentContainer from "../../Components/Assesment/AssmentContainer";
import { ShowNotification } from "../../redux/actions";
import {
  clearAssesmentResult,
  getAssesmentResult,
} from "../../redux/slices/assesmentResult";
import {
  clearGPTAssesmentResult,
  getStatResult,
} from "../../redux/slices/gptAssmentResult";
import sendToWhisper from "../../utils/sendToWhisper";
import { AssesmentContainer } from "../../Components/AssesmentGPT/AssesmentContainer";
const { fuzzy } = require("fast-fuzzy");
const { Countdown } = Statistic;

export default function PracticePageSS({ id, handleCloseModal }) {
  const dispatch = useDispatch();
  let [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  let [index, setIndex] = useState(id);
  const { rid } = useParams();
  const { listSS } = useSelector((state) => state.getSpeakingList);
  let [data, setData] = useState({});
  let [openPanels, setOpenPanels] = useState([]);
  const modalRef = useRef();

  const [deadline, setDeadline] = useState(0);
  const [xmTime, setxmTime] = useState(null);
  const [thinkTime, setThinkTime] = useState(Date.now() + 0.133333 * 60000);
  const [showThinkTime, setShowThinkTime] = useState(true);
  const [enableEvaluationBtn, setenableEvaluationBtn] = useState(true);

  let dataLength = listSS.length;
  const [isWorking, setIsWorking] = useState(false);
  const [showEvaluate, setShowEvaluate] = useState(false);
  const [bColor, setBcolor] = useState(true);
  const [bootCounter, setbootCounter] = useState(true);
  const [loadingImage, setLoadingImg] = useState(true);
  const [feedbackState, setFeedbackState] = useState(true);
  const [recordingState, setRecordingState] = useState(true);
  const shouldSendToWhisperRef = useRef(false);
  const [audioText, setAudioText] = useState();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    notification.destroy();
    if (!bootCounter) {
      setbootCounter(true);
      setThinkTime(undefined);
    }
  }, [bootCounter]);


  useEffect(() => {
    setIndex(id);
  }, [id]);

  useEffect(() => {
    setenableEvaluationBtn(false);
    setShowEvaluate(false);
    if (id) {
      const data = listSS.filter((val) => index === val.index);
      setData(data[0]);
      setShowThinkTime(true);
      setBcolor(data[0].bookmark);
      setDeadline(data[0]?.time * 60000);
      setFeedbackState(true);
    } else {
      const data = listSS.filter((val) => parseInt(rid) === val.id);
      setData(data[0]);
      setShowThinkTime(true);
      setBcolor(data[0].bookmark);
      setDeadline(data[0]?.time * 60000);
      setFeedbackState(true);
    }
    setTimeout(() => {
      isBusy(false);
      stopRecording(false); // Explicitly stop recording without sending to Whisper
      setRecordingState(true);
      stopRecording();
    }, 1000);
  }, [data, index, busy]);
  useEffect(() => {
    if (data) {
      setThinkTime(Date.now() + 0.333333 * 60000);
    }
  }, [data]);

  useEffect(() => {
    if (!recordingState) {
      startRecording();
      setxmTime(Date.now() + deadline);
      setShowThinkTime(false);
    }
  }, [recordingState]);

  const handleNext = () => {
    if (index <= --dataLength) {
      setIsWorking(false);
      setIsRecording(false);
      stopRecording(false); // Explicitly stop recording without sending to Whisper
      setRecordingState(true);
      dispatch(clearGPTAssesmentResult());
      setShowThinkTime(true);
      setThinkTime(Date.now() + 0.333333 * 60000);
      setenableEvaluationBtn(false);
      setxmTime(undefined);

      setShowEvaluate(false);
      setIndex(++index);
      setFeedbackState(true);
      clearTimeout();
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIsWorking(false);
      setIsRecording(false);
      stopRecording(false); // Explicitly stop recording without sending to Whisper
      setRecordingState(true);
      dispatch(clearGPTAssesmentResult());
      setShowThinkTime(true);
      setThinkTime(Date.now() + 0.333333 * 60000);
      setenableEvaluationBtn(false);
      setxmTime(undefined);

      setShowEvaluate(false);
      setIndex(--index);
      setFeedbackState(true);
      clearTimeout();
    }
  };

  const startRecording = () => {
    setThinkTime(0);
    setRecord(true);
    setIsRecording(true);
  };

  const stopRecording = (shouldSendToWhisper) => {
    setIsRecording(false);
    shouldSendToWhisperRef.current = shouldSendToWhisper; // Update ref value
    setRecord(false);
  };

  const onStop = (recordedBlob) => {
    console.log(
      "Recording stopped, sendToWhisper: ",
      shouldSendToWhisperRef.current
    ); // Debugging message

    if (shouldSendToWhisperRef.current) {
      sendToWhisper(recordedBlob).then((res) => {
        setAudioText(res.data.text);
        getGrammarCompletion(res.data.text);
      });
    }

    setAudioData(recordedBlob);
  };
  const getGrammarCompletion = (text) => {
    dispatch(clearGPTAssesmentResult());
    const askData = {
      message: `
      'question':${data.qa.q}
      'passage':${text}
      `,
      type: 1,
    };
    dispatch(getStatResult(askData));
    setOpenPanels(["1"]);
    setShowEvaluate(true);
  };

  const openNotification = (placement) => {
    stopRecording();
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        border: "2px solid red",
      },
    });
  };

  const handleEvaluate = () => {
    setxmTime(0)
    setIsRecording(false);
    stopRecording(true); // Explicitly stop recording and send to Whisper
    setenableEvaluationBtn(false);
    setShowThinkTime(false);
    dispatch(clearGPTAssesmentResult());
    setOpenPanels(["1"]);
    setShowEvaluate(true);


    setTimeout(() => {
      if (shouldSendToWhisperRef.current) {
        sendToWhisper(audioData).then((res) => {
          setAudioText(res.data.text);
          getGrammarCompletion(res.data.text);
        });
      }
    }, 3000);


    modalRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    setTimeout(() => {
      modalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 1000);
  };

  const handleRetry = () => {
    setIsRecording(false);
    setIsWorking(false);
    stopRecording(false); // Explicitly stop recording without sending to Whisper
    setRecordingState(true);
    dispatch(clearGPTAssesmentResult());
    setShowThinkTime(true);
    setThinkTime(Date.now() + 0.333333 * 60000);
    setenableEvaluationBtn(false);
    setxmTime(undefined);
    setFeedbackState(true);
    setShowEvaluate(false);
  };
  const handleSpeech = () => {
    if (recordingState) {
      setRecordingState(false);
      setIsWorking(true);
    }
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

  const closeModalWindow = () => {
    setIsWorking(false);
    setIsRecording(false);
    setbootCounter(false);
    setShowThinkTime(true);
    stopRecording(false); // Explicitly stop recording without sending to Whisper
    setRecordingState(true);

    clearTimeout();
    setxmTime(undefined);
    setenableEvaluationBtn(false);
    setShowEvaluate(false);
    dispatch(clearGPTAssesmentResult());
    setFeedbackState(true);

    // setData([])
    handleCloseModal();
  };

  const handleXmTime = (e) => {

    console.log(e)
    if (e <= 60000) {
      setTimeDanger(true);
    }
    if (e <= 60000) {
      setenableEvaluationBtn(false);
    }
  };
  const handleFeedbackState = (val) => {
    setFeedbackState(val);
  };
const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  return (
    <div ref={modalRef}>
      {busy ? (
        <div className="w-full h-[30rem] flex justify-center m-auto sm:px-5 sm:py-10">
          {" "}
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
          <div
            onClick={closeModalWindow}
            className="absolute right-0 mr-3 md:mt-[-1rem] sm:mt-[10px]  cursor-pointer"
          >
            <span>
              <IconCross height="1rem" width="1rem"></IconCross>
            </span>
          </div>
          <div className="flex flex-col gap-5 sm:px-2">
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Speaking Sample
            </h1> */}
            <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5">
              <div className="flex m-auto w-full md:mt-0 sm:mt-5">
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

              <div
                className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0 sm:mt-[15%] md:mt-0"
              >
                <Countdown
                  onChange={handleXmTime}
                  valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                  onFinish={openNotification}
                  value={xmTime}
                  format="mm:ss"
                />
              </div>
            </div>

            <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-3 font-[600]">
              Speak about the topic below for 3 minutes.
            </h1>

            <div className="md:w-[85%] sm:w-full m-auto">
              <div className=" border-[1px] border-[#3ab6bf5f] rounded-md">
                <div className="md:w-[90%] sm:full m-auto md:flex md:flex-row sm:flex-col justify-between px-2 py-2 gap-3">
                  <div className="h-auto w-full px-2 py-1 ">
                    <div>
                      <div
                        className="flex flex-col justify-center sm:w-full md:w-[90%] m-auto mt-5
                              "
                      >
                        <h1 className="font-poppins font-[500] m-auto md:text-[20px] sm:mt-10">
                          {data?.qa?.q.split(" ").map((val) => {
                            return (
                              <span
                                className="cursor-pointer md:hover:text-blue-500"
                                onClick={handleMeaning}
                              >
                                {val + " "}
                              </span>
                            );
                          })}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="h-auto w-full">
                    <div className="m-auto flex flex-col gap-5 justify-between  h-full ">
                      <div className="sm:hidden md:flex mt-10 drop-shadow-md  justify-center">
                        <span>
                          <IconSpeakingAvatar
                            height="7rem"
                            width="7rem"
                          ></IconSpeakingAvatar>
                        </span>
                      </div>

                      <div className="flex justify-end w-full mt-5 ml-[-10px]">
                        <div className="flex gap-2">
                          <div className="mt-2">
                            <ReactMic
                              className="rounded-md h-[1.5rem]"
                              record={record}
                              visualSetting="frequencyBars"
                              onStop={onStop}
                              strokeColor="#53b0e5"
                              backgroundColor="#FFFF"
                            />
                          </div>
                          <div
                            className={`${
                              showThinkTime ? "relative" : "hidden"
                            }`}
                          >
                            <Countdown
                              onChange={(e) => {
                                setIsRecording(e <= 10000);
                              }}
                              valueStyle={
                                timeDanger
                                  ? { color: "red" }
                                  : { color: "blue" }
                              }
                              value={thinkTime}
                              format="mm:ss"
                            />
                          </div>
                          <button
                            disabled={!isRecording}
                            onClick={handleSpeech}
                            className={`${
                              isRecording ? "opacity-100" : "opacity-50"
                            } bg-[#3AB7BF] px-3 py-2 self-end rounded-md text-white font-[500]`}
                          >
                            {isWorking && isRecording
                              ? "Recording..."
                              : "Record Now"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-5 justify-center mt-5 font-poppins font-[500] sm:text-[12px] md:text-[15px]">
              <button
                onClick={handleRetry}
                className="bg-[#DDE9F8]  px-6 py-3 rounded-md drop-shadow-sm"
              >
                Retry
              </button>
              <button
                  disabled={!enableEvaluationBtn ? true : false}
                onClick={handleEvaluate}
                className={`${
                  enableEvaluationBtn ? "opacity-100" : "opacity-50"
                } bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm`}
              >
                {enableEvaluationBtn ?'Evaluate':'Continue after 2 minute'}
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

            <div className="mt-5  flex justify-center">
              <div
                className={`${
                  showEvaluate ? "block" : "hidden"
                } "h-auto w-[95%] m-auto"`}
              >
                <Collapse
                  activeKey={openPanels}
                  onChange={setOpenPanels}
                  accordion
                  style={{ backgroundColor: "#DDE9F8" }}
                  items={[
                    {
                      key: "1",
                      label: "Evaluation Result",
                      children: (
                        <div className="flex flex-col gap-2 justify-between">
                          <div className="md:w-full sm:w-full m-auto md:flex md:flex-row sm:flex-col justify-center ">
                            <AssesmentContainer
                              isfluency={true}   qData={data}
                              userAns={audioText}
                              sampleAns={data.qa.a}
                              feedbackState={feedbackState}
                              handleFeedbackState={handleFeedbackState}
                            ></AssesmentContainer>
                          </div>
                          <div className="m-auto">
                            <p className="text-center font-poppins text-[18px]">
                              Your Answer
                            </p>
                            <audio controls src={audioData?.blobURL}></audio>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
