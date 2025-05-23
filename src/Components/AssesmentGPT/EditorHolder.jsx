import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextEditor from "./TextEditor";

export const EditHolder = ({resultState}) => {
  const { feedbackloading, errorList, userInput } = useSelector(
    (state) => state.gptAssmentResult
  );

  const { errorListFollowUp, userInputFollowUp } = useSelector(
    (state) => state.gptAssmentResult
  );

  return (
    <div>
      {feedbackloading ? (
        <Skeleton active></Skeleton>
      ) : (
        <div>
        {
          resultState==2?  <TextEditor text={userInputFollowUp} grammarMistakes={errorListFollowUp}></TextEditor>: 
           <TextEditor text={userInput} grammarMistakes={errorList}></TextEditor>
        }
        </div>
      )}
    </div>
  );
};
