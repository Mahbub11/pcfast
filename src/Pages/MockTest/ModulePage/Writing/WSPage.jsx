import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Button, Statistic } from "antd";
import {
  analyzeSentence,
  getOverallResult,
} from "../../../../utils/HelperFunction";
import { useDispatch } from "react-redux";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
const { Countdown } = Statistic;

export default function WSPage({ data, handleNextQuestion }) {
  const dispatch = useDispatch();
  const [thinkTimeholders, setthinkTimeholders] = useState(true);
  const [showThinkTime, setShowThinkTime] = useState(true);
  const [isStartExam, setIsStartExam] = useState(false);
  const [startExam, setStartExam] = useState(false);
  const [thinkTime, setThinkTime] = useState(Date.now() + 30000 );
  const [timeDanger, setTimeDanger] = useState(false);
  const [inputAvailable, setInputAvailable] = useState(true);
  const [userAns, setUserAns] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [deadline, setDeadline] = useState();
  const [showEvaluationBtn, setShowEvaluationBtn] = useState(false);
  const [xmFinish, setXmFinish] = useState(false);
  const [loadings, setLoadings] = useState(false);

  useEffect(() => {
    setXmFinish(false);
  }, [data]);

  useEffect(() => {
    if (xmFinish) {
      handleEvaluate();
    }
  }, [xmFinish]);

  const startWriting = () => {
    setDeadline(Date.now() + data.time * 60000);
    setIsStartExam(true);
    setStartExam(false);
    setthinkTimeholders(false);
    setInputAvailable(false);
  };
  const handleUserAns = (val) => {
    setUserAns(val);
    setWordLength(val.split(" ").length);
  };

  const handleEvaluate = async () => {
    if (userAns.length > 5) {
      analyzeSentence(userAns)
        .then((response) => {
          const mockData = {
            sampleAns: data.qa.a,
            qData: data,
            image: data.image,
            userAns: userAns,
            time: data.time,
            type: data.type,
            inner_type: data.inner_type,
            sentenceError: response.data.response.grammar.errors,
            sentenceStatus: response.data.response.stats,
            overAllResult: getOverallResult({
              sampleAns: data.qa.a,
              userAns,
              sentenceError: response.data.response.grammar.errors,
              sentenceStatus: response.data.response.stats,
            }),
          };

          dispatch(saveMockTestUserAns(mockData));
          setUserAns(null);
        })
        .catch((error) => {
          const mockData = {
            sampleAns: data.qa.a,
            qData: data,
            image: data.image,
            userAns: userAns,
            time: data.time,
            type: data.type,
            inner_type: data.inner_type,
            sentenceError: [],
            sentenceStatus: null,
            overAllResult: 0,
          };

          dispatch(saveMockTestUserAns(mockData));
          setUserAns(null);
        });
    } else {
      const mockData = {
        sampleAns: data.qa.a,
        qData: data,
        image: data.image,
        userAns: userAns,
        time: data.time,
        type: data.type,
        inner_type: data.inner_type,
        sentenceError: [],
        sentenceStatus: null,
        overAllResult: 0,
      };

      dispatch(saveMockTestUserAns(mockData));
      setUserAns(null);
    }

    setLoadings(false)
    handleNextQuestion();
  };

  const handleCountdown = (e) => {
    if (e <= 60000) {
      setTimeDanger(true);
    }
    if (e <= 120000) {
      setShowEvaluationBtn(true);
    }
  };

  const handleSave = () => {
    setLoadings(true)
    setShowEvaluationBtn(false);
    if (!xmFinish) {
      setXmFinish(true);
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
              onChange={handleCountdown}
              valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
              value={deadline}
              onFinish={handleSave}
              format="mm:ss"
            />
          </div>
        </div>
        <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[1.5rem] font-[600] text-center">
          Respond to the question in at least 50 words
        </h1>

        <div className="w-[90%] m-auto sm:mt-5 ">
          <div className="flex md:flex-row sm:flex-col justify-between h-full md:gap-10 sm:gap-4">
            <div className=" md:w-[50%] sm:w-[95%] sm:m-auto h-full flex flex-col justify-between">
              <h1
                className=" md:text-[18px] sm:text-[15px]
                  font-poppins font-[500] "
              >
                {data.qa.q}
              </h1>
              <div className={`${thinkTimeholders ? "flex" : "hidden"}  gap-2`}>
                <div className={`${showThinkTime ? "block" : "hidden"} mt-5`}>
                  <Countdown
                    onFinish={!isStartExam ? startWriting : null}
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
                  onClick={startWriting}
                  className={`${
                    startExam ? "opacity-100" : "opacity-50"
                  } bg-[#3AB7BF] px-2 py-2 self-end rounded-md text-white font-[500]`}
                >
                  Start Writing
                </button>
              </div>
            </div>
            <div className="md:w-[50%] sm:w-full sm:m-auto sm:mt-5">
              <TextArea
                spellCheck={false}
                disabled={inputAvailable ? true : false}
                className="w-full disabled bg-transparent text-[18px] font-montserrat"
                rows={8}
                value={userAns}
                onChange={(e) => handleUserAns(e.target.value)}
                placeholder="Start Your Typing...."
                maxLength={2000}
              />
              <div className="self-end flex justify-end px-1 py-2 font-[600]">
                <h1>Word Count: {wordLength}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-end flex mt-3 px-3 py-3">
        <Button
          style={{
            color: "white",
            border: "none",
            backgroundColor: "#3AB7BF",
            height: "3rem",
          }}
          loading={loadings}
          disabled={showEvaluationBtn ? false : true}
          onClick={handleSave}
          className={`${
            showEvaluationBtn ? "" : "disabled opacity-50"
          } px-5 text-[20px] py-[10px] text-white rounded-md`}
        >
          {!showEvaluationBtn ? "Next" : "Next"}
        </Button>
      </div>
    </div>
  );
}
