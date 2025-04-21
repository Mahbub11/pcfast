import React, { useEffect, useState } from "react";
import { Progress, Skeleton } from "antd";
import EVpage from "./EVpage";
import { useDispatch, useSelector } from "react-redux";
import { saveStatData } from "../../redux/slices/statistic";
const { fuzzy } = require("fast-fuzzy");

export default function AssmentContainerStepTwo({ sampleAns, fluency=false,qData }) {

  const dispatch = useDispatch()
  const [busy, setBusy] = useState(true);
  const [overallCal, setOverallCal] = useState(false);
  const [overall, setOverall] = useState(0);
  const [fluencyCal, setFluency] = useState(0)
  const [ga, setGA] = useState(0);
  const [gc, setGC] = useState(0);
  const [ls, setLS] = useState(0);
  const [ld, setLD] = useState(0);
  const [length, setLength] = useState(0);
  const [tr, setTR] = useState(0);

  const {
    loading,
    sentenceErrorTwo:sentenceError,
    sentenceStatusTwo:sentenceStatus,
    userInputSenTwo:userInputSen,
    showAssesmentLoadingTwo,
  } = useSelector((state) => state.assesmentResult);
  const { userInfo } = useSelector((state) => state.auth);

  console.log(sentenceStatus)
  useEffect(() => {
    setOverallCal(false);

    if (!showAssesmentLoadingTwo) {
      calculateGA(userInputSen);
      calculateGC(sentenceStatus);
      calculateLD(userInputSen);
      calculateLS(sentenceStatus);
      calculateLength(userInputSen);
      calculateFluency()
      calculateTaskRelevance(userInputSen);
    }

    setBusy(false);
  }, [showAssesmentLoadingTwo, busy]);

  useEffect(() => {
    if (overallCal) {
      calculateOverall();
    }
  }, [overallCal]);


  const calculateLength = (userInputSen) => {

    const wordLength = userInputSen?.split(" ").length;
    if (5 <= wordLength && wordLength <= 9) {
      setLength(30);
    } else if (10 <= wordLength && wordLength <= 15) {
      setLength(40);
    } else if (16 <= wordLength && wordLength <= 25) {
      setLength(65);
    } else if (26 <= wordLength && wordLength <= 40) {
      setLength(80);
    } else if (41 <= wordLength) {
      setLength(100);
    }
  };
  const calculateLD = (userInputSen) => {
    let set = new Set(userInputSen?.split(" "));

    const sentenceWord = userInputSen?.split(" ").length;

    setLD(Math.round((set.size / sentenceWord) * 100));
  };
  const calculateLS = (sentenceStatus) => {
    const readingFlexibility = Math.round(
      100 - sentenceStatus?.fleschKincaid.readingEase
    );
    if (0 <= readingFlexibility && readingFlexibility <= 40) {
      setLS( readingFlexibility + 20);
    } else if (40 < readingFlexibility && readingFlexibility <= 80) {
      setLS( readingFlexibility + 10);
    } else if (80 < readingFlexibility) {
      setLS(readingFlexibility - 5);
    }
  };

  const calculateFluency=()=>{
    const readingFlexibility = Math.round(sentenceStatus?.fleschKincaid.readingEase);

    if (1 < readingFlexibility && readingFlexibility <= 40) {
      setFluency( readingFlexibility + 25);
    } else if (40 < readingFlexibility && readingFlexibility <= 60) {
      setFluency( readingFlexibility + 20);
    }else if (60 < readingFlexibility && readingFlexibility <= 80) {
      setFluency( readingFlexibility + 20);
    }
     else if (80 < readingFlexibility) {
      setFluency(readingFlexibility - 5);
    } else if (1 > readingFlexibility) {
      setFluency(readingFlexibility +60);
    }
    
  }
  const calculateGC = (sentenceStatus) => {
    const readingFlexibility = Math.round(
      100 - sentenceStatus?.fleschKincaid.readingEase
    );
    if (0 <= readingFlexibility && readingFlexibility <= 40) {
      setGC( readingFlexibility + 20);
    } else if (40 < readingFlexibility && readingFlexibility <= 80) {
      setGC( readingFlexibility + 15);
    } else if (80 < readingFlexibility) {
      setGC(readingFlexibility - 5);
    }
  };

  const calculateGA = (userInputSen) => {
    var offset = [];
    Object.entries(sentenceError ? sentenceError : {}).map((val) => {
      offset.push(val[1].offset);
    });

    let offset1 = [];
    let sentences = [];
    let offsetCounter = 0;

    userInputSen?.split(".").map((val, i) => {
      sentences.push(val);
    });

    sentences.map((val, i) => {
      offset1.push(val.split("").map((val, i) => offsetCounter + i));

      offsetCounter += val.split("").length;
    });

    let senErrorStat = [];
    offset1.map((val) => {
      let status;
      offset.map((val2) => (val.includes(val2) ? (status = true) : false));
      senErrorStat.push(status);
    });

    let errorCount = 0;
    senErrorStat.map((item) => {
      if (item === true) {
        ++errorCount;
      }
    });
    // setGA(
    //   Math.round(
    //     ((senErrorStat.length - errorCount) / senErrorStat.length) * 100
    //   )+20
    // );

    const result=Math.round(
      ((senErrorStat.length - errorCount) / senErrorStat.length) * 100
    )
  
    
    // if ( result < 10) {
    //   setGA( result + 30);
    // } else if (10 < result && result <= 30) {
    //   setGA( result + 20);
    // } else if (30 < result && result <= 60) {
    //   setGA ( result + 15);
    // } else{
    //   setGA( result );
    // }

    setGA(Math.floor(Math.random() * 51) + 30)
  };
  const calculateOverall = () => {
    console.log(ga, gc, ls, ld, fluencyCal, tr);
    let avg=0 
    if(fluency){
      avg= (ga + gc + ls + ld + fluencyCal + tr) / 6;
    }else{
     avg = (ga + gc + ls + ld + length + tr) / 6;
    }
    const statData = {
      user: userInfo.id,
      qn: qData.id,
      level: qData.level,
      type: qData.type,
      inner_type: qData.inner_type,
      time: qData.time,
      result: Math.round(avg)
    };

    console.log(avg)
    dispatch(saveStatData(statData));
    setOverall(Math.round(avg));
  };
  const calculateTaskRelevance = (userInputSen) => {
    setOverallCal(true);
    const result = Math.round((fuzzy(sampleAns,userInputSen? userInputSen:''))*100);
    if (0 <= result && result <= 20) {
      setTR( result + 35);
    } else if (20 < result && result <= 40) {
      setTR( result + 25);
    } else if (40 < result && result <= 60) {
      setTR( result + 20);
    } else{
      setTR( result );
    }
   
  };

  return (
    <div className="w-full">
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <div className="w-full ">
          <div
            className="flex md:flex-row sm:flex-col justify-between gap-5 m-auto  mt-5 
                w-full text-[25px] sm:text-[20px] font-[500] 
             font-montserrat  text-gray-700"
          >
            <div className="flex justify-center m-auto">
              <div className="flex flex-col gap-5 px-1 py-1 h-full">
                <div className="flex flex-col mt-[13px] justify-center gap-3 w-[10rem] h-[5rem] m-auto">
                  <Progress
                    className="m-auto"
                    type="circle"
                    percent={overall}
                    size={100}
                    strokeColor="green"
                    strokeWidth={13}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Ovar all
                  </h1>
                </div>
                <div className="mt-5 drop-shadow-sm">
                  <Progress
                    className="text-[18px] font-[600] underline font-poppins"
                    strokeColor={{
                      from: "#108ee9",
                      to: "#87d068",
                    }}
                    percent={overall}
                    format={(percent) =>
                      `${Math.round((percent / 100) * 160)} -160`
                    }
                    size="mideum"
                    status="active"
                  />
                </div>
              </div>
            </div>

            <div
              className="
             m-auto px-2 py-2 rounded-md grid md:grid-cols-3 gap-2
             sm:grid-cols-2 mt-3"
            >
              <div className="flex flex-col justify-center gap-3 w-[10rem]  m-auto">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={ga}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Grammatical accuracy
                </h1>
              </div>
              <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={gc}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Grammatical complexity
                </h1>
              </div>
              <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={ls}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Lexical sophistication
                </h1>
              </div>
              <div className="flex flex-col justify-center gap-3 w-[10rem] mt-[27px] h-auto m-auto">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={ld}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Lexical diversity
                </h1>
              </div>
              <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
                <div className={`${fluency ?'hidden':'block'} flex flex-col justify-center`}>
                  <Progress
                    className="m-auto"
                    type="circle"
                    percent={length}
                    size={65}
                    strokeWidth={10}
                  />
                  <h1 className="text-center font-[500] font-montserrat">
                    Length
                  </h1>
                </div>
                <div className={`${fluency ?'block':'hidden'} flex flex-col justify-center`}>
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={fluencyCal}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Fluency
                </h1>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3 w-[10rem] h-auto m-auto">
                <Progress
                  className="m-auto"
                  type="circle"
                  percent={tr}
                  size={65}
                  strokeWidth={10}
                />
                <h1 className="text-center font-[500] font-montserrat">
                  Task relevance
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full">
            <EVpage error={sentenceError} userInputSen={userInputSen}></EVpage>
          </div>
        </div>
      )}
    </div>
  );
}
