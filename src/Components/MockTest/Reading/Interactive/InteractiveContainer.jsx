import React, { useEffect, useState } from "react";
import RCSContainer from "./RCSContainer";
import RCPContainer from "./RCPContainer";
import RHAContainer from "./RHAContainer";
import RCIContainer from "./RCIContainer";
import RGPTContainer from "./RGPTContainer";
import RHAContainerSecond from "./RHAContainerSecond";

export default function InteractiveContainer({ data }) {

  const [count, setCount] = React.useState(0);
  const [nxtBtnActive, setNxtBtnActive] = React.useState(true);
  const [prevBtnActive, setPrevBtnActive] = React.useState(false);

  const handleNext = () => {
   
    if (count === 0 || count < 5) {
      setCount(count +1)
      setPrevBtnActive(true)
      setNxtBtnActive(true);
    }
    
  };
  useEffect(()=>{
    if(count===5){
      setNxtBtnActive(false);
    }
    if(count>0){
      setPrevBtnActive(true)
    }
    if(count===0){
      setPrevBtnActive(false)
    }
  },[count])
 console.log(count);
  const handlePrev = () => {
    if (count >0 || count < 6) {
       setCount(count -1)
      setNxtBtnActive(true);
      setPrevBtnActive(true)
    }
   
  };

  // useEffect(() => {
  //   if (count === 5) {
  //     setNxtBtnActive(false);
  //     setPrevBtnActive(false)
  //   }
  //   if (count > 0) {
  //     setPrevBtnActive(true)
  //     setNxtBtnActive(true);
  //   }
  // }, [count]);


  const list = [
    <RCSContainer data={data.interActiceMockUserData[0]}></RCSContainer>,
    <RCPContainer data={data.interActiceMockUserData[1]}></RCPContainer>,
    <RHAContainer data={data.interActiceMockUserData[2]}></RHAContainer>,
    <RCIContainer data={data.interActiceMockUserData[3]}></RCIContainer>,
    <RGPTContainer data={data.interActiceMockUserData[4]}></RGPTContainer>,
    <RHAContainerSecond
      data={data.interActiceMockUserData[5]}
    ></RHAContainerSecond>,
  ];
  return (
    <div>
      <div>
        <div className="">{list[count]}</div>
      </div>
      <div className="w-full flex justify-end">
        <div className="flex gap-5">
          <button
            className={`${
              prevBtnActive ? "block" : "hidden"
            } px-5 text-[15px] text-white py-2 bg-tahiti rounded-md`}
            onClick={handlePrev}
          >
            Previous
          </button>

          <button
            className={`${
              nxtBtnActive ? "block" : "hidden"
            } px-5 text-[15px] text-white py-2 bg-tahiti rounded-md`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
