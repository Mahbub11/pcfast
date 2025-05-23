import React, { useState, useMemo, useRef, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";
import IconCross from "../../Assets/SVG/IconCross";
import IconBxBrain from "../../Assets/SVG/IconBxBrain";
import IconCaretRight from "../../Assets/SVG/IconCaretRight";
import IconRightMark from "../../Assets/SVG/IconRightMark";

const TextEditor = ({ text, grammarMistakes }) => {
  const [selectedMistake, setSelectedMistake] = useState(null);
  const mistakeListRef = useRef(null); // Container for all mistakes

  const highlightedText = useMemo(() => {
    let processedText = text;
    grammarMistakes?.forEach((correction) => {
      const mistake = correction.mistake;
      const isSelected = selectedMistake === mistake;
      const classList = `correction ${isSelected ? "highlight" : ""}`;
      const regex = new RegExp(mistake, "g");
      processedText = processedText.replace(
        regex,
        `<span class="${classList}" style='background-color: ${
          isSelected ? "#93c5fd" : "#FF8080"
        }; border-radius: 2px; padding: 2px 4px; font-weight: bold; cursor: pointer;'>${mistake}</span>`
      );
    });
    return processedText;
  }, [text, grammarMistakes, selectedMistake]);

  function handlePassageClick(e) {
    if (e.target.classList.contains("correction")) {
      const clickedMistake = e.target.innerText;
      setSelectedMistake(clickedMistake);

      // Scroll to corresponding item in list
      const selectedItem = mistakeListRef.current?.querySelector(
        `.mistake-item[data-mistake="${clickedMistake}"]`
      );
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }

  function handleListClick(mistake) {
    setSelectedMistake(mistake);
  }

  return (
    <>
      <div className="sm:flex sm:flex-col md:flex md:flex-row gap-5 w-full h-[500px]">
        {/* Passage Section */}
        <div
          className="flex-1 p-4 overflow-y-auto border border-gray-200 rounded-md shadow-sm"
          onClick={handlePassageClick}
        >
          <p
            className="font-poppins text-[15px] leading-7"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          ></p>
        </div>

        {/* Mistake List */}
        <div
          ref={mistakeListRef}
          className="md:w-[40%] md:max-w-[400px] p-4 overflow-y-auto  rounded-md shadow-sm bg-white md:block sm:w-full sm:flex sm:gap-2"
        >
          {grammarMistakes?.length < 1 ? (
            <div>
              <h2 className="font-poppins font-[700]">
                <CheckOutlined style={{ color: "green" }} /> Great! No Error
                Found
              </h2>
            </div>
          ) : (
            grammarMistakes.map((item, index) => (
              <div
                key={index}
                data-mistake={item.mistake}
                onClick={() => handleListClick(item.mistake)}
                className={`mistake-item px-3 py-2 mb-2 rounded-sm border cursor-pointer transition ${
                  item.mistake === selectedMistake
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="font-[700] text-red-600">
                  <div className="flex space-x-1 items-center">
                    <span className="font-[500] text-red-400 line-through">
                      {item.mistake}
                    </span>
                  </div>
                </div>
                <div className="font-[700] mt-2 text-blue-600">
                  <div className="flex justify-start space-x-1 items-center">
                    <IconBxBrain
                      height="16px"
                      width="16px"
                      stroke="#B22222"
                      stWidth="3px"
                    ></IconBxBrain>
                    <span className="font-[500] text-black">
                      {item.explanation}
                    </span>
                  </div>
                </div>
                <div className="font-[700] mt-2 text-green-600">
                  <div className="flex justify-start space-x-1 items-center">
                    <IconRightMark
                      height="16px"
                      width="16px"
                      stroke="#B22222"
                      stWidth="3px"
                    ></IconRightMark>
                    <span className="font-[500] text-black">
                      {item.correctText}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .highlight {
          background-color: #93c5fd !important;
        }
      `}</style>
    </>
  );
};

export default TextEditor;
