import React, { useEffect, useRef, useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Statistic, Skeleton, Button } from "antd";
import TeacherSpeakingAnimation from "../../../Components/TeacherSpeakingAnimation";
import IconFinishCheck from "../../../Assets/SVG/IELTS/IconArrowDown";
import IconRedRecord from "../../../Assets/SVG/IELTS/IconRedRecord";
import IconRecordOff from "../../../Assets/SVG/IELTS/IconRedRecordOff";
import PartOne from "../../../Components/IELTS/Speaking/PartOne";
import PartTwo from "../../../Components/IELTS/Speaking/PartTwo";
import PartThree from "../../../Components/IELTS/Speaking/PartThree";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEvSetList,
  getSpeakingIeltsFinalEvResult,
} from "../../../redux/slices/IELTS/ielts_speakingEV";
import { OverallStatShowIELTS } from "../../../Components/IELTS/Speaking/OverallStatShowIELTS";
import { useParams } from "react-router-dom";
import FTeacherSpeakingAnimation from "../../../Components/FTeacherSpeakingAnimation";
import IconsArrowLeft from "../../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../../Assets/SVG/IconsArrowRight";
import IconMenuFold from "../../../Assets/SVG/IELTS/IconMenuFold";
import IconUnorderedList from "./IconUnOrderList";
const { Countdown } = Statistic;

const data = {
  1: {
    1: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_m/set_1_1.1.mp3",
      text: "What is Your Job?",
    },
    2: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_1.2.mp3",
      text: "Where do you work?",
    },
    3: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_1.3.mp3",
      text: "Why did You Choose that Job?",
    },
    4: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_1.4.mp3",
      text: "Do you Like your Job?",
    },
    11: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/first_starting_male_voice.mp3",
    },
  },
  2: {
    2: {
      text: "Describe a piece of art you like, You should say. what the work of art is. when you first saw it. what you know about it. and explain why you like it",
    },
    22: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/Part_2_male_voice.mp3",
    },
  },
  3: {
    1: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_m/set_1_3.1.mp3",
      text: "What are the tradition art forms in your country?",
    },
    2: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_m/set_1_3.2.mp3",
      text: "Do you think children should study art at school?",
    },
    3: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_m/set_1_3.3.mp3",
      text: "How can children benefit from learning art?",
    },
    4: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/set_1_m/set_1_3.4.mp3",
      text: "How has art changed in the last few decades in your country?",
    },
    33: {
      audio:
        "https://practicemania.s3.ap-south-1.amazonaws.com/ielts/speaking/part_3_male_voice.mp3",
    },
  },
};

export default function SpeakingPracticePage() {
  const { id } = useParams();
  const { load, pause, stop, stopped, mute, playing } = useGlobalAudioPlayer();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.ielts_speaking);
  let [index, setIndex] = useState(parseInt(id));
  const { evSetList, evStatList, overallStatData, partOneEvData } = useSelector(
    (state) => state.ielts_speakingEV
  );

  let [sectionCurrent, setSectionCurrent] = useState(0);
  const [speakingAnimationState, setSpeakingAnimationState] = useState(true);
  const [busy, isBusy] = useState(true);
  const [startxm, setStartXm] = useState(false);
  const [partOneQuestion, setPartOneQuestion] = useState({});
  const [partTwoQuestion, setPartTwoQuestion] = useState({});
  const [partThreeQuestion, setPartThreeQuestion] = useState({});
  const [startXmBtnState, setStartXmBtnState] = useState(true);
  const [showEvBtn, setShowEvBtnState] = useState(false);
  const [canEvnow, setCanEvnow] = useState(false);
  const [showEvBox, setShowEvBox] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [voiceSex, setVoiceSex] = useState(0);
  const [deadline, setDeadline] = useState(14);
  let dataLength = list.length;
  const modalRef = useRef();

  useEffect(() => {
    dispatch(clearEvSetList());
    const sectionData = list.filter((val) => val.index === index)[0];
    console.log(sectionData);
    const questionData = sectionData.q;

    setDeadline(Date.now() + sectionData?.time * 60000);
    setVoiceSex(sectionData.voice);
    setPartOneQuestion(questionData[1]);
    setPartTwoQuestion(questionData[2]);
    setPartThreeQuestion(questionData[3]);

    setTimeout(() => {
      isBusy(false);
    }, 2000);
  }, [index, busy, list]);

  console.log(partOneQuestion);

  useEffect(() => {
    if (playing) {
      setSpeakingAnimationState(false);
    } else {
      setSpeakingAnimationState(true);
    }
  }, [playing]);

  const handleNext = () => {
    if (index <= --dataLength) {
      setIndex(++index);
      isBusy(true)
    }
  };
  const handlePrev = () => {
    if (index > 1) {
      setIndex(--index);
      isBusy(true)
    }
  };

  const handleSetion = () => {
    if (sectionCurrent < 2) {
      setSectionCurrent(sectionCurrent + 1);
    }
  };

  const seakingState = (value) => {
    setSpeakingAnimationState(value);
  };

  const startXmNow = () => {
    setStartXmBtnState(false);
    console.log(partOneQuestion[11].audio);
    load(partOneQuestion[11].audio, {
      autoplay: true,
      onend: () => {
        setStartXm(false);
      },
    });
  };

  const handleCanEv = () => {
    setCanEvnow(true);
  };

  const showEvResult = () => {
    setLoadings(true);
    dispatch(
      getSpeakingIeltsFinalEvResult({
        evSetList: evSetList,
        evStatList: evStatList,
      })
    );

    setTimeout(() => {
      setShowEvBox(true);
      setLoadings(false);

      modalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 3000);
  };

  console.log(evSetList, evStatList);

  return (
    <div ref={modalRef}>
      {busy ? (
        <div className="w-full h-[30rem] flex justify-center m-auto sm:px-5 sm:py-10">
        {" "}
        <Skeleton active></Skeleton>
      </div>
      ) : (
        <div className="px-10 py-3 mt-5 w-full h-full font-poppins">
          <div
            className={`${
              showEvBox ? "pointer-events-none opacity-60" : ""
            }  w-full 
            px-10 py-5`}
          >
            <div className="w-full flex justify-end">
              <Countdown
                className="bg-[#DDE9F8] px-3 py-2 font-bold rounded-md"
                //   onChange={handleXmTime}
                //  valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
                // onFinish={openNotification}
                value={deadline}
                format="mm:ss"
              />
            </div>

            <div className="w-full flex justify-center mt-[-5rem]">
              <div className="flex justify-center w-full ml-[4rem] drop-shadow-md pointer-events-none">
                <div>
                  {voiceSex === 0 ? (
                    <div>
                      <TeacherSpeakingAnimation
                        isStopped={speakingAnimationState}
                        widht={300}
                        height={400}
                      ></TeacherSpeakingAnimation>
                      <h2
                        className="mt-[-4rem] text-center ml-[-1rem]
              font-bold font-poppinsBold text-[22px] text-tahiti 
            tracking-wider"
                      >
                        Professor Clayton
                      </h2>
                    </div>
                  ) : (
                    <div>
                      <FTeacherSpeakingAnimation
                        isStopped={speakingAnimationState}
                        widht={300}
                        height={400}
                      ></FTeacherSpeakingAnimation>
                      <h2
                        className="mt-[-3rem] text-center ml-[-1rem]
              font-bold font-poppinsBold text-[22px] text-tahiti 
            tracking-wider"
                      >
                        Professor Carlet
                      </h2>
                    </div>
                  )}
                </div>
              </div>

              <div className="self-center ml-auto mt-[1rem]">
                <div
                  className=" border-2  w-[14rem] py-[1rem] text-start
             px-5 rounded-md flex-col  self-end text-[20px]"
                >
                  <div
                    className={`${
                      sectionCurrent > 0 ? "opacity-100" : "opacity-20"
                    } w-full text-start flex gap-2 `}
                  >
                    <span>
                      <IconFinishCheck
                        height="1.5rem"
                        width="1.5rem"
                      ></IconFinishCheck>
                    </span>
                    <h2 className="font-[700] mb-5 mt-[-3px]">Part 1</h2>
                  </div>
                  <div
                    className={`${
                      sectionCurrent > 1 ? "opacity-100" : "opacity-20"
                    } w-full text-start flex gap-2 `}
                  >
                    <span>
                      <IconFinishCheck
                        height="1.5rem"
                        width="1.5rem"
                      ></IconFinishCheck>
                    </span>
                    <h2 className="font-[700] mb-5 mt-[-3px]">Part 2</h2>
                  </div>
                  <div
                    className={`${
                      canEvnow ? "opacity-100" : "opacity-20"
                    } w-full text-start flex gap-2 `}
                  >
                    <span>
                      <IconFinishCheck
                        height="1.5rem"
                        width="1.5rem"
                      ></IconFinishCheck>
                    </span>
                    <h2 className="font-[700] mt-[-3px]">Part 3</h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                startxm ? "flex" : "hidden"
              } flex w-full justify-center ml-[-6rem] mt-[5rem]`}
            >
              <button
                disabled={!startXmBtnState ? true : false}
                onClick={startXmNow}
                className={`${
                  startXmBtnState ? "opacity-100" : "opacity-30"
                } bg-gray-200 rounded-md
                text-tahiti font-bold px-10 py-3 drop-shadow-sm`}
              >
                START EXAM
              </button>
            </div>

            <div
              className={`${
                !startxm ? "block" : "hidden"
              } w-[90%] m-auto h-full mt-10`}
            >
              {sectionCurrent === 0 ? (
                <PartOne
                  handleSetion={handleSetion}
                  partOneQuestion={partOneQuestion}
                  seakingState={seakingState}
                ></PartOne>
              ) : sectionCurrent === 1 ? (
                <PartTwo
                  handleSetion={handleSetion}
                  partTwoQuestion={partTwoQuestion}
                ></PartTwo>
              ) : sectionCurrent === 2 ? (
                <PartThree
                  handleSetion={handleCanEv}
                  partThreeQuestion={partThreeQuestion}
                  loadingsFinal={loadings}
                ></PartThree>
              ) : null}

              {/* <div className="w-full flex justify-end">
                <Button
                  onClick={handleSetion}
                  className="mt-3 bg-gray-300 border-none
             text-gray-700 font-bold"
                >
                  Next Part
                </Button>
              </div> */}
            </div>

            <div
              className={`${
                canEvnow ? "block" : "hidden"
              } w-full flex justify-center mt-10 px-10 py-10 `}
            >
              <Button
                loading={loadings}
                onClick={showEvResult}
                className="  text-[20px]
             text-gray-500 font-bold h-[3rem] w-[10rem] hover:text-tahiti"
              >
                Evaluate
              </Button>
            </div>
          </div>

          <div
            className={`${
              showEvBox ? "block" : "hidden"
            } w-[90%] m-auto rounded-md py-5 px-2 bg-blue-50`}
          >
            <div className="px-5 py-3">
              <h2
                className="sm:text-[17px] md:text-[30px]
               font-poppinsBold text-center text-gray-600"
              >
                Evalution Result
              </h2>

              <div className="mt-5 px-2 py-2">
                <div className="w-full m-auto">
                  <OverallStatShowIELTS
                    overallStatData={overallStatData}
                  ></OverallStatShowIELTS>
                </div>
              </div>
            </div>
          </div>

          <div className="h-20 w-full p-5">
            <div className="w-full flex space-x-2 justify-center">
              <span
                title="back to List"
                className="drop-shadow-sm cursor-pointer"
              >
                <IconUnorderedList
                  height="2.2rem"
                  width="2.2rem"
                  fill="#3ab7bf"
                ></IconUnorderedList>
              </span>
              <div className="mr-3">
                <div className="flex gap-2 justify-center m-auto w-min">
                  <span
                    onClick={handlePrev}
                    className="m-auto w-min cursor-pointer"
                  >
                    {" "}
                    <IconsArrowLeft width="1rem" height="1rem"></IconsArrowLeft>
                  </span>
                  <h1
                    className="border-[2px]
                   text-[16px] font-[600] border-[#3AB7BF] px-2 py-1 rounded-md"
                  >
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
