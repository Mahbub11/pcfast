import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Radio, Tag, Button, notification, Collapse } from "antd";

import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic, Grid, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import "../../Components/Reading/RadioBtn.css";
import { getWordDetails } from "../../redux/slices/disctionary";
import { DisableOptionView } from "../../redux/slices/app";
import { useLocation, useParams } from "react-router-dom";
import { ReactComponent as Tick } from "../../Assets/SVG/tick.svg";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { SaveRCIInput, SaveRCIResult } from "../../redux/slices/readingInput";

const { Countdown } = Statistic;
const { useBreakpoint } = Grid;

export default function PracticePageRCI({ data,meaning=true  }) {
  const [api, contextHolder] = notification.useNotification();

  // let [index, setIndex] = useState({data});
  const { md } = useBreakpoint();
  const dispatch = useDispatch();
  const { visibility } = useSelector((state) => state.fillgap);
  const { listRCI } = useSelector((state) => state.getReadingList);
  const { userInfo } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.statistic);
  const { inputRCI } = useSelector((state) => state.readingInput);
  const [selectVal, setSelectVal] = useState(inputRCI);
  const { rid } = useParams();
  const [timeDanger, setTimeDanger] = useState(false);
  const [busy, isBusy] = useState(true);
  const [bColor, setBcolor] = useState(true);

 

  const handleMeaning = (val) => {
    if(meaning){
      dispatch(getWordDetails(val.target.textContent));
     }
  };

  const saveUserInput = (e) => {
    dispatch(SaveRCIInput(e));
    setSelectVal(e);
    const statData = {
      result: e === data.qa.a[0] ? 100 : 0,
    };

    dispatch(SaveRCIResult(statData));
  };

  return (
    <div>
      {false ? (
        <Skeleton active></Skeleton>
      ) : (
        <div className="h-auto w-[99%] m-auto md:px-5 md:py-5">
          {contextHolder}
          <div className="flex flex-col gap-5 sm:px-2">
            {/* <h1 className="text-[22px] font-montserrat font-[500] underline self-center">
              Identify the Idea
            </h1> */}


            <div className="flex flex-col gap-3 justify-center  rounded-md mt-[2rem]">
              {data.title ? (
                <h1 className="text-center sm:text-[15px] md:text-[20px] font-[500] font-poppins mt-2 underline">
                  {data.title}
                </h1>
              ) : (
                ""
              )}

              <div className=" w-[98%] md:flex justify-between gap-2 m-auto py-2">
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
                    {data.qa.q.split(" ").map((val, index) => {
                      if (val === "*") {
                        return (
                          <div className="border-2  h-auto w-full flex justify-start">
                            <br></br>

                            <p className=" w-full border-[1px] py-3 h-auto px-1">
                              {selectVal.split(" ").map((val, index) => {
                                return (
                                  <span
                                    className="cursor-pointerb w-full overflow-scroll "
                                    onClick={handleMeaning}
                                  >
                                    {" " + val}
                                  </span>
                                );
                              })}
                            </p>
                          </div>
                        );
                      }

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
                  className="md:w-[35%] sm:w-[90%]  m-auto font-poppins font-[400] 
                   sm:text-[15px] md:text-[23px] md:ml-5"
                >
                  <h1 className="sm:text-[17px] md:text-[20px] md:block self-center font-poppins font-[600]">
                    Select the Idea Passage describe.
                  </h1>
                  {
                    <Radio.Group
                      defaultValue={inputRCI ? inputRCI : ""}
                      onChange={(e) => saveUserInput(e.target.value)}
                      style={{
                        marginTop: 16,
                        fontFamily: "inherit",
                      }}
                    >
                      <div className="flex flex-col mt-2 gap-2 text-[15px]">
                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.qa.options[0]}
                          className={`${ visibility && data.qa.options[0] === inputRCI && data.qa.a[0] !== data.qa.options[0]
                            ?' bg-red-400':""}
                          ${
                            visibility && data.qa.a[0] === data.qa.options[0]
                              ? "!bg-green-300 font-montserrat font-[400] rounded-md"
                              : "font-montserrat font-[400]  rounded-md"
                          } h-auto w-auto rounded-ms border-[2px] px-2 py-2`}
                          value={data.qa.options[0]}
                        >
                          <div className="flex">
                            <p> {data.qa.options[0]}</p>
                            
                          </div>
                        </Radio>

                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.qa.options[1]}
                          className={`${ visibility && data.qa.options[1] === inputRCI && data.qa.a[0] !== data.qa.options[1]
                            ?' bg-red-400':""}
                          ${
                            visibility && data.qa.a[0] === data.qa.options[1]
                              ? "bg-green-300  font-montserrat font-[400] "
                              : "  font-montserrat font-[400]"
                          } h-auto rounded-md border-[2px] px-2 py-2`}
                          value={data.qa.options[1]}
                        >
                          <div className="flex">
                            <p> {data.qa.options[1]}</p>
                            
                          </div>
                        </Radio>

                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.qa.options[2]}
                          className={`${ visibility && data.qa.options[2] === inputRCI && data.qa.a[0] !== data.qa.options[2]
                            ?' bg-red-400':""}
                          ${
                            visibility && data.qa.a[0] === data.qa.options[2]
                              ? "bg-green-300  font-montserrat font-[400]"
                              : " font-montserrat font-[400] border-[2px] px-2 py-2"
                          } h-auto rounded-md`}
                          value={data.qa.options[2]}
                        >
                          <div className="flex">
                            <p> {data.qa.options[2]}</p>
                           
                          </div>
                        </Radio>

                        <Radio
                          style={{ fontSize: "17px", fontFamily: "inherit" }}
                          key={data.qa.options[3]}
                          className={`${ visibility && data.qa.options[3] === inputRCI && data.qa.a[0] !== data.qa.options[3]
                            ?' bg-red-400':""}
                          ${
                            visibility && data.qa.a[0] === data.qa.options[3]
                              ? "bg-green-300  font-montserrat font-[400]"
                              : "font-montserrat font-[400]"
                          } h-auto rounded-md  border-[2px] px-2 py-2`}
                          value={data.qa.options[3]}
                        >
                          <div className="flex">
                            <p> {data.qa.options[3]}</p>
                           
                          </div>
                        </Radio>
                      </div>
                    </Radio.Group>
                  }
                </div>
              </div>
            </div>


            <div className="mr-3">
             
            </div>
            <div className={`${visibility ? 'block': 'hidden'} h-auto w-[95%] m-auto`} >
              <Collapse
                accordion
                style={{backgroundColor:'#DDE9F8'}}
                items={[
                  {
                    key: "1",
                    label: "Model Answer",
                    children: (
                      <p className=" text-[17px] font-poppins h-auto px-1">
                      {data.qa.a[0].split(" ").map((val) => (
                        <span
                          className="cursor-pointer md:hover:text-blue-500 w-full "
                          onClick={handleMeaning}
                        >
                         {val + " "}
                        </span>
                      ))}
                    </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
