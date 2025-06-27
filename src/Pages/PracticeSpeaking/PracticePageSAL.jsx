import React, { useEffect, useRef, useState } from "react";
import { Tag, Button, notification, Progress } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic, Skeleton, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../Components/Reading/RadioBtn.css";
import { ReactMic } from "react-mic";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import IconConversationBot from "../../Assets/SVG/IconConversationBot";
import IconSpeakingAvatar from "../../Assets/SVG/IconSpeakingAvatar";
import { useNavigate, useParams } from "react-router-dom";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { toggleBookmark } from "../../redux/slices/bookmark";
import IconCross from "../../Assets/SVG/IconCross";
import IconMikeOn from "../../Assets/SVG/IconMikeOn";
import sendToWhisper from "../../utils/sendToWhisper";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";

const { fuzzy } = require("fast-fuzzy");
const { Countdown } = Statistic;

export default function PracticePageSAL({ id, handleCloseModal }) {
  const dispatch = useDispatch();
  const synth = window.speechSynthesis;
  let [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [recordBtnState, setRecordBtnState] = useState(true);
  const [matching, setMatching] = useState();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);

  const [bColor, setBcolor] = useState(true);
  const { rid } = useParams();
  let [index, setIndex] = useState(rid);
  // const { error } = useSelector((state) => state.statistic);
  const { listSAL } = useSelector((state) => state.getSpeakingList);
  const { userInfo } = useSelector((state) => state.auth);
  let [data, setData] = useState({});
  const [deadline, setDeadline] = useState(2);
  const [showEvaluate, setShowEvaluate] = useState(false);
  const [bootCounter, setbootCounter] = useState(true);
  const [text, setText] = useState();
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  let [openPanels, setOpenPanels] = useState([1]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [userAns, setUserAns] = useState();
  const [modelWord, setModelWord] = useState();
  let dataLength = listSAL.length;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fluency, setFluency] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [misPronounceList, setMisPronounceList] = useState([]);
  const [constractiveFeeback, setConstractiveFeedback] = useState();
  const shouldEvaluateRef = useRef(false);
  const [evBtnState, setEvBtnState] = useState(true);
  const latestQuestionRef = useRef("");

  useEffect(() => {
    setShowEvaluate(false);
    setActive(false);
    stopRecording();
    setRecord(false);
    setUserAns(undefined);
    setMatching(undefined);
    setRecordBtnState(true);
    setTimeDanger(false);
    setOpenPanels([]);
    setAudioData(undefined);
    setModelWord(undefined);

    if (listSAL.length > 0) {
      const data = listSAL.find((val) => parseInt(rid) === val.index);
      if (data) {
        setData(data);
        setBcolor(data.bookmark);
        setText(data.qa.q);
        latestQuestionRef.current = data.qa.q;
        setDeadline(Date.now() + data.time * 60000);
        setModelWord(new Set(data.qa.q.toLowerCase().split(/\s+/)));
      }
    }

    const timeoutId = setTimeout(() => {
      isBusy(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId); // ✅ clean up the timeout
    };
  }, [rid, busy]);

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    let data = [];
    voices
      .filter((voice) => voice.lang.includes("en")) // showing only english voices
      .map((voice) => data.push(voice)); //all of the voices
    var totalResponses = data.length;
    var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponses;

    setUtterance(u);
    setVoice(data[responseIndex]);

    return () => {
      synth.cancel();
    };
  }, [data]);

  const handleNext = () => {
    if (index <= --dataLength) {
      isBusy(true);
      const nextIndex = parseInt(index) + 1;
      setIndex(nextIndex);
      navigate(`/practice/sal-s/${nextIndex}`);
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      isBusy(true);
      const nextIndex = parseInt(index) - 1;
      setIndex(nextIndex);
      navigate(`/practice/sal-s/${nextIndex}`);
    }
  };

  const startRecording = () => {
    setRecord(true);
    setEvBtnState(false);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStop = (recordedBlob) => {
    setAudioData(recordedBlob);
    console.log(recordedBlob);

    if (shouldEvaluateRef.current) {
      shouldEvaluateRef.current = false;
      startEvaluation(recordedBlob);
    }
  };

  const handleEvaluate = () => {
    if (record) {
      // User is still recording → stop & wait for audio blob
      setIsAnalyzing(true);
      setShowEvaluate(true);
      setOpenPanels([1]);
      shouldEvaluateRef.current = true;
      stopRecording();
      setRecordBtnState(false);
      setActive(false);
      setDeadline(null);
      setEvBtnState(true);
    } else if (audioData) {
      // Already recorded, just send
      setIsAnalyzing(true);
      setShowEvaluate(true);
      setOpenPanels([1]);
      startEvaluation(audioData);
      setRecordBtnState(false);
      setActive(false);
      setDeadline(null);
      setEvBtnState(true);
    } else {
      // No audio recorded yet — show a warning maybe
      notification.warning({
        message: "No recording available",
        placement: "top",
        description: "Please record your voice first before evaluating.",
      });
    }
  };

  const startEvaluation = (blobData) => {
    setAudioData(blobData);

    sendToWhisper(blobData).then(async (res) => {
      if (res?.data) {
        const wordsArray = res.data.trim().split(/\s+/);
        setUserAns(wordsArray);
        const message = {
          userVoice: res.data.trim(),
          originalOne: latestQuestionRef.current,
        };
        console.log(message);
        await axiosInstance
          .post(`${API_LEVEL}/ev/completion/sal`, { message: message })
          .then((response) => {
            setAccuracy(response.data.data.accuracy_score);
            setFluency(response.data.data.fluency_score);
            setConstractiveFeedback(response.data.data.feedback);
            setMisPronounceList(response.data.data.mispronouncedWordList);
            console.log(response);
          });
      } else {
        notification.error({
          message: "Error",
          placement: "top",
          description: "Failed to get evaluation from server.",
        });
      }
      setIsAnalyzing(false);
    });
  };

  const handleRetry = () => {
    isBusy(true);
    stopRecording();
    setRecord(false);
    setUserAns(undefined);
    setMatching(undefined);
    setRecordBtnState(true);
    setTimeDanger(false);
    setOpenPanels([]);
    setAudioData(undefined);

    notification.destroy();
    setActive(false);

    setShowEvaluate(false);
  };

  const handleSpeech = () => {
    setActive(!active);
    !active ? startRecording() : stopRecording();
    // setMatching(fuzzy(data.qa.q.toString(), transcript));
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

  const openNotification = () => {
    setActive(false);
    stopRecording();
    setRecordBtnState(false);
    notification.open({
      message: `Times Up`,
      placement: "top",
      type: "warning",
      style: {
        borderBottom: "2px solid red",
      },
    });
  };

  const handleAIsampleVoice = () => {
    utterance.voice = voice;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    synth.speak(utterance);
  };

  return (
    <div>
      {busy ? (
        <div className="w-full h-[30rem] flex justify-center m-auto sm:px-5 sm:py-10">
          {" "}
          <Skeleton active></Skeleton>
        </div>
      ) : (
        <div>
          <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
            {/* <div
              onClick={closeModalWindow}
              className="absolute right-0 mr-3 md:mt-[-1rem] sm:mt-[10px] cursor-pointer"
            >
              <span>
                <IconCross height="1rem" width="1rem"></IconCross>
              </span>
            </div> */}
            <div className="flex flex-col gap-5 sm:px-2">
              {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
                Read Aloud
              </h1> */}
              <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between m-auto w-full mt-5">
                <div className="flex m-auto w-full md:mt-0 sm:mt-5">
                  <div
                    title="Back to List"
                    className="mt-[6px] md:pr-4 sm:pr-2 cursor-pointer"
                    onClick={() => navigate(`/duolingo/module/speaking`)}
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

                <div
                  className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0 sm:mt-[15%] md:mt-0"
                >
                  <Countdown
                    onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
                    valueStyle={
                      timeDanger ? { color: "red" } : { color: "blue" }
                    }
                    onFinish={openNotification}
                    value={deadline}
                    format="mm:ss"
                  />
                </div>
              </div>

              <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[2rem] font-[600]">
                Record yourself saying the statement below.
              </h1>

              <div className="md:w-[70%] sm:w-full m-auto mt-5">
                <div className="sm:h-auto md:h-[15rem] border-[2px] border-[#3ab6bf5f] rounded-md sm:py-3">
                  <div className="md:flex md:flex-row sm:flex sm:flex-col justify-between gap-3 md:w-[60%] sm:w-[95%] h-full m-auto">
                    <div className="m-auto h-full md:hidden sm:block  w-full">
                      <div className="mt-10 drop-shadow-md flex justify-center">
                        <span>
                          <IconSpeakingAvatar
                            height="7rem"
                            width="7rem"
                          ></IconSpeakingAvatar>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center w-[80%] m-auto h-full items-center gap-10 ">
                      <h1 className="md:text-[22px] sm:text-[15px] font-poppins">
                        {data.qa.q}
                      </h1>

                      <div className="flex justify-between gap-3 ">
                        <ReactMic
                          className="rounded-md w-[40%]"
                          record={record}
                          visualSetting="frequencyBars"
                          onStop={onStop}
                          strokeColor="#53b0e5"
                          backgroundColor="#FFFFFF"
                        />

                        <button
                          disabled={!recordBtnState || active ? true : false}
                          onClick={handleSpeech}
                          className={`${
                            recordBtnState || active
                              ? "opacity-100"
                              : "opacity-50"
                          } bg-[#3AB7BF] px-3 py-2 rounded-md text-white font-[500]`}
                        >
                          {active ? "Recording" : "Record Now"}
                        </button>
                      </div>
                    </div>

                    <div className="m-auto  h-full ml-10 md:block sm:hidden">
                      <div className="mt-10 drop-shadow-md">
                        <span>
                          <IconSpeakingAvatar
                            height="7rem"
                            width="7rem"
                          ></IconSpeakingAvatar>
                        </span>
                      </div>
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
                      accordion
                      style={{ backgroundColor: "#DDE9F8" }}
                      activeKey={openPanels}
                      onChange={setOpenPanels}
                      items={[
                        {
                          key: "1",
                          label: "Evaluation Result",
                          children: (
                            <div>
                              {isAnalyzing ? (
                                <div className="flex flex-col items-center gap-2 py-6">
                                  <p className="text-[18px] font-semibold text-blue-600">
                                    Analyzing your response...
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <div className="w-full sm:w-full ">
                                    <div className="w-1/2 m-auto flex justify-center ">
                                      <div className="m-auto flex flex-col">
                                        <div className="sm:m-auto">
                                          <Progress
                                            style={{ fontSize: "10px" }}
                                            type="circle"
                                            percent={accuracy}
                                            size={70}
                                          />
                                        </div>
                                        <p className="text-[20px] font-[500] text-center">
                                          Accuracy
                                        </p>
                                      </div>

                                      <div className="m-auto flex flex-col">
                                        <div className="sm:m-auto">
                                          <Progress
                                            style={{ fontSize: "10px" }}
                                            type="circle"
                                            percent={fluency}
                                            size={70}
                                          />
                                        </div>
                                        <p className="text-[20px] font-[500] text-center">
                                          Fluency
                                        </p>
                                      </div>
                                    </div>

                                    <div className="mt-10 ">
                                      <h2 className="font-bold font-poppins text-gray-600 ml-1">
                                        Your Response:
                                      </h2>
                                      <div className="font-poppins text-[17px] mx-auto border-[1px] px-5 py-5 rounded-md border-gray-200">
                                        <p className="border-b-[2px]">
                                          {userAns?.map((word, index) => {
                                            const isMatch = modelWord.has(
                                              word.toLowerCase()
                                            );
                                            return (
                                              <span
                                                key={index}
                                                style={{
                                                  color: isMatch
                                                    ? "black"
                                                    : "red",
                                                  marginRight: 4,
                                                }}
                                              >
                                                {word}
                                              </span>
                                            );
                                          })}
                                        </p>
                                        {misPronounceList.length > 0 && (
                                          <div className="font-poppins text-[15px] mx-auto px-1 py-5 rounded-md border-gray-300">
                                            <div className="flex gap-3 overflow-x-auto">
                                              {misPronounceList.map(
                                                (item, index) => (
                                                  <div
                                                    key={index}
                                                    className="border border-tahiti rounded-md p-2 shadow-sm"
                                                  >
                                                    <p>
                                                      <span className="font-semibold text-red-400">
                                                        Wrong:
                                                      </span>{" "}
                                                      {item.w}
                                                    </p>
                                                    <p>
                                                      <span className="font-semibold text-green-400">
                                                        Correct:
                                                      </span>{" "}
                                                      {item.c}
                                                    </p>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}

                                        <div className="mt-2">
                                          <div className={`m-auto text-center`}>
                                            <audio
                                              className="bg-gray-100"
                                              controls
                                              src={audioData?.blobURL}
                                            ></audio>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-5">
                                      <h2 className="font-bold font-poppins text-gray-600 ml-1">
                                        Feedback
                                      </h2>
                                      <div className="font-poppins text-[16px] mx-auto border-[1px] px-5 py-5 rounded-md border-gray-200">
                                        <h2>{constractiveFeeback}</h2>
                                        <div className="ml-3 mt-5 flex gap-2 border-[1px] rounded-md justify-center m-auto">
                                          <h1 className="mt-[2px] text-[17px] font-poppins font-[500]">
                                            MENTOR
                                          </h1>
                                          <span
                                            onClick={handleAIsampleVoice}
                                            className="cursor-pointer"
                                          >
                                            <IconMikeOn
                                              height="2rem"
                                              width="2rem"
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* <div className="sm:ml-[-12px] ">

                                      <div
                                        className={`${
                                          isMobile ? "hidden" : "block"
                                         } m-auto text-center`}
                                       >
                                        <p>Your Answer</p>
                                        <audio
                                          controls
                                          src={audioData?.blobURL}
                                        ></audio>
                                      </div>
                                    </div> */}
                                  </div>
                                </>
                              )}
                            </div>
                          ),
                        },
                      ]}
                    />
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
                  disabled={evBtnState}
                  onClick={handleEvaluate}
                  className="bg-[#DDE9F8]  px-6 py-3 rounded-md  drop-shadow-sm"
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
                    <IconsArrowRight
                      width="1rem"
                      height="1rem"
                    ></IconsArrowRight>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
