import React from "react";
import MockAssmentContainer from "../MockAssmentContainer";

export default function SRSContainer({ data }) {
  return (
    <div>
      <div className="font-poppins text-[20px]">
        <h1 className="sm:text-[17px] md:text-[22px] md:block self-center font-poppins mt-[1.5rem] font-[600] text-center">
          Speak about the topic below for 90 seconds.
        </h1>
        <div className="h-auto w-full px-2 py-1 ">
          <div className="m-auto flex justify-center w-full">
            <div className="self-center  m-auto mt-5 ">
              <h1 className="font-poppins  text-start  md:text-[20px] md:mt-0 sm:mt-10 ">
                {data.qData?.qa?.q}
              </h1>
              <div className="  text-gray-700">
                <ul
                  className="flex flex-col  justify-center mt-2 list-disc ml-5
                                 md:text-[18px] sm:text-[15px] font-montserrat font-[400] "
                >
                  {data.qData?.qa?.qb.map((val, index) => {
                    return <li>{val}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
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
