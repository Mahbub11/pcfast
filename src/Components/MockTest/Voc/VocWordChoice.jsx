import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserchoice } from "../../../redux/slices/wordSelect";
import LabelButton from "./LabelButton";


export default function VocWordChoice({ q,a,userAns }) {
  

  return (
    <div className="sm:mt-[1rem] bg-violet-400/30 flex items-center justify-center md:mt-[2rem]">
      <div className=" ">
        <div className=" w-full flex justify-center">
          <div className="grid grid-cols-2 font-montserrat sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 
          gap-y-2 justify-between">
            {q?.map((val, index) => {
              return (
                <div>
                  {
                    <LabelButton
                      key={val}
                      userAns={userAns}
                      label={val}
                      answer={a}
                    ></LabelButton>
                  }
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="h-full w-full">
        <button onClick={handleEvalute} className="w-full h-full flex justify-center m-auto mt-5 bg-blue-300 rounded-md">
          <span className="text-center  mt-1 mb-1 text-white ">Evaluate</span>
        </button>
      </div> */}
      </div>
    </div>
  );
}
