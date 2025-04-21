import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function RSguideline() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Read and Select in Duolingo English Test. And how you do practice Read and Select in PracticeCompanions."
        />
        <title>
          Complete Guide for Read and Select in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/read-and-select`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Read and Select Duolingo"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Read and Select in Duolingo English Testsh Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Read and Select in Duolingo English Test. And how you do practice Read and Select in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Read and Select in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Read and Select in Duolingo English Test. And how you do practice Read and Select in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Read and Select in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Read and Select in Duolingo English Test. And how you do practice Read and Select in PracticeCompanions."
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
                  Complete Guide for Read and Select in Duolingo English Test
                </h1>
                <div className="mt-10">
                  <p>
                    The Duolingo English Test's "Read and Select" question
                    assesses your vocabulary. Since it is one of the test's most
                    often asked questions, it is an excellent one to learn!
                  </p>
                  <div className="ml-10 mt-5">
                    <ul className="list-disc space-y-1 ">
                      <li>This question will appear 4 to 6 times.</li>
                      <li>You will have to complete this task in 1 minutes.</li>
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
                    title="Read and Select Duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/read and select duolingo.png`}
                      alt="read and select duolingo"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks for Read and Select
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>
                        You should not select a word unless you are 100%
                        confident about it.
                      </li>
                      <li>Your selections will be highlighted in orange.</li>
                      <li>
                        To deselect a word, click the checkbox once more if you
                        have second thoughts.
                      </li>
                      <li>
                        Make sure you have checked your chosen terms twice
                        before pressing the NEXT button.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-10">
                    <h2 className="font-[600]">
                      How you will Practice and get Evaluation in **.
                    </h2>
                    <h2 className="mt-7 text-center md:ml-[-10rem]">
                      Practice question page
                    </h2>
                    <div className="mt-2">
                      <img
                        title="Read and Select Duolingo"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/duolingo/module/read and select.png`}
                        alt="read and select"
                      ></img>
                      <h2 className="mt-7  ">Practice question page</h2>
                      <img
                        title="Read and Select Duolingo"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl mt-2"
                        src={`${S3_BASE_URL}/duolingo/module/read and select evaluation.png`}
                        alt="read and select evaluation"
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
