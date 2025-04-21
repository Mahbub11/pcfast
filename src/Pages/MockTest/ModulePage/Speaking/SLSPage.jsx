import React, { useEffect, useState } from "react";
import IconMikeOn from "../../../../Assets/SVG/IconMikeOn";
import IconMikeOff from "../../../../Assets/SVG/IconMikeOff";
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

export default function SLSPage({ data, handleNextQuestion, timesup }) {
  const dispatch = useDispatch();
  let [playLeft, setPlayLeft] = useState(3);
  const [isWorking, setIsWorking] = useState(false);
  const [voiceActive, setvoiceActive] = useState(false);
  const [startExam, setStartExam] = useState(false);
  const [showThinkTime, setShowThinkTime] = useState(true);
  const [thinkTime, setThinkTime] = useState(Date.now()+20000);
  const [timeDanger, setTimeDanger] = useState(false);
  const [audioData, setAudioData] = useState("");
  const [messages, setMessages] = useState("");

  const [record, setRecord] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const [timeOut, setTimeOut] = useState(100);
  const [active, setActive] = useState(false);
  const synth = window.speechSynthesis;
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [xmFinish, setXmfinish] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [thinkTimeClick,setThinkTimeClick] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const { finalTranscript, resetTranscript, browserSupportsSpeechRecognition,transcript } =
    useSpeechRecognition();

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(data.qa.q);
    const voices = synth.getVoices();

    let data1 = [];
    voices
      .filter((voice) => voice.lang.includes("en")) // showing only english voices
      .map((voice) => data1.push(voice)); //all of the voices
    var totalResponses = data1.length;
    var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponses;

    setUtterance(u);
    setVoice(data1[responseIndex]);

    return () => {
      synth.cancel();
    };
  }, [data]);

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
    setXmfinish(true);
  };

  const handlePlay = () => {
    if (isPaused) {
      synth.resume();
    } else {
      setvoiceActive(true);
      utterance.voice = voice;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      synth.speak(utterance);
      utterance.onend = (event) => {
        setPlayLeft(--playLeft);
        setvoiceActive(false);
      };
    }

    setIsPaused(false);
  };

  const handleSpeech = () => {
    setPlayLeft(0);
    setDeadline(Date.now() + data.time* 60000);
    setShowThinkTime(false);
    setActive(!active);
    startRecording();
    setIsWorking(true);
  };
  const handleSave = () => {
    setLoadings(true)
    setTimeDanger(false)
    setDeadline(0);
    setIsWorking(false);
    setActive(false);
    stopRecording();
  };

  const handleEvaluate = () => {
    if (messages.join().replace(/,/g, " ").length > 10) {
      dispatch(clearAssesmentResult());
      analyzeSentence(messages.join().replace(/,/g, "."))
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
              userAns:messages.join().replace(/,/g, " "),
              sentenceError: response.data.response.grammar.errors,
              sentenceStatus: response.data.response.stats,
              fluency: true,
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

  const handleTimeFinish = () => {
    setTimeDanger(false)
    if (!xmFinish) {
      handleSave();
    }
  };

  const handleThinkTime=()=>{
    if(!thinkTimeClick){
      setThinkTimeClick(true)
    }

  }

  const handleCountdown = (e) => {
    if (e <= 50000) {
      setTimeDanger(true);
    }
    if (e <= 50000) {
      startRecording();
      SpeechRecognition.startListening();
    }
  };

  console.log(messages)

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

        <div className="md:w-[60%] sm:w-full m-auto border-[1px] border-[#3ab6bf5f] rounded-md mt-5">
          <div className="md:w-[90%] sm:w-[90%] m-auto h-auto">
            <div className="flex flex-col gap-4 justify-center mt-7">
              <button
                disabled={playLeft > 0 ? false : true}
                onClick={!isWorking ? handlePlay : null}
                className="m-auto bg-[#C0DBFC] rounded-full px-6 py-6 cursor-pointer"
              >
                {voiceActive ? (
                  <div>
                    <IconMikeOn height="5rem" width="5rem"></IconMikeOn>
                  </div>
                ) : (
                  <div className="mr-1">
                    <IconMikeOff height="5rem" width="5rem"></IconMikeOff>
                  </div>
                )}
              </button>
              <p className="text-[17px] font-thin text-center">
                Number of replays left: {playLeft}
              </p>

              <div className="flex justify-end  mt-5 ml-[-10px]">
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
                    disabled={!startExam ? true : false}
                    onClick={handleThinkTime}
                    className={`${
                      startExam ? "opacity-100" : "opacity-50"
                    } bg-[#3AB7BF] px-3 py-2 self-end rounded-md text-white font-[500]`}
                  >
                    <p>{isWorking ? "Recording..." : "Record Now"}</p>
                  </button>
                </div>
              </div>

              {/* <p>Your Speech: {messages}</p> */}
            </div>
          </div>
          <div className="h-5"></div>
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
