import React, { useEffect, useState } from "react";
import IconRecordOff from "../../../Assets/SVG/IELTS/IconRedRecordOff";
import IconMicOn from "../../../Assets/SVG/IELTS/IconRedRecord";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { useTimer } from "../../../hooks/useTimer";
import { Button } from "antd";
import { useTimerTwo } from "../../../hooks/useTimerTwo";
import sendToWhisper from "../../../utils/sendToWhisper";
import axiosInstance from "../../../utils/axios";
import { API_LEVEL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  saveIeltsSpeakingAssByPart,
  saveIeltsSpeakingStatByPart,
} from "../../../redux/slices/IELTS/ielts_speakingEV";

export default function PartTwo({ partTwoQuestion, handleSetion }) {
  console.log(partTwoQuestion);
  const dispatch = useDispatch();
  const { evSetList } = useSelector((state) => state.ielts_speakingEV);

  const { load, pause, stop, stopped, mute, playing } = useGlobalAudioPlayer();
  const { time, startTimer, stopTimer, setCustomTime } = useTimer(10);
  const { ctime, startCTimer, stopCTimer } = useTimerTwo(20);
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
  const [startxm, setStartXm] = useState(false);
  const [thinkTimeState, setThinkTimeState] = useState(true);
  const [qSplit, setQsplit] = useState(partTwoQuestion[2].text.split(/[.]/));
  const [nextPartBtnState, setNextPartBtnState] = useState(false);
  const [showRecordBtn, setShowRecordBtnState] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [partTwoUserSet, setPartTwoUserSet] = useState([]);
  const [letsEv, setLetEvents] = useState(false);

  useEffect(() => {
    load(partTwoQuestion[22].audio, {
      autoplay: true,
      onend: () => {
        setStartXm(false);
        startTimer();
      },
    });
  }, []);
  useEffect(() => {
    switch (time) {
      case 0:
        startRecording();
        stopTimer();
        setThinkTimeState(false);
        setShowRecordBtnState(true);
        break;

      default:
        // stopRecording();
        break;
    }
  }, [time]);

  useEffect(() => {
    switch (ctime) {
      case 0:
        setNextPartBtnState(true);
        break;

      default:
        // stopRecording();
        break;
    }
  }, [ctime]);
  useEffect(() => {
    if (isRecording) {
      startCTimer();
    }
  }, [isRecording]);

  useEffect(() => {
    if (!recordingBlob) return;

    const url = URL.createObjectURL(recordingBlob);
    const audioBlobUrl = {
      blobURL: url,
    };
    decodeAudio(audioBlobUrl);
    console.log(url);

    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recordingBlob]);

  const decodeAudio = async (audioBlobUrl) => {
    await sendToWhisper(audioBlobUrl)
      .then((res) => {
        setPartTwoUserSet({
          question: partTwoQuestion[2].text,
          answer: res.data.text,
        });

        setLetEvents(true);
        //  setNextPartBtnState(true);
      })
      .catch((err) => {
        setPartTwoUserSet({
          question: partTwoQuestion[2].text,
          answer: [],
        });
        setLetEvents(true);
      });
  };

  useEffect(() => {
    if (letsEv) {
      startEv();
    }
  }, [letsEv]);
  const startEv = async () => {
    await axiosInstance
      .post(`${API_LEVEL}/ielts/ev/stat`, { message: partTwoUserSet })
      .then(async (response) => {
        const data = {
          2: response.data.stat,
        };

        dispatch(saveIeltsSpeakingStatByPart(data));

        await getCompletion();
      });
  };

  const getCompletion = async () => {
    await axiosInstance
      .post(`${API_LEVEL}/ielts/ev/completion`, { message: partTwoUserSet })
      .then((response) => {
        const data = {
          2: response.data.errorList,
        };

        dispatch(saveIeltsSpeakingAssByPart(data));

        setLoadings(false);
      });
  };

  const startRecordingToggle = () => {
    startRecording();
  };
  const stopRecordingToggle = () => {
    stopRecording();
  };

  console.log(partTwoUserSet);

  const handleSetionPart = () => {
    setLoadings(true);
    stopRecording();

    setTimeout(() => {
      setLoadings(false);
      handleSetion();
    }, 12000);
    // if (sectionCurrent < 2) {
    //   setSectionCurrent(sectionCurrent + 1);
    // }
  };



  return (
    <div>
      <div
        className="bg-gray-100 w-full  mt-5 rounded-md h-[12rem]
           flex justify-between px-10 py-2 border-2"
      >
        <div className="self-center">
          <h1 className="font-[700] text-[20px] font-poppinsBold">PART 2</h1>
          <div className="mt-3">
            <h1>{qSplit[0]}</h1>
            <ul className="list-disc ml-8 mt-1">
              {qSplit.slice(1).map((val) => (
                <li key={val}>{val}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${thinkTimeState ? "block" : "hidden"} self-center`}>
          <span className="text-[30px] text-red-400">00:{time}</span>
        </div>

        <div className={`${showRecordBtn ? "block" : "hidden"} self-center`}>
          <div className="flex gap-10">
            {mediaRecorder && (
              <div style={{ marginTop: "3rem" }}>
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
                  <IconMicOn
                    fill="white"
                    height="2rem"
                    widht="2rem"
                  ></IconMicOn>
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
