import React from "react";
import Lottie from "react-lottie";
import QuestionChangeLoading from "../Assets/animations/Speaker_Animation.json";

const  SpeakerAnimation= ({isStopped,width,height,lp,ap}) => {
  const defaultOptions = {
    loop: lp,
    autoplay: ap,
   
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

export default SpeakerAnimation;
