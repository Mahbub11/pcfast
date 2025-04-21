import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PracticePageRCS from "../../../PracticeReading/PracticePageRCS";
import PracticePageRCP from "../../../PracticeReading/PracticePageRCP";
import PracticePageRCI from "../../../PracticeReading/PracticePageRCI";
import PracticePageRGP from "../../../PracticeReading/PracticePageRGP";
import PracticePageRHA2 from "../../../PracticeReading/PracticePageRHA2";
import PracticePageRHA from "../../../PracticeReading/PracticePageRHA";
import {
  SaveRCSResult,
  cleanUserReadingInput,
  cleanUserReadingResult,
} from "../../../../redux/slices/readingInput";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import { Button, Skeleton, Statistic } from "antd";
const { Countdown } = Statistic;

export default function Interactive({ data, handleNextQuestion }) {
  console.log(data);

  const dispatch = useDispatch();
  let [index, setIndex] = useState(0);
  const [listRCS, setRCS] = useState(data.interactivereadings[0]);
  const [listRCP, setRCP] = useState();
  const [listRHA, setRHA] = useState();
  const [listRHA2, setRHA2] = useState();
  const [listRCI, setRCI] = useState();
  const [listRGPT, setRGPT] = useState();
  const [showEvaluateBtn, setShowEvaluateBtn] = useState(false);
  const [showNextbtn, setShowNxtBtn] = useState(true);
  const [deadline, setDeadline] = useState(0);
  const [timeDanger, setTimeDanger] = useState(false);
  const [xmFinish,setXmFinish] = useState(false)
  const [evBtn,setEvBtn] = useState(true)
  const [busy,setBusy]= useState(true)
  const [loadings, setLoadings] = useState(false);

  
  useEffect(()=>{
    setDeadline(Date.now() + data.time * 60000)
    setXmFinish(false)
    setEvBtn(true)
  },[data])

  useEffect(()=>{
    if(xmFinish){
      handleEvaluate()
    }
  },[xmFinish])
  const { userInput } = useSelector((state) => state.fillgap);
  const {
    inputRCP,
    inputRHA,
    inputRHA2,
    inputRGP,
    inputRCI,
    resultRCS,
    resultRCP,
    resultRHA,
    resultRHA2,
    resultRGP,
    resultRCI,
  } = useSelector((state) => state.readingInput);

  useEffect(() => {

    data.interactivereadings.map((val) => {
      if (val.inner_type === 321) {
        setRCS(val);
      }
      if (val.inner_type === 322) {
        setRCP(val);
      }
      if (val.inner_type === 323) {
        setRCI(val);
      }
      if (val.inner_type === 324) {
        setRHA(val);
      }
      if (val.inner_type === 325) {
        setRGPT(val);
      }
      if (val.inner_type === 326) {
        setRHA2(val);
      }
    });

    setBusy(false)
  }, [busy]);

  const list = [
    <PracticePageRCS meaning={false} data={listRCS}></PracticePageRCS>,
    <PracticePageRCP meaning={false} index={index} data={listRCP}></PracticePageRCP>,
    <PracticePageRHA meaning={false} index={index} data={listRHA}></PracticePageRHA>,
    <PracticePageRCI meaning={false} data={listRCI}></PracticePageRCI>,
    <PracticePageRGP meaning={false} data={listRGPT}></PracticePageRGP>,
    <PracticePageRHA2 meaning={false} index={index} data={listRHA2}></PracticePageRHA2>,
  ];

  useEffect(() => {
    if (index <= 5) {
      setShowNxtBtn(true);
    } else if (index === 5) {
      setShowNxtBtn(false);
    }
    if (index === 5) {
      setShowNxtBtn(false);
      if (!showEvaluateBtn) {
        setShowEvaluateBtn(true);
        setShowNxtBtn(false);
      }
    }
  }, [index]);

  const handleNext = () => {
    setIndex(++index);
    let correct = 0;
    listRCS.qa.a.map((val, i) => (userInput[i] === val ? ++correct : ""));
    const ansLength = listRCS.qa.a.length;
    const statData = {
      result: ((correct / ansLength) * 100).toFixed(2),
    };
    dispatch(SaveRCSResult(statData));
  };

  console.log(listRCS);

  const handleEvaluate = () => {
    const readingResult =
      parseInt(resultRCS?.result) +
      parseInt(resultRCP?.result) +
      parseInt(resultRHA?.result) +
      parseInt(resultRHA2?.result) +
      parseInt(resultRGP?.result) +
      parseInt(resultRCI?.result);

    const interActiceMockUserData = [
      {
        q: listRCS.qa.q,
        a: listRCS.qa.a,
        userAns: userInput,
        title: listRCS.title,
        inner_type: listRCS.inner_type,
      },
      {
        q: listRCP.qa.q,
        a: listRCP.qa.a,
        options: listRCP.qa.options,
        userAns: inputRCP,
        title: listRCP.title,
        inner_type: listRCP.inner_type,
      },
      {
        q: listRHA.qa.q,
        a: listRHA.qa.a,
        p: listRHA.qa.passage,
        userAns: inputRHA,
        inner_type: listRHA.inner_type,
      },
      {
        q: listRCI.qa.q,
        a: listRCI.qa.a,
        options: listRCI.qa.options,
        userAns: inputRCI,
        title: listRCI.title,
        inner_type: listRCI.inner_type,
      },
      {
        passage: listRGPT.qa.passage,
        a: listRGPT.qa.a,
        options: listRGPT.qa.options,
        userAns: inputRGP,
        title: listRGPT.title,
        inner_type: listRGPT.inner_type,
      },
      {
        q: listRHA2.qa.q,
        a: listRHA2.qa.a,
        p: listRHA2.qa.passage,
        userAns: inputRHA2,
        inner_type: listRHA2.inner_type,
      },
    ];

    const mockData = {
      interActiceMockUserData: interActiceMockUserData,
      time: data.time,
      type: data.type,
      inner_type: data.inner_type,
      result: readingResult / 6 ? readingResult / 6 : 0,
    };
    dispatch(saveMockTestUserAns(mockData));
    dispatch(cleanUserReadingInput());
    dispatch(cleanUserReadingResult());

    setLoadings(false)
    handleNextQuestion();
  };

  const handleSave=()=>{
    setLoadings(true)
    setEvBtn(false)
      setXmFinish(true)
  }


  return (
    <div>
      {
        busy ? <Skeleton></Skeleton>:
        <div>
      <div className="w-full  px-2 py-[1rem] absolute z-10">
        <div
          className="ml-1 font-[700] text-[20px] bg-[#DDE9F8] w-min px-2 py-1
                rounded-md  fixed right-0 z-10 top-[2%]"
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
      <div className="h-auto">
        <div className="">{list[index]}</div>

        <div className=" w-full flex sm:mt-5 md:mt-2 px-2 py-3 ml-[-.5rem]">
          <div className="flex md:gap-10 sm:gap-2 md:justify-end sm:justify-center w-full">
            <div className="mt-2 font-poppins md:text-[18px] sm:text-[14px] font-[500] sm:mr-[5rem] md:mr-0">{`Question ${
              1 + index
            } of 6`}</div>

            <div>
              {showNextbtn ? (
                <button
                  className="px-2 py-2 bg-home rounded-md font-[500]"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          showEvaluateBtn ? "flex" : "hidden"
        } w-full justify-end px-3 py-3 mt-[.5rem]`}
      >
        <Button
        style={{ color: "white", border: "none", backgroundColor: "#3AB7BF",height:'3rem' }}
        loading={loadings} 
          onClick={handleSave}
          className="px-5 text-[20px] py-[10px] text-white rounded-md "
        >
          Next
        </Button>
      </div>
    </div>
      }
    </div>
  );
}
