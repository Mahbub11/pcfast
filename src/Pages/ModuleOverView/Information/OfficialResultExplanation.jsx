import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function OfficialResultExplanation() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Grand Score: How Duolingo English Test Report Results"
        />
        <title>Duolingo sub-score</title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/scoring/explanation`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Duolingo sub-score"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta property="og:title" content="Duolingo sub-score" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Grand Score: How Duolingo English Test Report Results"
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta name="twitter:title" content="Duolingo sub-score" />
        <meta
          name="twitter:description"
          content="Grand Score: How Duolingo English Test Report Results"
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta name="facebook:title" content="Duolingo sub-score" />
        <meta
          name="facebook:description"
          content="Grand Score: How Duolingo English Test Report Results"
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>

      <div className="h-full w-full  leading-9">
        <div className="md:w-[65%] sm:w-full px-2 py-2 h-auto  m-auto">
          <div className=" px-2 py-2 w-full h-auto font-poppins text-[18px]">
            <div>
              <h1 className="text-[35px] font-[600] font-poppinsBold leading-10">
                Grand Score: How Duolingo English Test Report Results with
                Explanation
              </h1>
              <p className="mt-10">
                In this articles, we will breakdown an example Duolingo English
                Test score card, explain how the total score and subscores are
                calculated, and provide ideas on how to make the most of this
                information as you get ready for the test.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-[25px] font-[700]">
                Duolingo English Test Certificate Sample
              </h2>
              <div className="mt-5 px-2 py-2">
                <img
                  title="Cirtificate Sample Duolingo"
                  className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-yellow-300 rounded-md"
                  src={`${S3_BASE_URL}/duolingo/module/certificate sample duolingo.png`}
                  alt="certificate sample duolingo"
                ></img>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-[25px] font-[700]">
                The Duolingo English Test Subscores
              </h2>
              <div className="mt-5">
                <img
                  title="cerificate subscore explain duolingo"
                  className="md:w-[80%] sm:w-[95%] h-auto self-center  px-2 py-2"
                  src={`${S3_BASE_URL}/duolingo/module/cerificate subscore explain duolingo.png`}
                  alt="cerificate subscore explain duolingo"
                ></img>
              </div>
            </div>

            <div className="mt-[3rem]">
              <h2>
                The <span className="font-[700]">"Literacy"</span> subscore
                combines scores from{" "}
                <span className="font-[700]">"Reading"</span>
                and <span className="font-[700]">"Writing"</span>
                questions.
              </h2>
              <div className="mt-5">
                <h2 className="font-[600]">
                  Questions on the "Literacy" Subscore include:
                </h2>
                <ul className="list-disc space-y-1 ml-10">
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/read-and-complete`}
                      target="self"
                    >
                      Read and Complete
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/rs`}
                      target="self"
                    >
                      Read and Select
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/listen-then-type`}
                      target="self"
                    >
                      Listen and Type
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/wrw`}
                      target="self"
                    >
                      Read, Then Write
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/ri`}
                      target="self"
                    >
                      Interactive Reading
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/ws`}
                      target="self"
                    >
                      Writing Sample
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/wp`}
                      target="self"
                    >
                      Write About the Photo
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/*  */}
            <div className="mt-[3rem]">
              <h2>
                The <span className="font-[700]">"Comprehension"</span> subscore
                is composed of
                <span className="font-[700]"> "Reading"</span> and{" "}
                <span className="font-[700]">"Listening"</span> questions.
              </h2>
              <div className="mt-5">
                <h2 className="font-[600]">
                  Questions on the "Comprehension" Subscore include:
                </h2>
                <ul className=" list-disc space-y-1 ml-10">
                  <li className="underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/rc`}
                      target="self"
                    >
                      Read and Complete
                    </a>
                  </li>
                  <li className="underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/read-and-select`}
                      target="self"
                    >
                      Read and Select
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/lt`}
                      target="self"
                    >
                      Listen and Type
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/speak-aloud`}
                      target="self"
                    >
                      Read Aloud
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/interactive-reading`}
                      target="self"
                    >
                      Interactive Reading
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/interactive-listening`}
                      target="self"
                    >
                      Interactive Listening
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/*  */}
            <div className="mt-[3rem]">
              <h2>
                The<span className="font-[700]"> "Conversation" </span>subscore
                combines score from{" "}
                <span className="font-[700]">"Speaking"</span> and
                <span className="font-[700]">"Listening"</span> questions.
              </h2>
              <div className="mt-5">
                <h2 className="font-[600]">
                  Questions on the "Conversation" Subscore include:
                </h2>
                <ul className="list-disc space-y-1 ml-10">
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/speak-aloud`}
                      target="self"
                    >
                      Read Aloud
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/sa`}
                      target="self"
                    >
                      Read, Then Speak
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/listen-then-type`}
                      target="self"
                    >
                      Listen and Type
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/sl`}
                      target="self"
                    >
                      Listen, Then Speak
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/ri`}
                      target="self"
                    >
                      Interactive Reading
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/sp`}
                      target="self"
                    >
                      Speak About the Photo
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/interactive-listening`}
                      target="self"
                    >
                      Interactive Listening
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/ss`}
                      target="self"
                    >
                      Speaking Sample
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2>
                Finally, <span className="font-[700]">"Production"</span>{" "}
                subscores are composed of{" "}
                <span className="font-[700]">"Writing"</span>
                and <span className="font-[700]">"Speaking"</span> questions.
              </h2>
              <div className="mt-5">
                <h2 className="font-[600]">
                  Questions on the "Production" Subscore include:
                </h2>
                <ul className="list-disc space-y-1 ml-10">
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/read-then-write`}
                      target="self"
                    >
                      Read, Then Write
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/speak-aloud`}
                      target="self"
                    >
                      Read Aloud
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/read-then-speak`}
                      target="self"
                    >
                      Read, Then Speak
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/lt`}
                      target="self"
                    >
                      Listen and Type
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/listen-then-speak`}
                      target="self"
                    >
                      Listen, Then Speak
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/interactive-reading`}
                      target="self"
                    >
                      Interactive Reading
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/speak-about-the-photo`}
                      target="self"
                    >
                      Speak About the Photo
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/write-about-the-photo`}
                      target="self"
                    >
                      Write About The Photo
                    </a>
                  </li>

                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/interactive-listening`}
                      target="self"
                    >
                      Interactive Listening
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/ss`}
                      target="self"
                    >
                      Speaking Sample
                    </a>
                  </li>
                  <li className=" underline text-blue-400 font-[600]">
                    {" "}
                    <a
                      href={`${LIVE_URL}duolingo/module/guideline/writing-sample`}
                      target="self"
                    >
                      Writing Sample
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
