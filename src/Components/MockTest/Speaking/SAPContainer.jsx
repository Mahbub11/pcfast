import React from "react";
import MockAssmentContainer from "../MockAssmentContainer";

export default function SAPContainer({ data }) {
  return (
    <div>
      <div className="h-full w-full">
        <div>
          <h1 className="sm:text-[17px] md:text-[22px] md:block text-center font-poppins font-[600]">
          Speak about the image below for 90 seconds.
          </h1>
          <div
            className={`md:h-[13rem] md:w-[21rem] sm:h-[10rem] sm:w-[75%] self-center m-auto mt-5`}
          >
            <img
              loading="eager"
              className="h-full w-full rounded-md object-fill"
              src={`https://practicemania.s3.ap-south-1.amazonaws.com/duolingo/${data.image}`}
              alt={"write_about_the_photo"}
            ></img>
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
    </div>
  );
}
