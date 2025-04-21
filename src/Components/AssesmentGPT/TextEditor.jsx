import React, { useEffect, useState } from "react";
import { CheckOutlined } from '@ant-design/icons';

const TextEditor = ({ text, grammarMistakes }) => {
  const [explanation, setExplanation] = useState("");
  const [correctText, setCorrectText] = useState("");
  const [mistake, setMistake] = useState('');

  grammarMistakes
  ?.forEach((correction) => {
    const mistake = correction.mistake;
    const regex = new RegExp(mistake, "g");
    text = text?.replace(
      regex,
      `<span style='background-color: #FF8080;border-radius: 2px;padding-left:3px;padding-right:3px;font-weight:bold;cursor: pointer;' class='correction'>${mistake}</span>`
    );
  });

  function handleOnClick(e) {
    if (e.target.className === "correction") {
      const mistake = e.target.innerText;
      const foundCorrection = grammarMistakes.find(
        (correction) => correction.mistake === mistake
      );
      setCorrectText(foundCorrection.correctText);
      setExplanation(foundCorrection.explanation);
      setMistake(foundCorrection.mistake);
    }
  }

  return (
    <>
      <p
        className="font-poppins text-[15px]"
        onClick={handleOnClick}
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>

      <div className="mt-10 px-2 py-1 font-poppins text-[17px]
       felx-col gap-5">
        {/* {
          mistake.length <1 ? <div>
            <h2 className="font-poppins font-[700]"> <CheckOutlined style={{color:"green"}}></CheckOutlined> Great! No Error Found</h2>
          </div>:''
        } */}
        {mistake && (
          <div className="font-[700] bg-[#ff80807b] px-2 py-2 rounded-sm">
            Mistake: <span className="font-[500] ">{mistake}</span>
          </div>
        )}
        {explanation && (
          <div className="font-[700] mt-2 bg-blue-200 px-2 py-2 rounded-sm">
            Explanation: <span className="font-[500]">{explanation}</span>
          </div>
        )}
        {correctText && (
          <div className="font-[700] bg-green-200 px-2 py-2 mt-2 rounded-sm">
            Correct Answer:{" "}
            <span className="font-[500] ">{correctText}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default TextEditor;
