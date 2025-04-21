import React, { useEffect, useState } from "react";
import IconMikeOn from "../../../Assets/SVG/IconMikeOn";
import { Progress, Collapse } from "antd";

export default function SALContainer({ audio, result, userAns, q }) {

    console.log(audio)
  const [utterance, setUtterance] = useState(null);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const u = new SpeechSynthesisUtterance(q);
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
  }, [userAns]);

  const handleAIsampleVoice = () => {
    utterance.voice = voice;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    synth.speak(utterance);
  };
  return (
    <div>
      <div className="mt-5  flex justify-center">
        <div className={`"h-auto w-[95%] m-auto"`}>
          <div>
            <h2 className="px-2 py-2 text-center text-[20px]">
              <span className="font-[600]">Question:</span> {q}
            </h2>
            <h2 className="px-2  text-center text-[20px]">
              <span className="font-[600]">Your Ans:</span> {userAns}
            </h2>
          </div>
          <div className="md:w-[50%] sm:w-full m-auto md:flex md:flex-row sm:flex-col justify-center gap-5 mt-5">
            <div className=" m-auto flex flex-col ">
              <div className="sm:m-auto">
                <Progress
                  style={{ fontSize: "10px" }}
                  type="circle"
                  percent={result}
                  size={70}
                />
              </div>
              <p className="text-[20px] font-[500 text-center">Accuracy</p>
            </div>
            <div className="sm:ml-[-12px] ">
              <div
                className="ml-3 mt-2 flex gap-2 border-[1px]  rounded-md 
                                justify-center m-auto"
              >
                <h1 className="mt-[2px] text-[17px] font-poppins font-[500]">
                  AI
                </h1>
                <span
                  onClick={handleAIsampleVoice}
                  className="cursor-pointer"
                >
                  <IconMikeOn height="2rem" width="2rem"></IconMikeOn>
                </span>
              </div>
              <div className="m-auto text-center">
                <p>Your Answer</p>
                <audio controls src={audio}></audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
