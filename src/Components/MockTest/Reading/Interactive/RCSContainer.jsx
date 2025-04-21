import React from "react";
import { Input } from "antd";
import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getWordDetails } from "../../../../redux/slices/disctionary";
import SelectBoxMock from "./SelectBoxMock";

export default function RCSContainer({ data }) {
  const dispatch = useDispatch();
  
  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  let a = -1;
  return (
    <div>
      <div className="h-auto w-full m-auto bg-[#fffffff7] md:px-5 md:py-5">
        <div className="flex flex-col gap-5 sm:px-2">
          {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Complete the Sentence
            </h1> */}

          <h1
            className="sm:text-[17px] md:text-[22px]
             md:block self-center font-poppins mt-[2rem] sm:text-center md:text-start font-[600]"
          >
            Select The Best Option in each missing Word
          </h1>

          <div className="flex flex-col gap-3 justify-center border-[2px] border-[#3ab6bf5f] rounded-md px-2 md:w-[90%] md:m-auto">
            <h1 className="text-center sm:text-[15px] md:text-[20px] font-[500] font-poppins mt-2 underline">
              {data.title ? (
                <h1 className="text-center sm:text-[15px] md:text-[20px] font-[500] font-poppins mt-2">
                  {data.title}
                </h1>
              ) : (
                ""
              )}
            </h1>
            <div className="m-auto w-[90%] px-2 py-2 mt-2">
              <div
                className="self-center sm:text-[15px] md:text-[20px] font-poppins font-[400] flex
                 flex-wrap gap-1 leading-2 w-[90%] 
                sm:w-full msm:w-[100%] m-auto text-justify"
              >
                {data.q.split(" ").map((value, index) => {
                  if (value.includes("*")) {
                    let passIndex = ++a;
                    a = passIndex;

                    return (
                      <SelectBoxMock
                        key={value}
                        indexNumber={passIndex}
                        ansWer={data.a[passIndex]}
                        value={value}
                        userAns={data.userAns}
                      ></SelectBoxMock>
                    );
                  } else {
                    return (
                      <div>
                        <p
                          className="cursor-pointer md:hover:text-blue-500"
                          onClick={handleMeaning}
                        >
                          {value}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
