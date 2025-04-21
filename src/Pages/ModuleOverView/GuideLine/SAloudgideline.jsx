import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function SAloudguideline() {
  return (
    <>
      
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Read Aloud in Duolingo English Test. And how you do practice Read Aloud in PracticeCompanions. "
        />
        <title>Complete Guide for Read Aloud in Duolingo English Test</title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/module/guideline/speak-aloud`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips, Complete Guide for Read Aloud in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Read Aloud in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Read Aloud in Duolingo English Test. And how you do practice Read Aloud in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Read Aloud in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Read Aloud in Duolingo English Test. And how you do practice Read Aloud in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Read Aloud in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Read Aloud in Duolingo English Test. And how you do practice Read Aloud in PracticeCompanions."
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
                  Complete Guide for Read Aloud in Duolingo English Test
                </h1>
                <div className="mt-10">
                  <p>
                    As the name suggests, participants will read aloud from a
                    prepared statement into the microphone.
                  </p>
                  <div className="ml-10 mt-3">
                    <ul className="list-disc">
                      <li>
                        {" "}
                        <span className="font-[600]">Time Limit:</span> 20
                        seconds
                      </li>
                      <li>
                        <span className="font-[600]">Subscores:</span>{" "}
                        Comprehension, Conversation
                      </li>
                    </ul>
                  </div>
                  <p className="mt-5">
                    In this section, a phrase will show on the screen; you have
                    to record yourself saying the phrase. Your communication
                    skills will be evaluated by this question.
                  </p>
                  <div className="ml-10 mt-5">
                    <ul className="list-disc space-y-1 ">
                      <li> This question will appear 3-7 times.</li>
                      <li>
                        {" "}
                        You will have to complete this task in 20 seconds.
                      </li>
                      <li>
                        You will then speak for 30 – 90 seconds on the topic.
                      </li>
                      <li>Speak for as long as possible.</li>
                      <li>
                        It contributes to your production and literacy
                        subscores.
                      </li>
                      <li>
                        It contributes to your production and conversation
                        subscores.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-7">
                  <h2>The “Read Aloud” question type looks like this:</h2>
                  <div className="mt-5">
                    <img
                    title="read aloud duolngo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center"
                      src={`${S3_BASE_URL}/duolingo/module/read aloud duolingo.png`}
                      alt="read aloud duolingo"
                    ></img>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-[700] text-[30px] text-start">
                      Tips & Tricks Read Aloud
                    </h2>
                    <ul className="ml-10 list-disc space-y-1  mt-5">
                      <li>
                        Read it aloud to yourself in silence for the first few
                        seconds.
                      </li>
                      <li>Read the prompt slowly.</li>
                      <li>
                        Make use of punctuation to help you decide when to stop.
                      </li>
                      <li>
                        You have only twenty seconds, so keep an eye on the
                        clock.
                      </li>
                      <li>
                        Read the prompt exactly as provided. Don't change, add,
                        or remove any words.
                      </li>
                      <li>
                        Do not forget that certain words are stressed, including
                        nouns, adverbs, adjectives, and main verbs.
                      </li>
                      <li>
                        Pronouns, articles, prepositions, and conjunctions are
                        examples of function words that are not stressed.
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
                      title="read aloud duolngo"
                        className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                        src={`${S3_BASE_URL}/duolingo/module/Read Aloud.png`}
                        alt="Read Aloud"
                      ></img>
                      <h2 className="mt-5 font-[600]">Evaluation Page</h2>
                      <img
                      title="read aloud duolngo"
                        className="md:w-[80%] sm:w-[95%] mt-2 h-auto self-center border-[2px] border-header rounded-xl "
                        src={`${S3_BASE_URL}/duolingo/module/Read aloud evaluation.png`}
                        alt="Read aloud evaluation"
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
