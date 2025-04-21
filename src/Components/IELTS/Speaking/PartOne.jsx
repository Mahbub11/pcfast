import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconRecordOff from "../../../Assets/SVG/IELTS/IconRedRecordOff";
import IconMicOn from "../../../Assets/SVG/IELTS/IconRedRecord";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Statistic, Skeleton, Button } from "antd";
import sendToWhisper from "../../../utils/sendToWhisper";
import { useTimer } from "../../../hooks/useTimer";
import { Flex, Progress } from "antd";
import axiosInstance from "../../../utils/axios";
import { API_LEVEL } from "../../../config";
import {
  saveIeltsSpeakingAssByPart,
  saveIeltsSpeakingStatByPart,
} from "../../../redux/slices/IELTS/ielts_speakingEV";
import { useTimerTwo } from "../../../hooks/useTimerTwo";
const { Countdown } = Statistic;

export default function PartOne({ partOneQuestion, handleSetion }) {
  const dispatch = useDispatch();
  const { evSetList } = useSelector((state) => state.ielts_speakingEV);
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const { load, stop } = useGlobalAudioPlayer();

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [partOneUserSet, setPartOneUserSet] = useState([]);
  const [playBtnState, setPlayBtnState] = useState(true);
  const [upcommingQBarPercent, setUpcommingQBar] = useState(0);
  const [loadings, setLoadings] = useState(false);
  const [nextPartBtnState, setNextPartBtnState] = useState(false);
  const [letsEv, setLetEvents] = useState(false);

  const qLength = Object.keys(partOneQuestion).length - 1;
  const { time, startTimer, stopTimer, setCustomTime } = useTimer(10);
  const { ctime, startCTimer, stopCTimer } = useTimerTwo(10);
  const [startTheRecording, setStartTheRecording] = useState(false);

  useEffect(() => {
    if (currentQuestion === qLength) {
      setTimeout(() => {
        setNextPartBtnState(true);
      }, 7000);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (startTheRecording) {
      startRecordingToggle();
      setStartTheRecording(false);
    }
  }, [startTheRecording]);
  useEffect(() => {
    switch (time) {
      case 0:
        if (currentQuestion < qLength) {
          setCustomTime(10); // Reset the timer to 10 seconds
          stopTimer();
          setPlayBtnState(true);
        }
        break;
      case 1:
        setUpcommingQBar(3);
        break;
      case 2:
        setUpcommingQBar(5);
        break;
      case 3:
        setUpcommingQBar(10);
        break;
      case 4:
        setUpcommingQBar(20);
        break;
      case 5:
        setUpcommingQBar(30);
        break;
      case 6:
        setUpcommingQBar(40);
        break;
      case 7:
        setUpcommingQBar(50);
        break;
      case 8:
        setUpcommingQBar(60);
        break;
      case 9:
        setUpcommingQBar(70);
        break;
      default:
        setUpcommingQBar(0);
        break;
    }
  }, [time, startTimer, stopTimer]);

  useEffect(() => {
    if (!recordingBlob) return;
    const url = URL.createObjectURL(recordingBlob);
    const audioBlobUrl = {
      blobURL: url,
    };
    decodeAudio(audioBlobUrl);
    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  useEffect(() => {
    if (letsEv) {
      startEv();
    }
  }, [letsEv]);

  const startEv = async () => {
    await axiosInstance
      .post(`${API_LEVEL}/ielts/ev/stat`, { message: partOneUserSet })
      .then(async (response) => {
        const data = {
          1: response.data.stat,
        };
        dispatch(saveIeltsSpeakingStatByPart(data));
        getCompletion();
      });
  };

  const getCompletion = async () => {
    await axiosInstance
      .post(`${API_LEVEL}/ielts/ev/completion`, { message: partOneUserSet })
      .then((response) => {
        const data = {
          1: response.data.errorList,
        };

        dispatch(saveIeltsSpeakingAssByPart(data));

        setLoadings(false);
        handleSetion();
      })
      .catch((err) => {
        const data = {
          1: [],
        };
        dispatch(saveIeltsSpeakingAssByPart(data));

        setLoadings(false);
        handleSetion();
      });
  };

  const decodeAudio = async (audioBlobUrl) => {
    await sendToWhisper(audioBlobUrl)
      .then((res) => {
        setPartOneUserSet((prev) => [
          ...prev,
          {
            question: partOneQuestion[currentQuestion].text,
            answer: res?.data?.text,
          },
        ]);

        if (currentQuestion === qLength) {
          setLetEvents(true);
          //  setNextPartBtnState(true);
        }
      })
      .catch((err) => {
        setPartOneUserSet((prev) => [
          ...prev,
          {
            question: partOneQuestion[currentQuestion].text,
            answer: "",
          },
        ]);
        if (currentQuestion === qLength) {
          setLetEvents(true);
          //  setNextPartBtnState(true);
        }
      });
  };

  const startRecordingToggle = () => {
    console.log("Chd");
    startRecording();
  };

  const stopRecordingToggle = () => {
    stopRecording();
  };

  const listenCurrentQuestion = (val) => {
    if (isRecording) {
      stopRecordingToggle(); // Stop the recording if it is currently in progress
    }

    startTimer();
    setPlayBtnState(false);
    const audio = partOneQuestion[val].audio;

    load(audio, {
      autoplay: true,
      onend: () => {
        const currentQuestionNumberBeforeStop = currentQuestionNumber;

        setCurrentQuestion(currentQuestionNumberBeforeStop);

        if (currentQuestionNumber < qLength) {
          setCurrentQuestionNumber((prevNumber) => prevNumber + 1);
        }

        setTimeout(() => {
          setStartTheRecording(true);
        }, 2000); // Delay starting the recording to allow time for the user to respond
      },
    });
  };

  const handleSetionPart = async () => {
    setLoadings(true);
    stopRecording();
  };

  return (
    <div>
      <div
        className="bg-gray-100  w-full rounded-md h-[10rem] flex justify-between
         px-10 py-2"
      >
        <div className="self-center">
          <h1 className="font-[700] text-[20px] font-montserrat">PART 1</h1>
          <h1 className="font-montserrat font-[500]">
            Listen Carefully and record your Answer.
          </h1>
          <div className="flex flex-col w-[10rem]">
            <Button
              disabled={!playBtnState ? true : false}
              onClick={() => listenCurrentQuestion(currentQuestionNumber)}
              className="mt-3 bg-white/90 border-none
             text-gray-700 font-bold"
            >
              Listen Question
              <span className="ml-2 text-[16px] text-red-400 font-poppinsBold">
                {currentQuestionNumber}
              </span>
            </Button>
            <Progress
              className="ml-1"
              aria-label="flase"
              style={{ width: "150px" }}
              showInfo={false}
              strokeColor="#3ab7bf"
              strokeWidth={4}
              size="small"
              percent={upcommingQBarPercent}
            />
          </div>
        </div>

        <div className="flex gap-10">
          {mediaRecorder && (
            <div style={{ marginTop: "5rem" }}>
              <LiveAudioVisualizer
                mediaRecorder={mediaRecorder}
                width={100}
                height={20}
                gap={3}
                barWidth={5}
              />
            </div>
          )}
          <div
            className={`${
              isRecording ? "flex" : "hidden"
            } self-center bg-red-400 rounded-full px-4
           justify-center drop-shadow-md
          py-4`}
          >
            <div className=" bg-white/30 rounded-full px-5 py-3 drop-shadow-md">
              <span
                onClick={stopRecordingToggle}
                className="cursor-pointer mt-3 flex drop-shadow-md"
              >
                <IconMicOn fill="white" height="2rem" widht="2rem"></IconMicOn>
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${
            isRecording ? "hidden" : "flex"
          } self-center bg-red-400 rounded-full px-4
           justify-center drop-shadow-md
          py-4`}
        >
          <div className=" bg-white/30 rounded-full px-5 py-3 drop-shadow-md">
            <span
              onClick={startRecordingToggle}
              className="cursor-pointer mt-3 flex drop-shadow-md"
            >
              <IconRecordOff
                fill="white"
                height="2rem"
                widht="2rem"
              ></IconRecordOff>
            </span>
          </div>
        </div>
      </div>

      <div
        className={`${
          nextPartBtnState ? "block" : "hidden"
        } w-full flex justify-end`}
      >
        <Button
          loading={loadings}
          onClick={handleSetionPart}
          className="mt-3 bg-gray-300 border-none
             text-gray-700 font-bold"
        >
          Next Part
        </Button>
      </div>
    </div>
  );
}
