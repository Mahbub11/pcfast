import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { saveUserchoice } from "../../../redux/slices/wordSelect";
import WordTextShow from "../../Vocabulary/WordTextShow";


export default function WordChoiceSelectMock({
  words,
  setDeadline,
  pushNext,
  setShowEvResult,
  showEv,
}) {
  const dispatch = useDispatch();
  const [i, incrementIndex] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [headingText, setHeadingText] = useState(`${words[i]}`);
  const [choice, setChoice] = useState([]);
  const { userChoice } = useSelector((state) => state.wordSelect);
  const [busy, isBusy] = useState(true);

  useEffect(() => {
    setDeadline(0.1);
    setHeadingText(`${words[i]}`);
    incrementIndex(0);
    isBusy(false);
  }, [words, busy]);

  useEffect(() => {
    if (userChoice?.length === 0) {
      incrementIndex(0);
      // isBusy(true)
    }
  }, [userChoice]);
  useEffect(() => {
    dispatch(saveUserchoice(choice));
  }, [choice]);

  useEffect(() => {
    if (pushNext) {
      handleClick(false);
    }
  }, [pushNext]);

  //   useEffect(() => {
  //     setChoice([]);
  //   }, [checkbox]);

  const handleInputVal = (val) => {
    console.log(val);
    return setChoice((prev) => [...prev, val]);
  };
  console.log(words);
  function handleClick(type) {
    const k = words.length;
    if (i < k - 1) {
      console.log(i, words[i]);

      // show evaluation
      setDeadline(0.1);

      if (type) {
        handleInputVal(words[i]);
      }

      setHeadingText(`${words[i + 1]}`);
      incrementIndex(i + 1);
    } else {
      setShowEvResult();
    }
  }

  return (
    <div>
      <div className="w-full flex justify-center py-5">
        <div className="m-auto ">
          <WordTextShow word={headingText}></WordTextShow>

          <div className="flex gap-5 mt-10 ">
            <button
              className="hover:text-white font-[700] border-2 rounded-md px-10 py-1 flex gap-2 hover:bg-green-300 shadow-sm"
              onClick={() => handleClick(true)}
            >
              <span>
                <CheckOutlined></CheckOutlined>
              </span>
              Yes
            </button>
            <button
              onClick={() => handleClick(false)}
              className="hover:text-white font-[700] border-2 rounded-md px-10 py-1 flex gap-2  hover:bg-red-400"
            >
              <span>
                <CloseOutlined></CloseOutlined>
              </span>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
