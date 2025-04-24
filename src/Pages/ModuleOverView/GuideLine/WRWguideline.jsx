import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function WRWguideline() {
  return (
    <>
      

      <Helmet>
      <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Read then Write in Duolingo English Test. And how you do practice Read then Write in PracticeCompanions."
        />
        <title>
        Complete Guide for Read then Write in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/read-then-write`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips, Complete Guide for Read then Write in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Read then Write in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Read then Write in Duolingo English Test. And how you do practice Read then Write in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Read then Write in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Read then Write in Duolingo English Test. And how you do practice Read then Write in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Read then Write in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Read then Write in Duolingo English Test. And how you do practice Read then Write in PracticeCompanions."
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
                  Complete Guide for Read then Write in Duolingo English Test
                </h1>
                <div className="mt-10">
                  <p>
                    This is likely one of the trickiest questions you will face
                    on the Duolingo English Test since it requires you to Read a
                    question and have to write it’s answer in great detail
                    without much preparation.
                  </p>
                  <div className="ml-10 mt-5">
                    <ul className="list-disc space-y-1 ">
                      <li> You must write your answer in five minutes.</li>
                      <li>
                        {" "}
                        You must write at least 50 words (but more is better).
                      </li>
                      <li>
                        It contributes to your production and literacy scores.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2>The “Read then Write” question type looks like this:</h2>
                  <div className="mt-5">
                    <img
                    title="duolingo rea then write"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/read_then_write_duolingo.png`}
                      alt="read then write duolingo.png"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks for Read then Write
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>Read the question carefully before answer.</li>
                      <li>
                        Spend 30 seconds to plan your answer before you start to
                        write.
                      </li>
                      <li>
                        Your response has to be directly related to the question
                        and topic.
                      </li>
                      <li>Write until you’ve typed at least 50 words.</li>
                      <li>
                        Proofread thoroughly! Click NEXT only after you’ve
                        double-checked your answer.
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
                          title="duolingo rea then write"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/Read_then_Write.png`}
                        alt="Read then Write"
                      ></img>
                      <h2 className="mt-5 font-[600]">Evaluation Page</h2>
                      <img
                          title="duolingo rea then write"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl mt-2"
                        src={`${S3_BASE_URL}/Read_then_write_Evaluation.png`}
                        alt="Read then Write Evaluation"
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
