import React, { useEffect, useState } from "react";
import { ReactMic } from "react-mic";
import { Statistic, Skeleton, message, Button } from "antd";
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

export default function SAPPage({ handleNextQuestion, data, timesup }) {
  const [loadingImage, setLoadingImg] = useState(true);
  const dispatch = useDispatch();
  let [playLeft, setPlayLeft] = useState(3);
  const [isWorking, setIsWorking] = useState(false);
  const [startExam, setStartExam] = useState(false);
  const [showThinkTime, setShowThinkTime] = useState(true);
  const [thinkTime, setThinkTime] = useState(0);
  const [timeDanger, setTimeDanger] = useState(false);
  const [audioData, setAudioData] = useState("");
  const [messages, setMessages] = useState([]);
  const [record, setRecord] = useState(false);
  const [timeOut, setTimeOut] = useState(100);
  const [xmFinish, setXmfinish] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [thinkTimeClick,setThinkTimeClick] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const { finalTranscript, resetTranscript, browserSupportsSpeechRecognition,transcript } =
    useSpeechRecognition();

  useEffect(() => {
    setMessages([...messages, finalTranscript]);
  }, [finalTranscript]);

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


  const myTimeout = setTimeout(() => {
    if (isWorking) {
      SpeechRecognition.startListening();
    } else {
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
    setXmfinish(true);
  };

  const handleSave = () => {
    setLoadings(true)
    setDeadline(0)
    setIsWorking(false);
    stopRecording();
    SpeechRecognition.stopListening();
  };

  const handleEvaluate = () => {
    setIsWorking(false);
    stopRecording();
    setDeadline(0);
    SpeechRecognition.stopListening();
    if (messages.join().replace(/,/g, " ").length > 10) {
      dispatch(clearAssesmentResult());
      analyzeSentence(messages.join().replace(/,/g, " "))
        .then((response) => {
          const mockData = {
            sampleAns: data.qa.a,
            qData: data,
            image: data.image,
            // userAns: messages.join().replace(/,/g, "."),
            userAns: messages.join().replace(/,/g, " "),
            time: data.time,
            type: data.type,
            inner_type: data.inner_type,
            audioData: audioData,
            sentenceError: response.data.response.grammar.errors,
            sentenceStatus: response.data.response.stats,
            overAllResult: getOverallResult({
              fluency:true,
              sampleAns: data.qa.a,
              userAns: transcript,
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
    }

    setLoadings(false)
    handleNextQuestion();
  };

  const handleSpeech = () => {
    setDeadline(Date.now() + data.time* 60000);
    setShowThinkTime(false);
    startRecording();
    setIsWorking(true);
    SpeechRecognition.startListening({continuous:true})
  };

  const hanldeOnLoad = () => {
    setLoadingImg(false);
    setThinkTime(Date.now() + 20000)
  };

  const handleTimeFinish = () => {
    if (!xmFinish) {
      handleSave();
    }
  };

  const handleCountdown = (e) => {
    if (e <= 50000) {
      setTimeDanger(true);
    }
    if (e <= 50000) {
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
        <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[2rem] font-[600] text-center">
          Speak about the image below for 90 seconds.
        </h1>

        <div className="w-[70%] m-auto">
          <div className=" border-[1px] border-[#3ab6bf5f] rounded-md mt-5">
            <div className="h-auto w-full m-auto">
              <div className="flex-col justify-center mt-5 items-end h-full w-full">
                <div
                  className={`${
                    loadingImage ? "hidden" : "block"
                  } md:h-[16rem] md:w-[22rem] sm:h-[15rem] sm:w-[95%] m-auto`}
                >
                  <img
                    onLoad={hanldeOnLoad}
                    className="h-full w-full rounded-md object-fill"
                    src={`https://practicemania.s3.ap-south-1.amazonaws.com/duolingo/${data.image}`}
                    alt="icondummy1"
                  ></img>
                </div>

                <div className="flex justify-end w-full mt-5 ml-[-10px]">
                  <div className="flex gap-2">
                    <div className="mt-2">
                      <ReactMic
                        className="rounded-md h-[1.5rem]"
                        record={record}
                        visualSetting="frequencyBars"
                        onStop={onStop}
                        // onStop={(e)=> setAudioData(e)}
                        strokeColor="#53b0e5"
                        backgroundColor="#FFFF"
                      />
                    </div>
                    <div className={`${showThinkTime ? "relative" : "hidden"}`}>
                      <Countdown
                        onFinish={handleThinkTime}
                        onChange={(e) => (e <= 10000 ? setStartExam(true) : "")}
                        valueStyle={
                          timeDanger ? { color: "red" } : { color: "blue" }
                        }
                        value={thinkTime}
                        format="mm:ss"
                      />
                    </div>
                    <button
                      disabled={isWorking ? true : false}
                      onClick={handleThinkTime}
                      className={`${
                        startExam ? "opacity-100" : "opacity-50"
                      } bg-[#3AB7BF] px-3 py-2 self-end rounded-md text-white font-[500]`}
                    >
                      <p>{isWorking ? "Recording..." : "Record Now"}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-5"></div>
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
          } px-5 text-[20px] py-[10px] text-white rounded-md `}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
