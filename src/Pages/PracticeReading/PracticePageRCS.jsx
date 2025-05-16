import React, { useEffect, useRef, useState } from "react";
import { Input, Skeleton } from "antd";
import {
  Collapse,
} from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Statistic, Row, Col } from "antd";
import SelectBox from "../../Components/Reading/SelectBox";
import { ans, Selectans } from "../../utils/dummuData";
import { useDispatch, useSelector } from "react-redux";
import {
  DisableVisibility,
  ToggleVisibility,
} from "../../redux/slices/fillgap";
import { getWordDetails } from "../../redux/slices/disctionary";
import { useLocation, useParams } from "react-router-dom";
import { DisableOptionView } from "../../redux/slices/app";
import IconsArrowLeft from "../../Assets/SVG/IconsArrowLeft";
import IconsArrowRight from "../../Assets/SVG/IconsArrowRight";
import { clearStatDataError, saveStatData } from "../../redux/slices/statistic";
import { toggleBookmark } from "../../redux/slices/bookmark";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { SaveRCSResult } from "../../redux/slices/readingInput";

const { TextArea } = Input;
const { Countdown } = Statistic;
const deadline = Date.now() + 12000;

export default function PracticePageRCS({ data, meaning = true }) {
  const dispatch = useDispatch();
  const { listRCS } = useSelector((state) => state.getReadingList);
  const { userInput, visibility } = useSelector((state) => state.fillgap);
  let dataLength = listRCS.length;

  const handleMeaning = (val) => {
    if (meaning) {
      dispatch(getWordDetails(val.target.textContent));
    }
  };

  let a = -1;
  return (
    <div>
      {false ? (
        <Skeleton active></Skeleton>
      ) : (
        <div className="h-auto w-[99%] m-auto  md:px-5 md:py-5">
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

            <div className="flex flex-col gap-3 justify-center border-[2px] border-[#3ab6bf5f] rounded-md px-2 md:w-[80%] md:m-auto">
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
                  {data.qa.q.split(" ").map((value, index) => {
                    if (value.includes("*")) {
                      let passIndex = ++a;
                      a = passIndex;

                      return (
                        <SelectBox
                          key={value}
                          indexNumber={passIndex}
                          ansWer={data.qa.a[passIndex]}
                          value={value}
                        ></SelectBox>
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

            {/* <div className={`${visibility ? "block" : "hidden"}`}>
              <div className="h-auto w-[75%] m-auto">
                <Collapse
                  accordion
                  style={{ backgroundColor: "#DDE9F8" }}
                  items={[
                    {
                      key: "1",
                      label: "Model Answer",
                      children: (
                        <p className=" text-[17px] font-poppins h-auto px-1">
                          {data.qa.a.map((val) => (
                            <span
                              className="cursor-pointer md:hover:text-blue-500 w-full "
                              onClick={handleMeaning}
                            >
                              {" " + val}
                            </span>
                          ))}
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
