import React, { useEffect, useState } from "react";
import IconSpeakingAvatar from "../../../../Assets/SVG/IconSpeakingAvatar";

import { ReactMic } from "react-mic";
import { Statistic, Skeleton, Button } from "antd";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useDispatch } from "react-redux";
import { clearAssesmentResult } from "../../../../redux/slices/assesmentResult";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import {
  analyzeSentence,
  getOverallResult,
} from "../../../../utils/HelperFunction";
const { Countdown } = Statistic;

export default function SRSPage({
  data,
  handleNextQuestion,

}) {

  const dispatch = useDispatch();
  const [isWorking, setIsWorking] = useState(false);
  const [startExam, setStartExam] = useState(false);
  const [showThinkTime, setShowThinkTime] = useState(true);
  const [thinkTime, setThinkTime] = useState(Date.now() + 30000);
  const [audioData, setAudioData] = useState("");
  const [messages, setMessages] = useState([]);
  const [record, setRecord] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [timeOut, setTimeOut] = useState(100);
  const [active, setActive] = useState(false);
  const [xmFinish, setXmfinish] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [timeDanger, setTimeDanger] = useState(false);
  const [thinkTimeClick,setThinkTimeClick] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const { finalTranscript, resetTranscript, browserSupportsSpeechRecognition,transcript } =
    useSpeechRecognition();


    useEffect(() => {
      if (xmFinish) {
        setTimeout(() => {
          handleEvaluate(true);
        }, 2000);
      }
    }, [xmFinish]);

    useEffect(()=>{
      if(thinkTimeClick){
        handleSpeech()
      }
    },[thinkTimeClick])
  

  useEffect(() => {
    setMessages([...messages, finalTranscript]);
  }, [finalTranscript]);

  const myTimeout = setTimeout(() => {
    if (isWorking) {
      console.log("is working true");
      SpeechRecognition.startListening();
    } else {
      console.log("is working false");
      SpeechRecognition.stopListening();
      clearTimeout(myTimeout);
    }
  }, timeOut);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStop = (recordedBlob) => {
    setAudioData(recordedBlob.blobURL);
    // setXmfinish(true);
  };

  const handleSave = () => {
    setLoadings(true)
    setTimeDanger(false)
    setDeadline(0)
    setIsWorking(false);
    setActive(false);
    stopRecording();
    setIsStopped(true);
    SpeechRecognition.stopListening()

    setTimeout(()=>{
      setXmfinish(true)

    },3000)
  };

  const handleEvaluate = () => {
    setIsWorking(false);
    setActive(false);
    stopRecording();
    setIsStopped(true);
    setDeadline(0)
    SpeechRecognition.stopListening()
    if (messages.join().replace(/,/g, " ").length > 10) {
      dispatch(clearAssesmentResult());
      analyzeSentence(transcript)
        .then((response) => {
          const mockData = {
            sampleAns: data.qa.a,
            qData: data,
            image: data.image,
            userAns:messages.join().replace(/,/g, " "),
            time: data.time,
            type: data.type,
            inner_type: data.inner_type,
            audioData: audioData,
            sentenceError: response.data.response.grammar.errors,
            sentenceStatus: response.data.response.stats,
            overAllResult: getOverallResult({
              fluency:true,
              sampleAns: data.qa.a,
              userAns: messages.join().replace(/,/g, " "),
              sentenceError: response.data.response.grammar.errors,
              sentenceStatus: response.data.response.stats,
            }),
          };

          resetTranscript();

          setAudioData(null);
          setMessages([]);
          dispatch(saveMockTestUserAns(mockData));
        })
        .catch((error) => {
          const mockData = {
            sampleAns: data.qa.a,
            qData: data,
            image: data.image,
            userAns: messages.join().replace(/,/g, " "),
            time: data.time,
            type: data.type,
            inner_type: data.inner_type,
            sentenceError: [],
            sentenceStatus: null,
            audioData: audioData,
            overAllResult: 0,
          };

          resetTranscript();

          setAudioData(null);
          setMessages([]);
          dispatch(saveMockTestUserAns(mockData));
        });
    } else {
      const mockData = {
        sampleAns: data.qa.a,
        qData: data,
        image: data.image,
        userAns:messages.join().replace(/,/g, " "),
        time: data.time,
        type: data.type,
        inner_type: data.inner_type,
        sentenceError: [],
        sentenceStatus: null,
        audioData: audioData,
        overAllResult: 0,
      };

      resetTranscript();

      setAudioData(null);
      setMessages([]);
      dispatch(saveMockTestUserAns(mockData));
    }

    setLoadings(false)
    handleNextQuestion();
  };

  const handleSpeech = () => {
    setThinkTime(0)
    setDeadline(Date.now() + data.time* 60000);
    setShowThinkTime(false);
    setActive(true);
    startRecording();
    setIsWorking(true);
  };

  const handleTimeFinish = () => {
    setTimeDanger(false)
    if (!xmFinish) {
      handleSave();
    }
  };

  const handleCountdown = (e) => {
    if (e <= 90000) {
      setTimeDanger(true);
    }
    if (e <= 90000) {
      startRecording();
      SpeechRecognition.startListening();
    }
  };

  const handleThinkTime=()=>{
    if(!thinkTimeClick){
      setThinkTimeClick(true)
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
              onChange={handleCountdown}
              valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
              value={deadline}
              onFinish={handleTimeFinish}
              format="mm:ss"
            />
          </div>
        </div>

        <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[1.5rem] font-[600] text-center">
          Speak about the topic below for 90 seconds.
        </h1>

        <div className="md:w-[70%] sm:w-full m-auto mt-4">
          <div className=" border-[2px] rounded-md border-[#3ab6bf5f]">
            <div className="md:w-[90%] sm:full m-auto md:flex md:flex-row sm:flex-col justify-between px-2 py-2 gap-3">
              <div className="h-auto w-full px-2 py-1 ">
                <div>
                  <div
                    className="flex flex-col justify-center sm:w-full  m-auto mt-5
                             "
                   >
                    <h1 className="font-poppins  text-start  md:text-[20px] md:mt-0 sm:mt-10 font-[600]">
                      {data?.qa?.q.split(" ").map((val) => {
                        return (
                          <span
                            className="cursor-pointer md:hover:text-blue-500"
                            // onClick={handleMeaning}
                          >
                            {val + " "}
                          </span>
                        );
                      })}
                    </h1>
                    <div className="  text-gray-700">
                      <ul
                        className="flex flex-col  justify-center mt-5 list-disc ml-5
                                 md:text-[18px] sm:text-[15px] font-montserrat font-[400] "
                      >
                        {data?.qa?.qb.map((val, index) => {
                          return <li>{val}</li>;
                        })}
                      </ul>
                    </div>
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

                  <div className="flex justify-end w-full mt-5 ml-[-10px] ">
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
                        className={`${showThinkTime ? "relative" : "hidden"}`}
                      >
                        <Countdown
                          onFinish={handleThinkTime}
                          onChange={(e) =>
                            e <= 10000 ? setStartExam(true) : ""
                          }
                          valueStyle={{ color: "blue" }}
                          value={thinkTime}
                          format="mm:ss"
                        />
                      </div>
                      <button
                        disabled={!startExam ? true : false}
                        onClick={handleThinkTime}
                        className={`${
                          startExam ? "opacity-100" : "opacity-50"
                        } bg-[#3AB7BF] px-2 w-full py-2 self-end rounded-md text-white font-[500]`}
                      >
                        <p>{isWorking ? "Recording..." : "Record Now"}</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3"></div>
          </div>
        </div>
      </div>
      <div className="w-full justify-end flex mt-3 px-3 py-3">
      <Button
       style={{ color: "white", border: "none", backgroundColor: "#3AB7BF",height:'3rem' }}
       loading={loadings} 
          disabled={timeDanger ? false : true}
          onClick={handleSave}
          className={`${
            timeDanger ? "" : "disabled opacity-50"
          } px-5 text-[20px] py-[10px] text-white rounded-md`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
