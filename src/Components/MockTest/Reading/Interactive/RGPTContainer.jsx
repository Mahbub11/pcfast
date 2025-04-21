import React, { useEffect, useState } from "react";
import { notification, Grid, Skeleton, Radio, Collapse } from "antd";
import { Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../../../Components/Reading/RadioBtn.css";
import { getWordDetails } from "../../../../redux/slices/disctionary";

export default function RGPTContainer({ data }) {
  const dispatch = useDispatch();
  const { visibility } = useSelector((state) => state.fillgap);

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  return (
    <div>
      {false ? (
        <Skeleton active></Skeleton>
      ) : (
        <div className="h-auto w-[99%] m-auto bg-[#fffffff7] md:px-5 md:py-5">
          <div className="flex flex-col gap-5 sm:px-2">
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Complete the Passage
            </h1> */}
            <div className="flex flex-col gap-3 justify-center  rounded-md">
              {data.title ? (
                <h1 className="text-center sm:text-[15px] md:text-[20px] font-[500] font-poppins mt-[2rem] underline">
                  {data.title}
                </h1>
              ) : (
                ""
              )}

              <div className="mt-[2rem] w-[98%] md:flex justify-between gap-2 m-auto py-2">
                <div
                  className="md:text-[18px] sm:text-[15px]
                       md:w-[65%] sm:w-full msm:w-[100%] 
                       rounded-md border-[1px] border-[#3ab6bf5f]"
                >
                  <div className="w-full border-b-[1px] border-[#3ab6bf5f]">
                    <h1 className="text-center font-poppins text-[20px]">
                      Passage
                    </h1>{" "}
                  </div>
                  <div
                    className="w-full  flex flex-wrap font-[400] leading-1 m-auto gap-1
                 px-5 py-4 text-justify font-poppins"
                  >
                    {data.passage.split(" ").map((val, index) => {
                      return (
                        <div>
                          <p
                            className={`cursor-pointer md:hover:text-blue-500 text-justify`}
                            onClick={handleMeaning}
                          >
                            {val}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className=" md:w-[35%] sm:w-[90%]  m-auto font-poppins font-[400] 
                   sm:text-[15px] md:text-[20px] md:ml-5"
                >
                  <h1 className="sm:text-[17px] md:text-[20px] md:block self-center font-poppins font-[600]">
                    Select the best sentence to fill in the blank.
                  </h1>
                  {
                    <Radio.Group
                      defaultValue={data.userAns ? data.userAns : ""}
                      // disabled={visibility ? true : false}

                      style={{
                        marginTop: 16,
                        fontFamily: "inherit",
                      }}
                    >
                      <div className="flex flex-col mt-2 gap-2 text-[15px]">
                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.options[0]}
                          className={`${
                            visibility &&
                            data.options[0] === data.userAns &&
                            data.a[0] !== data.options[0]
                              ? " bg-red-400"
                              : ""
                          }
                          ${
                            visibility && data.a[0] === data.options[0]
                              ? "!bg-green-300 font-montserrat font-[400] rounded-md"
                              : "font-montserrat font-[400]  rounded-md"
                          } h-auto w-auto rounded-ms border-[2px] px-2 py-2`}
                          value={data.options[0]}
                        >
                          <div className="flex">
                            <p> {data.options[0]}</p>
                          </div>
                        </Radio>

                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.options[1]}
                          className={`${
                            visibility &&
                            data.options[1] === data.userAns &&
                            data.a[0] !== data.options[1]
                              ? " bg-red-400"
                              : ""
                          }
                            ${
                              visibility && data.a[0] === data.options[1]
                                ? "bg-green-300  font-montserrat font-[400] "
                                : "  font-montserrat font-[400]"
                            } h-auto rounded-md border-[2px] px-2 py-2`}
                          value={data.options[1]}
                        >
                          <div className="flex">
                            <p> {data.options[1]}</p>
                          </div>
                        </Radio>

                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.options[2]}
                          className={`${
                            visibility &&
                            data.options[2] === data.userAns &&
                            data.a[0] !== data.options[2]
                              ? " bg-red-400"
                              : ""
                          }
                          ${
                            visibility && data.a[0] === data.options[2]
                              ? "bg-green-300  font-montserrat font-[400]"
                              : " font-montserrat font-[400] border-[2px] px-2 py-2"
                          } h-auto rounded-md`}
                          value={data.options[2]}
                        >
                          <div className="flex">
                            <p> {data.options[2]}</p>
                          </div>
                        </Radio>

                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.options[3]}
                          className={`${
                            visibility &&
                            data.options[3] === data.userAns &&
                            data.a[0] !== data.options[3]
                              ? " bg-red-400"
                              : ""
                          }
                          ${
                            visibility && data.a[0] === data.options[3]
                              ? "bg-green-300  font-montserrat font-[400]"
                              : "font-montserrat font-[400]"
                          } h-auto rounded-md  border-[2px] px-2 py-2`}
                          value={data.options[3]}
                        >
                          <div className="flex">
                            <p> {data.options[3]}</p>
                          </div>
                        </Radio>
                      </div>
                    </Radio.Group>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
