import React, { useEffect, useState } from "react";
import IconSpeakingAvatar from "../../../../Assets/SVG/IconSpeakingAvatar";
import { ReactMic } from "react-mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Statistic, message } from "antd";
import { useDispatch } from "react-redux";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
const { fuzzy } = require("fast-fuzzy");
const { Countdown } = Statistic;

export default function SALpage({ data, handleNextQuestion }) {
  let [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState();
  const [xmFinish, setXmfinish] = useState(false);
  const dispatch = useDispatch();
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [loadings, setLoadings] = useState(false);

  useEffect(() => {
    setDeadline(Date.now() + data.time* 60000);
    setTimeDanger(false);
  }, [data]);

  useEffect(() => {
    if (xmFinish) {
      setTimeout(() => {
        handleEvaluate();
      }, 2000);
    }
  }, [xmFinish]);

  const startRecording = () => {
    setRecord(true);
   
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStop = (recordedBlob) => {
    setAudioData(recordedBlob.blobURL);
   
  };

  const handleSpeech = () => {
    startRecording();
    SpeechRecognition.startListening();
  };

  const handleSave = () => {
    setLoadings(true)
    setTimeDanger(true)
     setDeadline(0);
    setRecord(false);
    stopRecording();
    SpeechRecognition.stopListening();
    setTimeout(()=>{
    setXmfinish(true)
   
   
  },3000)
  };

  
  const handleEvaluate = () => {
    setTimeDanger(true)
    setDeadline(0);
    setRecord(false);
    stopRecording();
    SpeechRecognition.stopListening();
    setXmfinish(false);
    const mockData = {
      q: data.qa.q,
      a: data.qa.a,
      userAns: transcript,
      time: data.time,
      type: data.type,
      inner_type: data.inner_type,
      audioData: audioData,
      result: Math.floor(
        fuzzy(data.qa.q.toString(), transcript ? transcript : "") * 100
      ),
    };
    dispatch(saveMockTestUserAns(mockData));
    resetTranscript();
    setAudioData("");
    setLoadings(false)

    handleNextQuestion();
  };

  const handleTimeFinish = () => {
    if (!xmFinish) {
      handleSave();
    }
  };



  return (
    <div>
      <div>
        <div className="w-full flex justify-end px-2 py-[1rem]">
          <div
            className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0  md:mt-0"
          >
            <Countdown
              // onChange={handleCountdown}
              valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
              value={deadline}
              onFinish={handleTimeFinish}
              format="mm:ss"
            />
          </div>
        </div>
        <div
          className="sm:h-auto md:h-[15rem] border-[2px] border-[#3ab6bf5f]
         rounded-md sm:py-3 md:w-[80%] m-auto mt-10"
        >
          <div
            className="md:flex md:flex-row sm:flex sm:flex-col justify-between 
          gap-3 md:w-full sm:w-[95%] h-full m-auto px-3"
          >
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

            <div className="flex flex-col justify-center w-full m-auto h-full items-center gap-10 ">
              <h1 className="md:text-[20px] sm:text-[15px] font-poppins">
                {data.qa.q}
              </h1>

              <div className="flex justify-end gap-3 ml-[-5rem]">
                <ReactMic
                  className="rounded-md w-[40%]"
                  record={record}
                  visualSetting="frequencyBars"
                  onStop={onStop}
                  strokeColor="#53b0e5"
                  backgroundColor="#FFFFFF"
                />

                <button
                  onClick={handleSpeech}
                  className="bg-[#3AB7BF] px-3 py-2 rounded-md text-white font-[500]"
                >
                  Record Now
                </button>
              </div>
            </div>

            <div className="m-auto h-full md:block sm:hidden">
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
      </div>
      <div className="w-full justify-end flex mt-3 px-3 py-3">
        <Button
         style={{ color: "white", border: "none", backgroundColor: "#3AB7BF",height:'3rem' }}
          loading={loadings} 
          disabled={!timeDanger ? false : true}
          onClick={handleSave}
          className={`${
            !timeDanger ? "" : "disabled opacity-50"
          } px-5 text-[20px] py-[10px] text-white   rounded-md `}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
