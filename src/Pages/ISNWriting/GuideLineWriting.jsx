import React from "react";
import IconWritingAvatar from "../../Assets/SVG/IconWritingAvatar";
import { Helmet } from "react-helmet-async";
import { LIVE_URL } from "../../config";

export default function GuideLineWriting() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will get suggestion and tips for Writing section, how you will get good score in Duolingo English Test."
        />
        <title>
          Suggestion and Tips for Writing Section in Duolingo English Test
        </title>
        <link rel="canonical" href={`${LIVE_URL}duolingo/tips/writing`} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Suggestion and Tips for Writing Section in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Suggestion and Tips for Writing Section in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will get suggestion and tips for Writing section, how you will get good score in Duolingo English Test."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Suggestion and Tips for Writing Section in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will get suggestion and tips for Writing section, how you will get good score in Duolingo English Test."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Suggestion and Tips for Writing Section in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will get suggestion and tips for Writing section, how you will get good score in Duolingo English Test."
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>

      <div className="h-full w-full  leading-9">
        <div className="md:w-[85%] sm:w-full px-2 py-2 h-auto  m-auto">
          <div className="bg-[#EBF1F9] px-2 py-2 w-full h-auto flex justify-around ">
            <div className="md:w-[55%] sm:w-full h-full m-auto ">
              <h1
                className="md:text-[40px] sm:text-[22px] font-poppins font-[900] text-[#3AB7BF] w-full h-full
            sm:text-center md:text-left md:leading-[3rem]"
              >
                Suggestion and Tips for Writing Section in Duolingo English Test
              </h1>
            </div>

            <div className="w-[35%] mr-[1.5rem] sm:hidden md:block ">
              <span className="self-end flex justify-end">
                <IconWritingAvatar
                  height="15rem"
                  width="15rem"
                ></IconWritingAvatar>
              </span>
            </div>
          </div>

          <div className="mt-5 h-auto w-full ml-1 text-[20px] font-montserrat text-justify sm:px-2">
            <div className="font-montserrat text-[20px] px-2">
              <h2 className="md:text-[25px] sm:text-[20px] font-[700] font-poppins underline">
                How to Prepare for Writing in Duolingo English Test
              </h2>
              <div className="mt-5">
                <h2 className="font-[600]">Write about the photo</h2>
                <p>Tips on describing an image in DET</p>

                <div className="mt-2 ml-5">
                  <ul className="list-disc">
                    <li>
                      {" "}
                      The first step is to begin the explanation with your
                      immediate assessment of the image.
                    </li>
                    <li>
                      {" "}
                      Next, describe the picture in more detail by stating a
                      line that highlights its key elements.
                    </li>
                    <li>
                      {" "}
                      It is necessary to focus on the backdrop and foreground.
                      Remember to explain the picture's dull or striking colors.
                    </li>
                    <li>
                      {" "}
                      Discuss the people's expressions in the image, focusing on
                      their happiness, exhilaration, or sadness.
                    </li>
                    <li>
                      Adjectives are used to describe specific aspects of an
                      object, person, or situation in an image, such as a
                      charismatic person, dense forest, gushing river, or
                      renowned actor.
                    </li>
                    <li>
                      Try your best to come up with at least three phrases with
                      proper use of punctuation.
                    </li>
                  </ul>
                </div>
              </div>
              {/*  */}
              <div className="mt-5">
                <h2 className="font-[600]">Read then write:</h2>

                <div className="mt-2 ml-5">
                  <ul className="list-disc">
                    <li>You must write your answer in five minutes.</li>
                    <li>
                      You must write at least 50 words (but more is better)
                    </li>
                    <li>
                      {" "}
                      It contributes to your production and literacy scores
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="font-[600]">Writing Sample:</h2>

                <div className="mt-2 ml-5">
                  <ul className="list-disc">
                    <li>You will get this question once on the test</li>
                    <li>You have 3 to 5 minutes to write your answer</li>
                    <li>
                      {" "}
                      You must write at least 50 words (but more is better)
                    </li>
                    <li>
                      It contributes towards your production and literacy
                      subscores
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/*  */}

            <div className="mt-10 font-montserrat text-[20px] ">
              <p className="md:text-[25px] sm:text-[20px] font-[700] font-poppins underline">
                How Can You Improve Your Writing Skills in English?
              </p>
              <div className="mt-2">
                <p>
                  Duolingo writing tips can assist a test taker in properly
                  preparing for the exam. Here are some of the best Duolingo
                  writing tips for students to use.
                </p>
              </div>

              <div className="mt-3 ml-2">
                <ul className="list-disc ml-3">
                  <li>
                    Begin reading high-quality English material. English
                    newspapers and publications, for example.{" "}
                  </li>
                  <li>
                    Learn the essay format and practice writing paragraph
                    essays.
                  </li>
                  <li>
                    {" "}
                    Solve practice papers to get a feel for the writing
                    questions on the exam.
                  </li>
                  <li>
                    In the examination, make grammatically correct statements.
                  </li>
                  <li>
                    ake sure you are not repeating words while taking the
                    writing test. Furthermore, if you have excellent language
                    skills, it is best to use high-level vocabulary.
                  </li>
                  <li>
                    While answering the questions, maintain a formal writing
                    style.
                  </li>
                  <li>
                    {" "}
                    Before answering, carefully read the question to ensure that
                    you understand it completely and that no important words are
                    missing.
                  </li>
                  <li>
                    {" "}
                    Writing can be time-consuming. As a result, practice the
                    sample papers thoroughly and learn to manage your time
                    effectively.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="h-5 mt-5"></hr>
        </div>
      </div>
    </>
  );
}
