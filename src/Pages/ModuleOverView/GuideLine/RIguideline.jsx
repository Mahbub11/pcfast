import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function RIguideline() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Interactive Reading in Duolingo English Test. And how you do practice Interactive Reading in PracticeCompanions."
        />
        <title>
          Complete Guide for Interactive Reading in Duolingo English Test
        </title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/interactive-reading`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Interactice Reading Duolingo"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Interactive Reading in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Interactive Reading in Duolingo English Test. And how you do practice Interactive Reading in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Interactive Reading in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Interactive Reading in Duolingo English Test. And how you do practice Interactive Reading in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Interactive Reading in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Interactive Reading in Duolingo English Test. And how you do practice Interactive Reading in PracticeCompanions."
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
                  Complete Guide for Interactive Reading in Duolingo English
                  Test
                </h1>
                <div className="mt-10">
                  <p>
                    The “Interactive Reading” section was added to the Duolingo
                    English Test in 2022. This part of the test is more
                    complicated than the other parts, so it is important to
                    understand how it works. This section consists of 6
                    questions that all relate to the same passage.
                  </p>
                  <div className="ml-10 mt-5">
                    <ul className="list-disc space-y-1 ">
                      <li> This question will appear once.</li>
                      <li>
                        {" "}
                        You have 7 or 8 minutes to answer all 6 questions.
                      </li>
                    </ul>
                  </div>
                  <div className=" mt-5">
                    <h2 className="font-[600]">
                      There are 5 types of questions in the “Interactive
                      Reading” section.
                    </h2>
                    <ul className="mt-3 ml-6 space-y-1 ">
                      <li> 1. Complete the Sentences</li>
                      <li> 2. Complete the Passage</li>
                      <li> 3. Highlight the Answer (appears 2 times)</li>
                      <li> 4. Identify the Idea</li>
                      <li> 5. Title the Passage</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2 className="font-[600] text-[22px]">
                    Complete the Sentence
                  </h2>
                  <p>In this question, you need to select the missing words.</p>
                  <div className="mt-5">
                    <img
                    title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/complete the sentence duolingo.png`}
                      alt="complete the sentence duolingo"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px]">
                      Tips & Tricks for Complete the Sentence
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>Read the entire passage first.</li>
                      <li>If you can’t figure out a missing word, skip it!</li>
                      <li>
                        Proofread thoroughly! Click NEXT only after you’ve
                        double-checked your answer.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2 className="font-[600] text-[22px]">
                    Complete the Passage
                  </h2>
                  <p>
                    In this question, you will be asked to pick the missing
                    sentence.
                  </p>
                  <div className="mt-5">
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/complete-the-passage-duolingo-english-test.png`}
                      alt="complete-the-passage-duolingo-english-test"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks for Complete the Passage
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>Read the entire passage first.</li>
                      <li>
                        Pay attention to the sentences immediately before and
                        after the missing part.
                      </li>
                      <li>Read each of the options carefully.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2 className="font-[600] text-[22px]">
                    Highlight the answer
                  </h2>
                  <p>
                    This question appears 2 times in each set of “Interactive
                    Reading” questions.
                  </p>
                  <div className="mt-5">
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/highlight-the-answer-duolingo-english-test.png`}
                      alt="highlight-the-answer-duolingo-english-test"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px]">
                      Tips & Tricks for Highlight the answer
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>
                        Select only the portion that answers the question.{" "}
                      </li>
                      <li>Highlight again if you make a mistake.</li>
                      <li>
                        Look for common words between the question and the
                        answer.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2 className="font-[600] text-[22px]">Identify the Idea</h2>
                  <p>
                    In this question, you are asked to find the main idea of the
                    passage.
                  </p>
                  <div className="mt-5">
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/identify-the-idea-duolingo-english-test.png`}
                      alt="identify-the-idea-duolingo-english-test"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px]">
                      Tips & Tricks for Identify the Idea
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li> Read all the options first. </li>
                      <li>
                        {" "}
                        As there will be multiple options that seems correct so
                        choose your answer carefully.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2 className="font-[600] text-[22px]">Title the Passage</h2>
                  <p>
                    This question is similar to “Identify the Idea” because both
                    questions test your understanding of the passage as a whole.
                  </p>
                  <div className="mt-5">
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/title-the-passage-duolingo-english-test.png`}
                      alt="title-the-passage-duolingo-english-test"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[600] font-[700] text-[30px]">
                      Tips & Tricks for Title the Passage
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li> Read all the options first. </li>
                      <li>
                        {" "}
                        As there will be multiple options that seems correct so
                        choose your answer carefully.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="font-[600]">
                    How you will get question when practicing on
                    PracticeCompanions
                  </h2>

                  <div className="mt-10">
                    <h2 className="font-[600] text-[22px]">
                      Complete the Sentence
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/complete the sentence.png`}
                      alt="complete the sentence.png"
                    ></img>
                    <h2 className="mt-5 font-[600] text-[22px]">
                      Evaluation page
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/complete the sentence evaluation.png`}
                      alt="complete the sentence evaluation"
                    ></img>
                  </div>

                  <div className="mt-10">
                    <h2 className="font-[600] text-[22px]">
                      Complete the Passage
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/complete the passage.png`}
                      alt="complete the passage"
                    ></img>
                    <h2 className="mt-5 font-[600] text-[22px]">
                      Evaluation page
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] mt-5 sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/complete the passage evaluation.png`}
                      alt="complete the passage evaluation"
                    ></img>
                  </div>

                  <div className="mt-10">
                    <h2 className="font-[600] text-[22px] ">
                      Highlight the answer
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/Highlight the Answer.png`}
                      alt="Highlight the Answer"
                    ></img>
                    <h2 className="mt-5 font-[600] text-[22px]">
                      Evaluation page
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/Highlight the Answer evaluation.png`}
                      alt="Highlight the Answer evaluation"
                    ></img>
                  </div>

                  <div className="mt-10">
                    <h2 className="font-[600] text-[22px]">
                      Identify the Idea
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/identify the idea.png`}
                      alt="identify the idea"
                    ></img>
                    <h2 className="mt-5 font-[600] text-[22px]">
                      Evaluation page
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/identify the idea evaluation.png`}
                      alt="identify the idea evaluation"
                    ></img>
                  </div>

                  <div className="mt-10">
                    <h2 className="font-[600] text-[22px]">
                      Title the Passage
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/give the passage title.png`}
                      alt="give the passage title"
                    ></img>
                    <h2 className="mt-5 font-[600] text-[22px]">
                      Evaluation page
                    </h2>
                    <img
                     title="interactive reading duolingo"
                      className="md:w-[80%] sm:w-[95%] mt-5 h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/duolingo/module/give passage title evaluation.png`}
                      alt="give passage title evaluation.png"
                    ></img>
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
