import React from "react";
import MockAssmentContainer from "../MockAssmentContainer";

export default function WSContainer({ data }) {
  return (
    <div>
      <div>
        <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[1.5rem] font-[600] text-center">
          Respond to the question in at least 50 words
        </h1>
        <p
          className=" md:text-[18px] sm:text-[15px]
                  font-poppins font-[500] w-[50%] m-auto mt-10 "
        >
          {data.qData.qa.q}
        </p>
      </div>

      <div>
          <MockAssmentContainer
            ga={data.overAllResult.ga}
            gc={data.overAllResult.gc}
            ls={data.overAllResult.ls}
            ld={data.overAllResult.ld}
            sl={data.overAllResult.sl}
            tr={data.overAllResult.taskrelevance}
            overall={data.overAllResult.overall}
            sampleAns={data.sampleAns}
            fluencyCal={0}
            sentenceError={data.sentenceError}
            userInputSen={data.userAns}
          ></MockAssmentContainer>
        </div>
    </div>
  );
}
