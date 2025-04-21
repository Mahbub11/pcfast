import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import TextArea from "antd/es/input/TextArea";
import IconMikeOn from "../../../../Assets/SVG/IconMikeOn";
import IconMikeOff from "../../../../Assets/SVG/IconMikeOff";
import { Button, Statistic } from "antd";
const { fuzzy } = require("fast-fuzzy");
const { Countdown } = Statistic;

export default function LLTPage({ data, handleNextQuestion }) {
  const dispatch = useDispatch();
  let [playLeft, setPlayLeft] = useState(3);
  const [voiceActive, setvoiceActive] = useState(false);
  const [userAns, setUserAns] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(Date.now() + 0.2 * 60000);
  const synth = window.speechSynthesis;
  const [xmFinish,setXFinish] = useState(false)
  const [evBtn,setEvBtn] = useState(true)
  const [loadings, setLoadings] = useState(false);

  useEffect(() => {
    setDeadline(Date.now() + data.time * 60000);
    setXFinish(false)
    setEvBtn(true)
  }, [data]);

  useEffect(()=>{
    if(xmFinish){
      handleEvaluate()
    }
  },[xmFinish])


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
  }, [data.qa.q]);

  const handleEvaluate = (next) => {
    setEvBtn(false)
    const mockData = {
      q: data.qa.q,
      a: data.qa.a,
      userAns: userAns,
      time: data.time,
      type: data.type,
      inner_type: data.inner_type,
      result: Math.floor(
        fuzzy(data.qa.a.toString(), userAns ? userAns : "") * 100
      ),
    };
    dispatch(saveMockTestUserAns(mockData));
    setPlayLeft(3);
    setUserAns(null);

    setLoadings(false)
    handleNextQuestion();
  };
  const handlePlay = () => {
    if (isPaused) {
      synth.resume();
    } else {
      setvoiceActive(true);
      utterance.voice = voice;
      utterance.pitch = 1;
      utterance.rate = 0.9;
      utterance.volume = 1;
      synth.speak(utterance);
      utterance.onend = (event) => {
        setPlayLeft(--playLeft);
        setvoiceActive(false);
      };
    }

    setIsPaused(false);
  };
  const handleUserAns = (val) => {
    setUserAns(val);
  };
  const handleSave=()=>{
    setLoadings(true)
    setEvBtn(false)
    if(!xmFinish){
      setXFinish(true)
     }
  }

  return (
    <div>
      <div className="w-full m-auto mt-10">
        <div className="w-full flex justify-end px-2 py-[1rem]">
          <div
            className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0  md:mt-0"
          >
            <Countdown
              onChange={(e) => (e <= 3000 ? setTimeDanger(true) : "")}
              valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
              value={deadline}
              onFinish={handleSave}
              format="mm:ss"
            />
          </div>
        </div>
        <h1 className="font-poppins text-[20px] font-[700] text-center">
          Type the statement that you hear.
        </h1>

        <div
          className="w-[90%] sm:flex sm:justify-center m-auto
             rounded-md md:flex md:justify-end md:mt-5 "
        >
          <div
            className="sm:flex-col md:flex md:flex-row justify-end 
              md:w-[90%] sm:w-full items-end md:gap-5 sm:gap-2 h-auto"
          >
            <div className="w-[30%] md:h-full sm:h-auto sm:m-auto ">
              <div className="px-2 py-2 flex justify-center m-auto h-full ">
                <div className="px-2 py-2 flex flex-col justify-center m-auto">
                  <button
                    disabled={playLeft > 0 ? false : true}
                    onClick={handlePlay}
                    className="m-auto bg-[#C0DBFC] rounded-full px-5 py-5 cursor-pointer w-[7.5rem] h-[7.5rem]"
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
                  <p className="text-[17px] font-thin text-center mt-4">
                    Number of replays left: {playLeft}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-[70%] md:h-auto sm:h-auto flex justify-center sm:w-full sm:m-auto sm:flex">
              <div className="px-2 py-2 flex flex-col justify-center m-auto w-full">
                <TextArea
                  placeholder="Start typing"
                  spellCheck={false}
                  onChange={(e) => handleUserAns(e.target.value)}
                  value={userAns}
                  className="font-poppins text-[20px]"
                  rows={7}
                ></TextArea>
                <div className="self-end flex justify-end px-1 py-2 font-[600]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-end flex mt-3 px-3 py-3">
      <Button
       style={{ color: "white", border: "none", backgroundColor: "#3AB7BF",height:'3rem' }}
       loading={loadings} 
          disabled={evBtn ? false : true}
          onClick={handleSave}
          className={`${
            evBtn ? "" : "disabled opacity-50"
          } px-5 text-[20px] py-[10px] text-white rounded-md`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
