import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextEditor from "./TextEditor";

export const EditHolder = () => {
  const [text, setText] = useState(null);
  const [error, setErrorList] = useState("");
  const { feedbackloading, errorList, userInput } = useSelector(
    (state) => state.gptAssmentResult
  );

  useEffect(() => {
    if (errorList && !feedbackloading) {
      setErrorList(errorList);
      setText(userInput);
    }
  }, [feedbackloading, errorList]);

  return (
    <div>
      {feedbackloading ? (
        <Skeleton active></Skeleton>
      ) : (
        <div>
          <TextEditor text={userInput} grammarMistakes={errorList}></TextEditor>
        </div>
      )}
    </div>
  );
};
