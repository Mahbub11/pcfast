import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function SLguideline() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Listen then Speak in Duolingo English Test. And how you do practice Listen then Speak in PracticeCompanions."
        />
        <title>
          {" "}
          Complete Guide for Listen then Speak in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/listen-then-speak`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Complete Guide for Listen then Speak in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Listen then Speak in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Listen then Speak in Duolingo English Test. And how you do practice Listen then Speak in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Listen then Speak in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Listen then Speak in Duolingo English Test. And how you do practice Listen then Speak in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Listen then Speak in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Listen then Speak in Duolingo English Test. And how you do practice Listen then Speak in PracticeCompanions."
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
                  Complete Guide for Listen then Speak in Duolingo English Test
                </h1>
                <div className="mt-10">
                  <p>
                    Speak up in response to the questions. You have 30 seconds
                    to respond to the question. Complete each question
                    accurately because it will be recorded.
                  </p>
                  <div className="ml-10 mt-5">
                    <ul className="list-disc space-y-1 ">
                      <li> The question will show up twice.</li>
                      <li> You have 20 seconds to mentally get ready.</li>
                      <li>
                        After that, you will discuss the subject for 90 seconds.
                      </li>
                      <li> Speak for as long as you can.</li>
                      <li>You can replay the question up to 3x</li>
                      <li>
                        <span className="font-[600]">Topics:</span> travel,
                        food, your past, culture, hobby, etc.
                      </li>
                      <li>
                        Your production and conversation subscores benefit from
                        it.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-[600]">
                    Prompts for "Listen then Speak" questions will fall into one
                    of three categories:
                  </p>
                  <div className="ml-10 mt-5">
                    <ul className="list-disc space-y-1 ">
                      <li> Explanatory - describe something in detail</li>
                      <li> Informative - educate the listener on a topic</li>
                      <li>
                        Argumentative - express your opinion on a subject and
                        include reasons to support it
                      </li>
                    </ul>
                  </div>
                  <p className="mt-5">
                    Your job is to pretend that the person you are talking to
                    knows nothing about the topic at hand! Then you'll need to
                    teach them all about that topic and/or explain what and why
                    you believe what you do, providing as much detail as
                    possible.{" "}
                  </p>
                </div>

                <div className="mt-7">
                  <h2>“Listen then Speak” question type looks like this:</h2>
                  <div className="mt-5">
                    <img
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/listen then speak.png`}
                      alt="listen then speak"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks for Listen then Speak
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>Check your microphone before start speak.</li>
                      <li>
                        {" "}
                        Make sure you understand the topic as you have 20
                        seconds to prepare your answer.
                      </li>
                      <li>If you make a mistake, don’t stop keep speaking.</li>
                      <li>Speak for the entire 90 seconds.</li>
                      <li>If you make a mistake, don’t stop keep speaking.</li>
                      <li>Speak for the entire 90 seconds.</li>
                      <li>
                        Your response has to be directly related to the topic.
                      </li>
                      <li>Speak slowly, clearly and loudly.</li>
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
                      title="Listen then Speak Duolingo"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/duolingo/module/Listen then Speak.png`}
                        alt="Listen then Speak"
                      ></img>
                      <h2 className="mt-5 font-[600]">Evaluation Page</h2>
                      <img
                        title="Listen then Speak Duolingo"
                        className="md:w-[80%] mt-2 sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl "
                        src={`${S3_BASE_URL}/duolingo/module/Listen then Speak evalation.png`}
                        alt="Listen then Speak evalation"
                      ></img>
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
