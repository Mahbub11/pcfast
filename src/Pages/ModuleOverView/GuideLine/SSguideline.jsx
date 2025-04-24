import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function SSguideline() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Speaking Sample in Duolingo English Test. And how you do practice Speaking Sample in PracticeCompanions."
        />
        <title>
          Complete Guide for Speaking Sample in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/speaking-sample`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Complete Guide for Speaking Sample in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Speaking Sample in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Speaking Sample in Duolingo English Test. And how you do practice Speaking Sample in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Speaking Sample in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Speaking Sample in Duolingo English Test. And how you do practice Speaking Sample in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Speaking Sample in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Speaking Sample in Duolingo English Test. And how you do practice Speaking Sample in PracticeCompanions."
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
                  Complete Guide for Speaking Sample in Duolingo English Test
                </h1>
                <div className="mt-10">
                  <p>
                    <span className="font-[600]">
                      {" "}
                      You must choose one of the two prompts shown on the screen
                      to complete the Speaking Sample section of the ungraded
                      portion of the Duolingo English Test.
                    </span>
                    <br></br> <br></br>
                    You must read, evaluate, and choose one of the two options
                    provided since the instructions will display for 30 seconds
                    before the recording begins.
                  </p>
                </div>

                <div className="mt-7">
                  <h2>“Speaking Sample” question type looks like this:</h2>
                  <div className="mt-5">
                    <img
                    title="Speaking Sample Duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/speaking-sample-duolingo-english-test.png`}
                      alt="speaking-sample-duolingo-english-test"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks for Speaking Sample
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>Read the question carefully before speak.</li>
                      <li> Check your microphone before start speak. </li>
                      <li>
                        Spend 30 seconds to plan your answer before you start to
                        write.
                      </li>
                      <li>
                        Your response has to be directly related to the question
                        and topic.
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
                        title="Speaking Sample Duolingo"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/speaking_sample.png`}
                        alt="speaking sample"
                      ></img>
                      <h2 className="mt-5 font-[600]">Evaluation Page</h2>
                      <img
                        title="Speaking Sample Duolingo"
                        className="md:w-[80%] mt-2 sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl "
                        src={`${S3_BASE_URL}/speaking_sample_evalation.png`}
                        alt="speaking sample evalation"
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
