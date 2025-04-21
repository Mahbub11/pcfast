import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function LTguideline() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Listen and Type in Duolingo English Test. And how you do practice Listen and Type in PracticeCompanions."
        />
        <title>
          Complete Guide for Listen and Type in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/rs`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Complete Guide for Listen and Type in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Listen and Type in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Listen and Type in Duolingo English Test. And how you do practice Listen and Type in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Listen and Type in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Listen and Type in Duolingo English Test. And how you do practice Listen and Type in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Listen and Type in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Listen and Type in Duolingo English Test. And how you do practice Listen and Type in PracticeCompanions."
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
                  Complete Guide for Listen and Type in Duolingo English Test
                </h1>
                <div className="mt-10">
                  <p>
                    The challenging part with this “Listen and Type” question is
                    that you can only listen to the statement 3 times. Later in
                    the post, we will see how you can maximize each listen and
                    get the right answer.
                  </p>
                  <div>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>This question will appear 4- 6 times.</li>
                      <li> You can only listen to the statement 3 times.</li>
                      <li>
                        You will have to complete this task in 60 seconds.
                      </li>
                      <li>
                        It contributes towards your Comprehension and
                        Conversation subscores.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2>“Listen then Type” question type looks like this:</h2>
                  <div className="mt-5">
                    <img
                    title="Listen Then Type Duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/listen and type duolingo.png`}
                      alt="listen and type duolingo"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks for Listen then type
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li> Write down whatever you hear to start.</li>
                      <li>
                        {" "}
                        Compare your feelings with what you wrote after that by
                        reading the passage again.
                      </li>
                      <li>
                        By selecting the orange speaker button, you can play the
                        message up to twice (for a total of three times).
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
                         title="Listen Then Type Duolingo"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/duolingo/module/Listen and type.png`}
                        alt="Listen and type"
                      ></img>
                      <h2 className="mt-5 font-[600]">Evaluation Page</h2>
                      <img
                         title="Listen Then Type Duolingo"
                        className="md:w-[80%] mt-2 sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl "
                        src={`${S3_BASE_URL}/duolingo/module/Listen and type evaluation.png`}
                        alt="Listen and type evaluation"
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
