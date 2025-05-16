import React, { useState, useCallback } from "react";
import { Radio, Skeleton, Grid, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  SaveRCIInput,
  SaveRCIResult,
} from "../../redux/slices/readingInput";
import { getWordDetails } from "../../redux/slices/disctionary";
import { useParams } from "react-router-dom";
import "../../Components/Reading/RadioBtn.css";

const { useBreakpoint } = Grid;

export default function PracticePageRCI({ data, meaning = true }) {
  const [api, contextHolder] = notification.useNotification();
  const { md } = useBreakpoint();
  const dispatch = useDispatch();
  const { visibility } = useSelector((state) => state.fillgap);
  const { inputRCI } = useSelector((state) => state.readingInput);
  const [selectedOption, setSelectedOption] = useState(inputRCI || "");
  const { rid } = useParams();

  const handleMeaning = useCallback(
    (e) => {
      if (meaning) {
        dispatch(getWordDetails(e.target.textContent));
      }
    },
    [dispatch, meaning]
  );

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    dispatch(SaveRCIInput(value));

    const result = value === data.qa.a[0] ? 100 : 0;
    dispatch(SaveRCIResult({ result }));
  };

  const getOptionClass = (option) => {
    if (!visibility) {
      return selectedOption === option ? "bg-[#3ab6bf5f]" : "bg-white";
    }

    if (option === data.qa.a[0]) {
      return "bg-green-300";
    }

    if (option === selectedOption && option !== data.qa.a[0]) {
      return "bg-red-400";
    }

    return "bg-white";
  };

  if (!data) return <Skeleton active />;

  return (
    <div className="w-[99%] m-auto md:px-5 md:py-5">
      {contextHolder}
      <div className="flex flex-col gap-5 sm:px-2">
        {data.title && (
          <h1 className="text-center text-[20px] font-[500] font-poppins mt-8 underline">
            {data.title}
          </h1>
        )}

        <div className="mt-8 w-[98%] md:flex justify-between gap-2 m-auto py-2">
          {/* Passage Section */}
          <div className="md:w-[65%] sm:w-full rounded-md border border-[#3ab6bf5f]">
            <div className="border-b border-[#3ab6bf5f]">
              <h1 className="text-center font-poppins text-[20px]">Passage</h1>
            </div>
            <div className="px-5 py-4 text-justify font-[400] text-[18px] font-poppins leading-relaxed flex flex-wrap gap-1">
              {data.qa.q.split(" ").map((word, index) =>
                word === "*" ? (
                  <div key={index} className="w-full border-2 p-2">
                    {selectedOption?.split(" ").map((part, idx) => (
                      <span
                        key={idx}
                        className="cursor-pointer"
                        onClick={handleMeaning}
                      >
                        {" " + part}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span
                    key={index}
                    className="cursor-pointer hover:text-blue-500"
                    onClick={handleMeaning}
                  >
                    {word}{" "}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Options Section */}
          <div className="md:w-[35%] sm:w-[90%] m-auto font-poppins md:ml-5">
            <h2 className="text-[20px] font-[600] mb-3">
              Select the idea the passage describes:
            </h2>
            <Radio.Group
              value={selectedOption}
              onChange={(e) => handleOptionChange(e.target.value)}
            >
              <div className="flex flex-col gap-2">
                {data.qa.options.map((option, idx) => (
                  <Radio
                    key={idx}
                    value={option}
                    className={`rounded-md border-2 px-2 py-2  font-[400] ${getOptionClass(
                      option
                    )}`}
                    style={{ fontSize: "18px" }}
                  >
                    {option}
                  </Radio>
                ))}
              </div>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
