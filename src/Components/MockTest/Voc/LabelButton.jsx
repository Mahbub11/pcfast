import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Tick } from "../../../Assets/SVG/tick.svg";
import "./wordSelect.css";
const getUniqueId = (() => {
  const now = Date.now();
  let seed = 0;
  return () => `checkbox-button-${now}-${seed++}`;
})();

const LabelButton = ({ label, answer,userAns }) => {

  const [uid, setUid] = useState(getUniqueId());
  const { visibility } = useSelector((state) => state.fillgap);




  return (
    <div className="font-poppins">
      <input
        disabled={visibility ? true : false}
        type="checkbox"
        value={label}
        id={uid}
        className={`${
          visibility ? "hidden" : "visible"
        } checkbox-button-hidden mt-[1rem] cursor-pointer sm:w-[95%]
         md:w-full border-[2px] border-blue-400 rounded-md block leading-10 px-1 py-1`}
       
      />

      <span htmlFor={uid} className={`${visibility ? "visible" : "hidden"}`}>
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
      <label
        // onClick={(e) => handleInputVal(label)}
        htmlFor={uid}
        className={`${userAns.includes(label)?'bg-home':''} 
      md:text-[15px] sm:text-[13px] mt-[-20px] text-center font-[400]  checkbox-button m-1 cursor-pointer sm:w-[95%] md:w-auto
      border-[2px] border-blue-400 rounded-md block leading-10 sm:px-2 sm:py-2 md:px-1 md:py-1`}
      >
        {label}
      </label>
    </div>
  );
};

export default LabelButton;
