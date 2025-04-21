import React from "react";
import MockAssmentContainer from "../MockAssmentContainer";
import IconConversationSpeaker from "../../../Assets/SVG/IconConversationSpeaker";

export default function SLSContainer({ data }) {
  return (
    <div>
      <div className="font-poppins text-[20px]">
        <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[1.5rem] font-[600] text-center">
          Speak about the topic below for 90 seconds.
        </h1>
        <h2 className="mt-10 w-[50%] m-auto text-start flex gap-3">
          <IconConversationSpeaker  height='4rem' width='4rem'></IconConversationSpeaker>
          <p className="mt-1">{data.qData.qa.q}</p>
        </h2>
      </div>

      <div>
      <MockAssmentContainer
            ga={data.overAllResult.ga}
            gc={data.overAllResult.gc}
            ls={data.overAllResult.ls}
            ld={data.overAllResult.ld}
            sl={0}
            tr={data.overAllResult.taskrelevance}
            overall={data.overAllResult.overall}
            sampleAns={data.sampleAns}
            fluencyCal={data.overAllResult.result}
            sentenceError={data.sentenceError}
            userInputSen={data.userAns}
            fluency={true}
          ></MockAssmentContainer>
      </div>
    </div>
  );
}
