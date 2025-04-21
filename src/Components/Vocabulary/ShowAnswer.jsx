import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Tick } from "../../Assets/SVG/tick.svg";
import "./wordSelect.css";

export const ShowAnswer = ({ answer, label }) => {
  const { userChoice } = useSelector((state) => state.wordSelect);

  console.log(userChoice)

  return (
    <div>
      <span>
        {answer.includes(label) ? (
          <div className="ml-[7px]">
            <Tick></Tick>
          </div>
        ) : (
          <div className="invisible">
            <Tick></Tick>
          </div>
        )}
      </span>
      {userChoice.includes(label) ? (
        <span className="checkbox-button-checked md:text-[15px] sm:text-[13px] mt-[-20px] text-center font-[400]  checkbox-button m-1 cursor-pointer sm:w-[95%] md:w-auto
        border-[2px] border-blue-400 rounded-md block leading-10 sm:px-2 sm:py-2 md:px-1 md:py-1">{label}</span>
      ) : (
        <span
          className={` md:text-[15px] sm:text-[13px] mt-[-20px] text-center font-[400]  checkbox-button m-1 cursor-pointer sm:w-[95%] md:w-auto
        border-[2px] border-blue-400 rounded-md block leading-10 sm:px-2 sm:py-2 md:px-1 md:py-1`}
        >
          {label}
        </span>
      )}

     
    </div>
  );
};
