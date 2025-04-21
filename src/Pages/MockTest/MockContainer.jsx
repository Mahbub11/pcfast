import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MockTestPage from "./MockTestPage";
import { Skeleton } from "antd";

export default function MockContainer() {
  const {
    mockData,
    firstSectionQuestions,
    secondSectionQuestions,
    thirdSectionQuestions,
    forthSectionQuestions,
    fifthSectionQuestions,
    mockTestUserAns,
  } = useSelector((state) => state.mockTest);

  // console.log(mockData);

  const [currentSection, setCurrentSection] = useState(firstSectionQuestions);
  let [current, setCurrent] = useState(0);
  const [busy, setBusy] = useState(true);
  

  useEffect(() => {
    if (current === 0) {
      setCurrentSection(firstSectionQuestions);
    } else if (current === 1) {
      setCurrentSection(secondSectionQuestions);
    } else if (current === 2) {
      setCurrentSection(thirdSectionQuestions);
    } else if (current === 3) {
      setCurrentSection(forthSectionQuestions);
    } else if (current === 4) {
      setCurrentSection(fifthSectionQuestions);
    }

    setBusy(false);
    // setCurrentSection(forthSectionQuestions);
  }, [current, currentSection]);

  const handleNextSection = () => {
    if (current <= 4) {
      setCurrent(++current);
    } else {
    }
  };

   console.log(mockTestUserAns);

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <MockTestPage
          handleNextSection={handleNextSection}
          currentSection={currentSection}
        ></MockTestPage>
      )}
    </div>
  );
}
