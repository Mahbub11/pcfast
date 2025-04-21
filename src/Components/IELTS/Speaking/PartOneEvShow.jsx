import React, { useEffect, useState } from "react";
import TextEditor from "../../AssesmentGPT/TextEditor";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { Col, Row, Skeleton, Statistic } from "antd";

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
export const PartOneEvShow = () => {
  const { partOneEvData, partOneStatData } = useSelector(
    (state) => state.ielts_speakingEV
  );
  
  const [busy, isBusy] = useState(true);
  const [statData, setStatData] = useState();
  const [recommendation, setRecommendation] = useState();
  const categories = [
    "Fluency_and_coherence",
    "Lexical_resource",
    "Grammatical_range_and_accuracy",
    "Pronunciation",
  ];

  useEffect(() => {
    const resultObject = {};
    partOneStatData.forEach((item) => {
      categories.forEach((category) => {
        if (category in item) {
          resultObject[category] = item.recommendation;
        }
      });
    });

    const resultObject1 = {};

    partOneStatData.forEach((item) => {
      categories.forEach((category) => {
        if (category in item) {
          resultObject1[category] = item[category];
        }
      });
    });

    setStatData(resultObject1);
    setRecommendation(resultObject);
    setTimeout(() => {
      isBusy(false);
    }, 2000);
  }, [busy]);

  console.log(recommendation);
  console.log(statData);

  return (
    <div>
      {busy ? (
        <Skeleton active></Skeleton>
      ) : (
        <div>
          <div>
            <div className=" m-auto  rounded  flex items-center justify-between space-x-6">
              {/* Score Details */}
              <div className="bg-white p-5 w-full m-auto rounded-md">
                <div className="flex justify-between border p-3">
                  <div className="text-lg text-gray-500">
                    Fluency and Coherence
                  </div>
                  <div className="text-red-500 text-lg font-bold border-l-2 h-full ">
                    <Statistic
                      value={statData.Fluency_and_coherence}
                      precision={2}
                      formatter={subFormatter}
                    />
                  </div>
                </div>
                <div className="flex justify-between border p-3">
                  <div className="text-lg text-gray-500">Lexical Resource</div>
                  <div className="text-red-500 text-lg font-bold border-l-2 h-full ">
                    <Statistic
                      value={statData.Lexical_resource}
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
                      value={statData.Grammatical_range_and_accuracy}
                      precision={2}
                      formatter={subFormatter}
                    />
                  </div>
                </div>
                <div className="flex justify-between border p-3">
                  <div className="text-lg text-gray-500">Pronunciation</div>

                  <div className="text-red-500 text-lg font-bold border-l-2 h-full ">
                    <Statistic
                      value={statData.Pronunciation}
                      precision={2}
                      formatter={subFormatter}
                    />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-poppinsBold mb-1 mt-10">
              Recommendations
            </h3>
            <div className="bg-white p-3 flex-col space-y-4">
              <h2>
                <span className="font-[700] text-tahiti">
                  Fluency and Coherence:
                </span>{" "}
                {recommendation.Fluency_and_coherence}
              </h2>
              <h2>
                <span className="font-[700] text-tahiti">
                  Grammatical Range and Accuracy:
                </span>{" "}
                {recommendation.Grammatical_range_and_accuracy}
              </h2>
              <h2>
                <span className="font-[700] text-tahiti">
                  Lexical Resource:
                </span>{" "}
                {recommendation.Lexical_resource}
              </h2>
              <h2>
                <span className="font-[700] text-tahiti">Pronunciation:</span>{" "}
                {recommendation.Pronunciation}
              </h2>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-poppinsBold mb-2 mt-10">
              Interactive Speaking Result
            </h3>
            <div className="bg-white p-3">
              {partOneEvData?.map((val, index) => (
                <div key={index} className="mb-2 p-2">
                  <strong className="block mb-1">
                    <span className="border-2 border-tahiti rounded-md px-3 py-1">
                      Question {index + 1}
                    </span>
                  </strong>
                  <p className="font-[700] px-1 py-1"> {val.Question}</p>

                  <div>
                    <h2 className="font-bold ml-1">Answer:</h2>
                    <div className="ml-1">
                      <TextEditor
                        text={val.Answer}
                        grammarMistakes={val.corrections.correctionsList}
                      ></TextEditor>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
