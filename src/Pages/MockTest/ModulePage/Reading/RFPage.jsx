import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearUserInputs } from "../../../../redux/slices/fillgap";
import { Button,Statistic } from "antd";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import RCQuestionPage from "../../../../Components/MockTest/Reading/ReadingQuestionPage/RCQuestionPage";
const { Countdown } = Statistic;
export default function RFPage({ data, handleNextQuestion }) {
  const dispatch = useDispatch();
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [xmFinish, setXFinish] = useState(false);
  const [evBtn, setEvBtn] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const { userInput } = useSelector((state) => state.fillgap);

  
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
      <div className="h-auto sm:w-full md:w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5 ">
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
        <div className="flex flex-col md:gap-5 sm:gap-2">
          {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Read and Complete
            </h1> */}

          <h1
            className="sm:text-[17px] md:text-[25px] md:mt-[1.5rem]  self-center 
            font-poppins sm:text-center md:text-start font-[600] md:block sm:hidden"
          >
            Complete the Sentence with Correct Word
          </h1>

          <div className="md:w-[95%] sm:w-full m-auto md:border-[1px] rounded-md md:mt-[1.5rem] sm:mt-[2rem]">
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
          //   onClick={handleSave}
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
