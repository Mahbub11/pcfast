import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getWordDetails } from "../../../redux/slices/disctionary";
import InputBoxContainer from "../../Reading/InputBoxContainer";
import RCInputBoxMock from "./RCInputBoxMock";

export default function RCContainer({ question, ans, title,userAns }) {
  const dispatch = useDispatch();

  const handleMeaning = (val) => {
    dispatch(getWordDetails(val.target.textContent));
  };

  let a = -1;
  return (
    <div className="h-full w-full sm:block md:flex flex-col justify-between m-auto ">
      <div className="w-full sm:mt-[0px] m-auto flex flex-col justify-between ">
        <h1 className="text-center text-[22px] font-[500] font-robotomono">
          {title}
        </h1>

        <div>
          <div className="bmd:order-[2px] md:px-1 md:py-1 mt-5 font-montserrat sm:text-[15px] 
          md:text-[18px] font-[400] flex flex-col">
            <div
              className="flex flex-wrap md:gap-1 sm:gap-[5px]  leading-1 w-[90%] sm:w-full msm:w-[100%]
            px-2 sm:leading-8 md:leading-10 m-auto text-justify"
            >
              {question.split(" ").map((value, index) => {
                if (value.includes("*")) {
                  let passIndex = ++a;
                  a = passIndex;

                  var sectionToCheck = value;
                  var allFoundCharacters = sectionToCheck.match(/[*]/g);
                  const doc = sectionToCheck.split("*");
                  return (
                    <RCInputBoxMock
                      ansWer={ans[passIndex]}
                      starter={doc[0]}
                      indexNumber={passIndex}
                      gap={allFoundCharacters}
                      givenChar={doc}
                      userAns={userAns}
                    ></RCInputBoxMock>
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
  );
}
