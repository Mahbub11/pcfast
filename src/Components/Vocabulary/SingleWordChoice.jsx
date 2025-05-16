import React, { useEffect, useState } from "react";
import CheckboxBoxButton from "./CheckboxButton";
import { useDispatch, useSelector } from "react-redux";
import { ToggleVisibility } from "../../redux/slices/fillgap";
import { saveUserchoice } from "../../redux/slices/wordSelect";
import { ShowAnswer } from "./ShowAnswer";
import { ReactComponent as Tick } from "../../Assets/SVG/tick.svg";

export default function SingleWordChoice({ data }) {
  const { q, a } = data;
  console.log(data)

  // useEffect(() => {
  //   dispatch(saveUserchoice(choice));
  // }, [choice]);

  // useEffect(() => {
  //   setChoice([]);
  // }, [checkbox]);

  // const handleInputVal = (val) => {
  //   if (choice.includes(val)) {
  //     const newData = choice.filter((name, index) => name !== val);
  //     return setChoice(newData);
  //   } else {
  //     return setChoice((prev) => [...prev, val]);
  //   }
  // };

  return (
    <div className="sm:mt-[1rem] bg-violet-400/30 flex items-center justify-center md:mt-[2rem]">
      <div className=" ">
        <div className=" w-full flex justify-center">
          <div
            className="grid grid-cols-2 font-montserrat sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 
             gap-y-2 justify-between"
          >
            {q?.map((val, index) => {
              return (
                <div>
                  <ShowAnswer label={val} answer={a}></ShowAnswer>
                </div>
                // <div>
                //   {
                //     <CheckboxBoxButton
                //       key={val}
                //       handleInputVal={handleInputVal}
                //       label={val}
                //       answer={a}
                //     ></CheckboxBoxButton>
                //   }
                // </div>
              );
            })}
          </div>
        </div>
        {/* <div className="h-full w-full">
        <button onClick={handleEvalute} className="w-full h-full flex justify-center m-auto mt-5 bg-blue-300 rounded-md">
          <span className="text-center  mt-1 mb-1 text-white ">Evaluate</span>
        </button>
      </div> */}

        <div className="px-2">
          <div className="mt-2 w-full flex md:flex-row sm:flex-col gap-3">
            <div className="flex gap-2 items-center ">
              <span className="w-4 h-4 bg-home rounded-full"></span>
              <h2>Your Selection</h2>
            </div>
            <div className="flex gap-2 items-center ">
              <Tick></Tick>
              <h2>Correct Word</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
