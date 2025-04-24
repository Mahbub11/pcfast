import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function LIguideline() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for interactive listening. And how you do practice interactive listening in PracticeCompanions."
        />
        <title>
          Complete Guide for Interactive Listening in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/interactive-listening`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Complete Guide for Interactive Listening in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Interactive Listening in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for interactive listening. And how you do practice interactive listening in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Interactive Listening in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for interactive listening. And how you do practice interactive listening in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Interactive Listening in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for interactive listening. And how you do practice interactive listening in PracticeCompanions."
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>

      <div className="w-full h-full px-2 py-2">
        <div
          className="sm:w-[90%] md:w-[65%]
       m-auto mt-[2rem]  font-poppins text-justify text-[18px]"
        >
          <div className="md:ml-[3rem] ">
            <div>
              <div className="m-auto">
                <h1 className="sm:text-[25px] md:text-[40px] font-[700] text-start">
                  Complete Guide for Interactive Listening in Duolingo English
                  Test
                </h1>
                <div className="mt-10">
                  <p>
                    Interactive Listening is the newest part of the Duolingo
                    English Test. As it is new, it is hard to find practice
                    materials about it. It consists of two types of questions:
                    “Listen and Respond” and “Summarize the Conversation.
                  </p>
                  <div>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li> You will get this question once on the test.</li>
                      <li> You have 4 minutes for Listen and Respond.</li>
                      <li>
                        You have 75 seconds for Summarize the Conversation.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2>
                    “Interactive Listening” question type looks like this:
                  </h2>
                  <div className="mt-5">
                    <img
                    title="Interactive Listening"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/interactive_listening_duolingo.png`}
                      alt="interactive listening duolingo"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px]">
                      Tips & Tricks for Listen and Respond
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li> Read the scenario carefully. </li>
                      <li>
                        {" "}
                        Don’t spend more than 30 seconds reading the scenario as
                        you will not get additional time for it.
                      </li>
                      <li>
                        As there will be multiple options that seems correct so
                        choose your answer carefully.
                      </li>
                      <li>
                        {" "}
                        Listen carefully as you can listen to each audio clip
                        only one time.
                      </li>
                      <li>
                        If you get a question wrong, be sure to read the correct
                        answer.
                      </li>
                      <li>
                        Before clicking “Next”, you should reread the scenario
                        and conversation for next question.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-10">
                    <h2 className="font-[600]">
                      How you will Practice and get Evaluation in our
                      PracticeCompanions.
                    </h2>
                    <p className="font-[500] mt-5">
                      Practice question page look like this,
                    </p>
                    <div className="mt-5">
                      <img
                       title="Interactive Listening"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/listen_and_respond_senario.png`}
                        alt="	
                      listen and respond senario"
                      ></img>

                      <img
                       title="Interactive Listening"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl mt-5"
                        src={`${S3_BASE_URL}/listen_and_respond1.png`}
                        alt="Listen and respond"
                      ></img>

                      <img
                       title="Interactive Listening"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl mt-5"
                        src={`${S3_BASE_URL}/listen_and_respond_2.png`}
                        alt="Listen and respond"
                      ></img>
                    </div>

                    <div className="mt-5">
                      <h2 className="font-[700] text-[27px]">
                        Summarize the Conversation
                      </h2>
                      <img
                       title="Interactive Listening"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center  mt-5"
                        src={`${S3_BASE_URL}/duolingo/module/summarize-the-conversation-duolingo-english-test.png`}
                        alt="Listen and respond"
                      ></img>

                      <div className="mt-5">
                        <h2 className="font-[700] text-[30px] text-start">
                          Tips & Tricks for Summarize the Conversation
                        </h2>
                        <ul className="ml-10 list-disc space-y-1  mt-5">
                          <li> Cover full conversation in summary. </li>
                          <li>
                            Save approximately 20 seconds to proofread your
                            response and look for obvious errors like typos and
                            misspellings.
                          </li>
                        </ul>
                      </div>

                      <div className="mt-10">
                        <h2 className="font-[700] text-[18px]">
                          Practice Question Page
                        </h2>
                        <img
                         title="Interactive Listening"
                          className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl mt-5"
                          src={`${S3_BASE_URL}/summary_of_conversation.png`}
                          alt="summary of conversation"
                        ></img>

                        <h2 className="mt-5 font-[600]">Evaluation Page</h2>
                        <img
                         title="Interactive Listening"
                          className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl mt-2"
                          src={`${S3_BASE_URL}/summary_evaluation.png`}
                          alt="summary evaluation"
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
