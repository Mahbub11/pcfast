import { useEffect, useState } from "react";
import { Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import { PartOneEvShow } from "./PartOneEvShow";
import { PartTwoEvShow } from "./PartTwoEvShow";
import { PartThreeEvShow } from "./PartThreeEvShow";
const formatter = (value) => (
  <CountUp
    className="text-[5rem] font-poppinsBold text-red-400"
    decimals={1}
    decimal="."
    end={value}
    separator="."
  />
);

const subFormatter = (value) => (
  <CountUp
    className="text-[18px] font-poppinsBold text-red-400 ml-3"
    decimals={1}
    decimal="."
    end={value}
    separator="."
  />
);

export const OverallStatShowIELTS = ({ overallStatData }) => {
  const [currentPart, setCurrentPart] = useState(0);

  const habdlePartEv = (id) => {
    switch (id) {
      case 1:
        setCurrentPart(1);
        break;
      case 2:
        setCurrentPart(2);
        break;

      case 3:
        setCurrentPart(3);
        break;

      default:
        break;
    }
  };


  console.log(currentPart)

  return (
    <div>
      <div className=" font-poppins  mx-auto">
        <div className="flex items-center justify-center ">
          <div className=" w-[90%] m-auto  rounded p-6 flex items-center justify-between space-x-6">
            {/* Main Score */}
            <div className="text-center p-10 rounded bg-white">
              <Statistic
                value={overallStatData.overall}
                precision={2}
                formatter={formatter}
              />
              <div className="text-xl mt-2 font-semibold text-gray-700">
                Overall
              </div>
            </div>

            {/* Score Details */}
            <div className="bg-white p-5 w-[60%] rounded-md">
              <div className="flex justify-between border p-3">
                <div className="text-lg text-gray-500">
                  Fluency and Coherence
                </div>
                <div className="text-red-500 text-lg font-bold border-l-2 h-full ">
                  <Statistic
                    value={overallStatData.Fluency_and_coherence}
                    precision={2}
                    formatter={subFormatter}
                  />
                </div>
              </div>
              <div className="flex justify-between border p-3">
                <div className="text-lg text-gray-500">Lexical Resource</div>
                <div className="text-red-500 text-lg font-bold border-l-2 h-full ">
                  <Statistic
                    value={overallStatData.Lexical_resource}
                    precision={2}
                    formatter={subFormatter}
                  />
                </div>
              </div>
              <div className="flex justify-between border p-3">
                <div className="text-lg text-gray-500">
                  Grammatical Range and Accuracy
                </div>
                <div className="text-red-500 text-lg font-bold border-l-2 h-full ">
                  <Statistic
                    value={overallStatData.Grammatical_range_and_accuracy}
                    precision={2}
                    formatter={subFormatter}
                  />
                </div>
              </div>
              <div className="flex justify-between border p-3">
                <div className="text-lg text-gray-500">Pronunciation</div>

                <div className="text-red-500 text-lg font-bold border-l-2 h-full ">
                  <Statistic
                    value={overallStatData.Pronunciation}
                    precision={2}
                    formatter={subFormatter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center  ">
          <div className="flex mb-6 mt-10 space-x-3">
            <button
              onClick={() => habdlePartEv(1)}
              className={`${currentPart===1?'bg-tahiti text-white':'bg-gray-300 text-black'} px-4 py-2  rounded`}
            >
              Part 1
            </button>
            <button
              onClick={() => habdlePartEv(2)}
              className={`${currentPart===2?'bg-tahiti text-white':'bg-gray-300 text-black'} px-4 py-2  rounded`}
            >
              Part 2
            </button>
            <button
              onClick={() => habdlePartEv(3)}
              className={`${currentPart===3?'bg-tahiti text-white':'bg-gray-300 text-black'} px-4 py-2  rounded`}
            >
              Part 3
            </button>
          </div>
        </div>
        <div className="mt-10 w-[90%] m-auto">
         {
          currentPart===1?  <PartOneEvShow></PartOneEvShow>:
          currentPart===2 ? <PartTwoEvShow></PartTwoEvShow>:
          currentPart===3 ? <PartThreeEvShow></PartThreeEvShow>:null
         }
        </div>
      </div>
    </div>
  );
};
