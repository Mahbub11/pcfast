import React from "react";
import IconConversationBot from "../../../Assets/SVG/IconConversationBot";
import ConversationBody from "./ConversationBody";
import MockConversationAssmentContainer from "../MockConversationAssmentContainer";

export default function LLIContainer({ data }) {
  return (
    <div className="font-poppins text-[17px]">
      <div>
        <h2 className="text-[20px] text-center font-[600]">
          Interactive Listenintg
        </h2>
        <p className="font-poppins font-[400] mt-5 w-[80%] m-auto">
          {data.assesment.qData.title}
        </p>
      </div>

      <div className="flex justify-between gap-5 mt-5 h-[30rem] bg-gray-100/20">
        <div className="w-[20%] self-center">
          <IconConversationBot
            height="20rem"
            width="20rem"
          ></IconConversationBot>
        </div>

        <div
          id="journal-scroll"
          className="w-[70%] overflow-y-scroll text-[13px] drop-shadow-sm"
        >
          {data.conversationResult.map((val, i) => {
            return <ConversationBody key={i} data={val}></ConversationBody>;
          })}
        </div>
      </div>

      <div className="bg-gray-50 rounded-sm">
        <MockConversationAssmentContainer
          sampleAns={data.assesment.sampleAns}
          userSumamryInput={data.assesment.userSumamryInput}
          correctConversation={data.assesment.correctConversation}
          totalQ={data.assesment.totalQ}
          qData={data.assesment.qData}
        ></MockConversationAssmentContainer>
      </div>
    </div>
  );
}
