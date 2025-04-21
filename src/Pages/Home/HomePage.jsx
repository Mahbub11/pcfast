import React, { useEffect, useState } from "react";
import { SectionFive } from "../../Components/Home/SectionFive";
import { SectionFour } from "../../Components/Home/SectionFour";
import { SectionThree } from "../../Components/Home/SectionThree";
import IconHomeBannar from "../../Assets/SVG/IconHomeBannar";
import IconHomeBannarMobile from "../../Assets/SVG/IconHomeBannarMobile";
import { Link } from "react-router-dom";
import { SectionLatestArticals } from "../../Components/Home/SectionLatestArticals";
import { Helmet } from "react-helmet-async";
import PopUpinfoCollect from "../../Components/Feedback/PopUpinfoCollect";
import { LIVE_URL } from "../../config";
import { SectionAIEvaluation } from "../../Components/Home/SectionAIEvaluation";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          PracticeCompanions for Duolingo-Ielts English Test Preparation
        </title>
        <meta
          name="description"
          content="PracticeCompanions offers unlimited questions for various question types, real-time evaluation with sample answers, and the ability to track progress."
        />
        <link rel="canonical" href={LIVE_URL} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="PracticeCompanions for Duolingo IELTS Test Preperations"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="PracticeCompanions offers unlimited questions for various question types, real-time evaluation with sample answers, and the ability to track progress."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="PracticeCompanions for Duolingo-Ielts English Test Preparation"
        />
        <meta
          name="twitter:description"
          content="PracticeCompanions for Duolingo-IELTS Test Preperations"
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="PracticeCompanions for Duolingo-Ielts English Test Preparation"
        />
        <meta
          name="facebook:description"
          content="PracticeCompanions for Duolingo-IELTS Test Preperations"
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>

      <div className={`flex:col justify-center w-full overflow-hidden`}>
        <section className="w-full h-full sm:mt-[1rem]  m-1 md:mt-[10rem]">
          <div className="w-[90%] m-auto sm:hidden md:flex justify-around">
            <div className="w-[70%]">
              <div className="items-center m-auto px-2 w-[70%] tracking-wider">
                <h1 className="text-[40px] font-[700]">
                  <span className="text-[#3AB7BF]">AI </span>
                  Powered English{" "}
                  <span className="text-[#3AB7BF]">Proficiency</span> Test
                  <span className="text-[#3AB7BF]"> Platform!</span>
                </h1>
                <p className="mt-5 text-[20px] font-montserrat">
                  Boost your Duolingo English Test score with us and improve
                  fast. It's FREE to start, so let's practice today!
                </p>

                <div className="mt-5">
                  <Link
                    to={"duolingo/module/vocabulary"}
                    className="bg-[#3AB7BF] px-3 py-2 mt-5 text-[15px] 
              rounded-md text-white font-[700]"
                  >
                    Let's Practice
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-[50%] mt-[-5rem] drop-shadow-md">
              <IconHomeBannar height="30rem" width="30rem"></IconHomeBannar>
            </div>
          </div>

          <div className="m-auto sm:flex justify-center w-full md:hidden">
            <div
              className="w-full m-auto flex justify-center
           drop-shadow-sm mr-2 "
            >
              <IconHomeBannarMobile
                className=" m-auto opacity-50"
                height="auto"
                width="355px"
              ></IconHomeBannarMobile>
            </div>

            <div className="absolute  w-[80%] right-0 mt-5 flex flex-col justify-end items-end mr-5">
              <div className=" px-2 w-[75%] tracking-wider">
                <h2 className="text-[18px] font-[700]">
                  <span className="text-[#3AB7BF]">AI </span>
                  Powered English{" "}
                  <span className="text-[#3AB7BF]">Proficiency</span> Test
                  <span className="text-[#3AB7BF]"> Platform!</span>
                </h2>

                <div className="mt-10">
                  <Link
                    to={"duolingo/module/vocabulary"}
                    className="bg-[#3AB7BF] px-3 py-2 mt-5 text-[15px] rounded-md text-white font-[700] ml-1"
                  >
                    Let's Practice
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="h-[60%] mt-[15%] w-full  flex:col justify-center">
          <div className="flex:col justify-center w-full">
            <h2
              className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]"
            >
              Select Module to Practice
            </h2>
            <div className="w-full flex justify-center">
              <p
                className="mt-2 text-[20px] md:text-[22px] text-center sm:w-[90%] 
            sm:text-[16px] sm:font-[400] font-montserrat lg:w-[60%]"
              >
                You will get 2000+ questions in reading, writing, speaking and
                listening. Start from your selected module to raise proficiency
                module
              </p>
            </div>
          </div>

          <div className="sm:w-[90%] lg:w-[90%] flex sm:justify-around justify-center m-auto mt-[5%]">
            <div
              className="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-5
                  lg:gap-5 place-items-center"
            >
              <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
                <div className="sm:w-full md:w-[90%] m-auto  flex flex-col justify-start h-full bg-[#e0ebf8] rounded-md">
                  <div>
                    <h2 className="text-[30px] font-poppinsBold text-center mt-5 font-[600]">
                      Reading
                    </h2>
                  </div>

                  <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                    The Duolingo English Test integrates reading skills with
                    other abilities
                    <span className="sm:hidden md:block">
                      through Literacy and Comprehension subscores, requiring
                      reading and answering questions,...
                    </span>
                  </p>
                  <a
                    href="/duolingo/reading"
                    className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md py-2"
                  >
                    Read More...
                  </a>
                </div>

                <div className="sm:mt-5 md:mt-[1.5rem] m-auto w-min">
                  <Link
                    to={"/duolingo/module/reading"}
                    className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                  >
                    <h2>Practice</h2>
                  </Link>
                </div>
              </div>

              <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
                <div className="sm:w-full md:w-[90%] m-auto  flex flex-col justify-start h-full bg-[#e0ebf8] rounded-md">
                  <div>
                    <h2 className="text-[30px]  font-poppinsBold text-center mt-5 font-[600]">
                      Writing
                    </h2>
                  </div>

                  <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                    The Duolingo writing example questions have three subtasks.
                    <span className="sm:hidden md:block">
                      "Write About the Photo," "Read then Write," and "Writing
                      Sample" are some of them...
                    </span>
                  </p>
                  <a
                    href="/duolingo/writing"
                    className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md py-2 "
                  >
                    Read More...
                  </a>
                </div>

                <div className="sm:mt-5 md:mt-[2rem] m-auto w-min">
                  <Link
                    to={"/duolingo/module/writing"}
                    className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                  >
                    <h2>Practice</h2>
                  </Link>
                </div>
              </div>

              <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
                <div className="sm:w-full md:w-[90%] m-auto  flex flex-col justify-start h-full bg-[#e0ebf8] rounded-md ">
                  <div>
                    <h2 className="text-[30px]  font-poppinsBold text-center mt-5 font-[600]">
                      Speaking
                    </h2>
                  </div>

                  <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                    The Duolingo English Test (DET) consists of four main
                    categories
                    <span className="sm:hidden md:block">
                      each designed to evaluate a different aspect of speaking
                      English. There are four.....
                    </span>
                  </p>
                  <a
                    href="/duolingo/speaking"
                    className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md  py-2"
                  >
                    Read More...
                  </a>
                </div>

                <div className="sm:mt-5 md:mt-[2rem] m-auto w-min">
                  <Link
                    to={"/duolingo/module/speaking"}
                    className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                  >
                    <h2>Practice</h2>
                  </Link>
                </div>
              </div>

              <div className=" md:h-auto md:w-[18rem] sm:h-auto sm:w-auto rounded-md">
                <div className="sm:w-full md:w-[90%] m-auto  flex flex-col justify-start h-full bg-[#e0ebf8] rounded-md ">
                  <div>
                    <h2 className="text-[30px]  font-poppinsBold text-center mt-5 font-[600]">
                      Listening
                    </h2>
                  </div>

                  <p className="mt-2 px-5 font-montserrat text-justify text-ellipsis ">
                    The following question types will be utilized your listening
                    <span className="sm:hidden md:block">
                      comprehension during the less than hour- long Duolingo
                      English test.By click more you can read full
                    </span>
                  </p>
                  <a
                    href="/duolingo/listening"
                    className="cursor-pointer text-center mt-3 text-[18px] font-[500]
                    drop-shadow-md py-2"
                  >
                    Read More...
                  </a>
                </div>

                <div className="sm:mt-5 md:mt-[2rem] m-auto w-min">
                  <Link
                    to={"/duolingo/module/listening"}
                    className="flex justify-center px-5 py-2 rounded-md
                   font-[600] text-white m-auto bg-[#3AB7BF]"
                  >
                    <h2>Practice</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionAIEvaluation></SectionAIEvaluation>
        <SectionThree></SectionThree>
        <SectionFive></SectionFive>
        <SectionLatestArticals></SectionLatestArticals>
        <SectionFour></SectionFour>
        <PopUpinfoCollect></PopUpinfoCollect>
      </div>
    </>
  );
}
