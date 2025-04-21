import React from "react";
import Lottie from "react-lottie";
import QuestionChangeLoading from "../Assets/animations/QuestionChangeLoading.json";

const QuestionChangeLoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: QuestionChangeLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-[40rem] m-auto h-[30rem] flex items-center justify-center">
      <Lottie options={defaultOptions} width={500} height={200} />
    </div>
  );
};

export default QuestionChangeLoadingScreen;
