import React from "react";
import Lottie from "react-lottie";
import QuestionChangeLoading from "../Assets/animations/F_Teacher_Speaking_Animation.json";

const FTeacherSpeakingAnimation = ({isStopped,width,height}) => {
  const defaultOptions = {
    loop: true,
    autoplay: false,
   
    animationData: QuestionChangeLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" m-auto flex items-center justify-center">
      <Lottie isStopped={isStopped} options={defaultOptions} width={width} height={height} />
    </div>
  );
};

export default FTeacherSpeakingAnimation;
