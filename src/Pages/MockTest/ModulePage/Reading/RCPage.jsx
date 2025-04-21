import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import { Button, Statistic } from "antd";
import RCQuestionPage from "../../../../Components/MockTest/Reading/ReadingQuestionPage/RCQuestionPage";
import { ClearUserInputs } from "../../../../redux/slices/fillgap";
const { Countdown } = Statistic;

export default function RCPage({ data, handleNextQuestion }) {
  const { userInput } = useSelector((state) => state.fillgap);
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [xmFinish, setXFinish] = useState(false);
  const [evBtn, setEvBtn] = useState(true);
  const [loadings, setLoadings] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setDeadline(Date.now() + data.time * 60000);
    setXFinish(false);
    setEvBtn(true);
  }, [data]);

  useEffect(() => {
    if (xmFinish) {
      handleEvaluate();
    }
  }, [xmFinish]);

  const handleEvaluate = () => {
    setEvBtn(false);
    setDeadline(0);
    let correct = 0;
    data.qa.a.map((val, i) => (userInput[i] === val.trim() ? ++correct : ""));
    const ansLength = data.qa.a.length;

    const mockData = {
      q: data.qa.q,
      a: data.qa.a,
      userAns: userInput,
      time: data.time,
      type: data.type,
      inner_type: data.inner_type,
      result: ((correct / ansLength) * 100).toFixed(2),
    };

    dispatch(saveMockTestUserAns(mockData));
    dispatch(ClearUserInputs());

    setLoadings(false);
    handleNextQuestion();
  };

  const handleSave = () => {
    setLoadings(true);
    setEvBtn(false);
    setXFinish(true);
  };

  return (
    <div>
      <div className="w-full mt-3">
        <div className="w-full flex justify-end px-2 py-[1rem]">
          <div
            className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0  md:mt-0"
          >
            <Countdown
              onChange={(e) => (e <= 60000 ? setTimeDanger(true) : "")}
              valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
              value={deadline}
              onFinish={handleSave}
              format="mm:ss"
            />
          </div>
        </div>
        <div className="flex-col w-full justify-center m-auto">
          <h1 className="font-poppins text-[20px] font-[700] text-center">
            Type the missing letters to complete the text below
          </h1>

          <div className="md:w-[95%] sm:w-full m-auto md:border-[1px] rounded-md md:mt-[1rem] sm:mt-[2rem]">
            {data ? (
              <RCQuestionPage
                questionAns={data?.qa}
                title={data?.title}
              ></RCQuestionPage>
            ) : (
              ""
            )}
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
          disabled={evBtn ? false : true}
          onClick={handleSave}
          className={`${
            evBtn ? "" : "disabled opacity-50"
          } px-5 text-[20px] py-[10px] text-white rounded-md `}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
