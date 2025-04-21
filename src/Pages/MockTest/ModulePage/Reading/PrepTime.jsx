import { Button } from "antd";
import React, { useState } from "react";

export default function PrepTime({ data, handleNextQuestion }) {
  const [evBtn, setEvBtn] = useState(true);
  const [loadings, setLoadings] = useState(false);

  const handleNext = () => {
    setLoadings(true);
    setEvBtn(false);
    setTimeout(() => {
      setLoadings(false);
      handleNextQuestion();
    }, 2000);
  };
  return (
    <div className="w-full font-poppins">
      <div className="w-full m-auto h-full ">
        <div className="m-auto text-center  flex-col justify-between">
          <h1 className="text-[25px] font-[700] mt-10">{data.sectionTitle}</h1>
          <p className="mt-[10rem] text-[20px]">{data.addiotionalData}</p>
        </div>
      </div>
      <div className="w-full justify-end flex mt-3 px-3 py-3">
        <Button
          style={{
            color: "white",
            border: "none",
            backgroundColor: "#3AB7BF",
            height: "3rem",
          }}
          loading={loadings}
          disabled={evBtn ? false : true}
          onClick={handleNext}
          className={`${
            evBtn ? "" : "disabled opacity-50"
          } px-5 text-[20px] py-[10px] text-white rounded-md`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
