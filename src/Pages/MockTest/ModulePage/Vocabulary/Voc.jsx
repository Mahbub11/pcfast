import React, { useEffect, useState } from "react";
import { Button, Statistic } from "antd";
import SingleWordChoice from "../../../../Components/Vocabulary/SingleWordChoice";
import { useDispatch, useSelector } from "react-redux";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import { removeChecked } from "../../../../redux/slices/wordSelect";
import WordChoiceSelect from "../../../../Components/Vocabulary/WordChoiceSelect";
import WordChoiceSelectMock from "../../../../Components/MockTest/Voc/WordChoiceSelectMock";
const { Countdown } = Statistic;

export default function Voc({ data, handleNextQuestion }) {
  const dispatch = useDispatch();

  const { userChoice } = useSelector((state) => state.wordSelect);

  console.log(userChoice)
  const ansLength = data.qa.a.length;
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [xmFinish, setXmFinish] = useState(false);
  const [evBtn, setEvBtn] = useState(true);
  const [pushNext, setpushNxt] = useState(false);
  const [loadings, setLoadings] = useState(false);

  

  useEffect(() => {
    setDeadline(Date.now() + data.time * 60000);
    setXmFinish(false);
    setEvBtn(true);
  }, [data]);

  useEffect(() => {
    if (xmFinish) {
      handleEvaluate();
    }
  }, [xmFinish]);

  const handleEvaluate = () => {
    setEvBtn(false);
    const correctResult = data.qa.a.filter((element) =>
    userChoice?.includes(element)
  );

    const resultdata = {
      q: data.qa.q,
      a: data.qa.a,
      userAns: userChoice,
      time: data.time,
      type: data.type,
      inner_type: data.inner_type,
      result: ((correctResult.length / ansLength) * 100).toFixed(2),
    };
    dispatch(removeChecked());
    dispatch(saveMockTestUserAns(resultdata));

    setLoadings(false);
    handleNextQuestion();
  };

  const handleSave = () => {
    setLoadings(true)
    setEvBtn(false);
    setXmFinish(true);
  };
  const setCustomDeadline = (time) => {
    setDeadline(Date.now() + time * 60000);
    setpushNxt(false);
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-10 justify-center">
        <div className="w-full flex justify-end px-2 py-[1rem]">
          <div
            className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md md:relative sm:fixed sm:right-0  md:mt-0"
          >
            <Countdown
              onChange={(e) => (e <= 30000 ? setTimeDanger(true) : "")}
              valueStyle={timeDanger ? { color: "red" } : { color: "blue" }}
              value={deadline}
              onFinish={handleSave}
              format="mm:ss"
            />
          </div>
        </div>
        <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins sm:mt-5">
          Select the real English words in this list
        </h1>

        <div className="mt-[-1.5rem]">
          {/* <SingleWordChoice data={data?.qa}></SingleWordChoice> */}
          <WordChoiceSelectMock
          words={data?.qa?.q}
          setDeadline={setCustomDeadline}
          ></WordChoiceSelectMock>
        </div>
      </div>
      <div className="w-full justify-end flex mt-3 px-3 py-3">
        <Button
          disabled={evBtn ? false : true}
          onClick={handleSave}
          style={{
            color: "white",
            border: "none",
            backgroundColor: "#3AB7BF",
            height: "3rem",
          }}
          className={`${
            evBtn ? "" : "disabled opacity-50"
          } px-5 text-[20px] py-[10px] text-white rounded-md`}
          loading={loadings} 
          
        >
          Next
        </Button>
      </div>
    </div>
  );
}
