import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function RCguideline() {
  return (
    <>
      

      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Read and Complete in Duolingo English Test. And how you do practice Read and Complete in PracticeCompanions."
        />
        <title>
          Complete Guide for Read and Complete in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/read-and-complete`}
        />
        <link rel="canonical" href={`${LIVE_URL}duolingo/module/guideline/read-and-complete`} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Read and Complete Duolingo"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Read and Complete in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Read and Complete in Duolingo English Test. And how you do practice Read and Complete in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content=" Complete Guide for Read and Complete in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Read and Complete in Duolingo English Test. And how you do practice Read and Complete in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content=" Complete Guide for Read and Complete in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Read and Complete in Duolingo English Test. And how you do practice Read and Complete in PracticeCompanions."
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>

      <div className="w-full h-full px-2 py-2">
        <div
          className="sm:w-[90%] md:w-[65%]
       m-auto mt-[2rem] font-poppins text-justify text-[18px]"
        >
          <div className="md:ml-[3rem] ">
            <div>
              <div className="m-auto">
                <h1 className="sm:text-[25px] md:text-[40px] font-[700] text-start">
                  Complete Guide for Read and Complete in Duolingo English Test
                </h1>
                <div className="mt-10">
                  <p>
                    This is likely one of the hardest questions you will face on
                    the Duolingo English Test since it requires you to fill up
                    the blank box with missing letters without much preparation.
                  </p>
                  <div className="ml-10 mt-5">
                    <ul className="list-disc space-y-1 ">
                      <li>This question will appear 4 to 6 times.</li>
                      <li>You will have to complete this task in 3 minutes.</li>
                      <li>
                        It contributes to your Literacy and Comprehension
                        subscores.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2>
                    The “Read and Complete” question type looks like this:
                  </h2>
                  <div className="mt-5">
                    <img
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/read and complete duolingo.png`}
                      alt="read and complete duolingo"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks for Read and Complete
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>
                        As you have enough time spend a good time trying to
                        identify the missing letters.
                      </li>
                      <li>
                        Read the title and passage very carefully before answer.
                      </li>
                      <li>
                        Read the text before focusing on each individual word.
                      </li>
                      <li>
                        If you can’t figure out a missing word, skip it! You can
                        come back later.
                      </li>
                      <li>
                        If you don't know the answer you should guess because it
                        can only help you.
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
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/duolingo/module/Read and Complete.png`}
                        alt="Read and Complete"
                      ></img>
                      <h2 className="mt-5 font-[600] text-[22px]">
                        {" "}
                        Evaluation Page
                      </h2>
                      <img
                        className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl "
                        src={`${S3_BASE_URL}/duolingo/module/Read and Complete Evaluation.png`}
                        alt="Read and Complete Evaluation"
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
