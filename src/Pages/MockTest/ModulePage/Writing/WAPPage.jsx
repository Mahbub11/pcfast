import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveMockTestUserAns } from "../../../../redux/slices/mockTest";
import {
  analyzeSentence,
  getOverallResult,
} from "../../../../utils/HelperFunction";
import { Button, Statistic } from "antd";
const { Countdown } = Statistic;

export default function WAPPage({ data, handleNextQuestion }) {
  const dispatch = useDispatch();
  const [loadingImage, setLoadingImg] = useState(true);
  const [userAns, setUserAns] = useState(" ");
  const [wordLength, setWordLength] = useState(0);
  const [timeDanger, setTimeDanger] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [xmFinish, setXmFinish] = useState(false);
  const [evBtn, setEvBtn] = useState(true);
  const [loadings, setLoadings] = useState(false);
 

  useEffect(() => {
    setXmFinish(false);
    setEvBtn(true);
  }, [data]);

  useEffect(() => {
    if (xmFinish) {
      handleEvaluate();
    }
  }, [xmFinish]);

  const hanldeOnLoad = () => {
    setLoadingImg(false);
    setDeadline(Date.now() + data.time * 60000);
  };
  const handleUserAns = (val) => {
    setUserAns(val);
    setWordLength(val.split(" ").length);
  };

  const handleEvaluate = async () => {
    setXmFinish(true);
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
          setUserAns("");
        })
        .catch((error) => {
          console.log(error);
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
          setUserAns("");
        });
    } else {
      const mockData = {
        sampleAns: data.qa.a,
        image: data.image,
        qData: data,
        userAns: userAns,
        time: data.time,
        type: data.type,
        inner_type: data.inner_type,
        sentenceError: [],
        sentenceStatus: null,
        overAllResult: 0,
      };

      dispatch(saveMockTestUserAns(mockData));
      setUserAns("");
    }

    setLoadings(false)
    handleNextQuestion();
  };

  const handleSave = () => {
    setLoadings(true)
    setEvBtn(false);
    if(!xmFinish){
      setXmFinish(true)
     }
  };

  return (
    <div>
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
      <h1 className="sm:text-[17px] md:text-[22px] md:block text-center font-poppins font-[600]">
        Write a description of the image below for 1 minute.
      </h1>
      <div className="md:w-[95%] sm:w-full m-auto mt-[2rem]">
        <div className="flex md:flex-row sm:flex-col justify-between gap-10">
          <div
            className={`${
              loadingImage ? "hidden" : "block"
            } md:h-[15rem] md:w-[21rem] sm:h-[16rem] sm:w-[95%] self-center mt-[-2rem]`}
          >
            <img
              onLoad={hanldeOnLoad}
              loading="eager"
              className="h-full w-full rounded-md object-fill"
              src={`https://practicemania.s3.ap-south-1.amazonaws.com/duolingo/${data.image}`}
              alt={"write_about_the_photo"}
            ></img>
          </div>
          <div className="md:w-[60%] sm:w-full sm:m-auto">
            <div>
              <TextArea
                spellCheck={false}
                //   disabled={visibility || !inputAvailable ? true : false}
                className="w-full disabled bg-transparent text-[18px] font-montserrat"
                rows={10}
                value={userAns}
                minLength={5}
                onChange={(e) => handleUserAns(e.target.value)}
                placeholder="Start Your Typing...."
                maxLength={2000}
              />
            </div>
            <div className="self-end flex justify-end px-1 py-2 font-[600]">
              <h1>Word Count: {wordLength}</h1>
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
