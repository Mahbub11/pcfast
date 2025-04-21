import React from "react";
import MockTestOverviewSvg from "../../Assets/SVG/MockTestOverviewSvg";
import { Link } from "react-router-dom";
import MockOverviewSectionTwo from "../../Components/MockTest/MocTestOverview/MockOverviewSectionTwo";
import { Helmet } from "react-helmet-async";
import { LIVE_URL } from "../../config";
export default function MockTestOverView() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Complete Mock Tests For Duolingo With Realtime Feedback
        </title>
        <meta
          name="description"
          content="Receive immediate feedback on your Mock Test,
           including detailed explanations for correct answers and suggestions for improvement."
        />
        <link rel="canonical" href={`${LIVE_URL}duolingo/mock-test/overview`} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Duolingo Mock Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Mock Tests For Duolingo English Test With Realtime Feedback"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Receive immediate feedback on your Mock Test,
          including detailed explanations for correct answers and suggestions for improvement."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta name="twitter:title" content="Complete Mock Tests For Duolingo English Test With Realtime Feedback" />
        <meta
          name="twitter:description"
          content="Receive immediate feedback on your Mock Test,
          including detailed explanations for correct answers and suggestions for improvement."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta name="facebook:title" content="Complete Mock Tests For Duolingo English Test With Realtime Feedback" />
        <meta
          name="facebook:description"
          content="Receive immediate feedback on your Mock Test,
          including detailed explanations for correct answers and suggestions for improvement."
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>
      <div className="mt-[-2.5rem]">
        <div className="py-[6rem] w-full bg-[#EBEBEB] m-auto">
          <div class="flex h-full font-poppins text-[18px] md:mt-[2rem]">
            <div class="m-auto flex justify-between gap-10 w-[85%] ">
              <div className="sm:block md:hidden md:w-[60%]">
                <h1 className=" text-[30px] font-[700] font-poppinsBold">
                  Free & Complete{" "}
                  <span className="text-[#3AB7BF]">Mock Tests</span> For{" "}
                  <br></br> Duolingo English Test With
                  <span className="text-[#3AB7BF]"> Feedback</span>
                </h1>
                <p className="mt-3 text-[15px]">
                  Introducing Mock Tests on Our PracticeCompanions Site! We're
                  thrilled to announce the launch of our new Mock Test feature
                  on our practice site!
                </p>
                <h2 className="mt-3 text-[15px]">
                  You will get first 5 mock tests completely free with feedback.{" "}
                </h2>

                <div className="mt-5">
                  <Link
                    to={"duolingo/module/vocabulary"}
                    className="bg-[#3AB7BF] px-3 py-2 mt-5 text-[15px] 
              rounded-md text-white font-[700]"
                  >
                    Let's Practice Mock Test
                  </Link>
                </div>
              </div>

              <div className="sm:hidden md:block md:w-[60%]">
                <h2 className="text-justify  md:text-[35px] font-[700] font-poppinsBold">
                  Free & Complete{" "}
                  <span className="text-[#3AB7BF]">Mock Tests</span> For{" "}
                  <br></br> Duolingo English Test With
                  <span className="text-[#3AB7BF]"> Feedback</span>
                </h2>
                <p className="mt-3">
                  Introducing Mock Tests on Our PracticeCompanions Site! We're
                  thrilled to announce the launch of our new Mock Test feature
                  on our practice site!
                </p>
                <h2 className="mt-3">
                  You will get first 5 mock tests completely free with feedback.{" "}
                </h2>

                <div className="mt-5">
                  <Link
                    to={"duolingo/module/vocabulary"}
                    className="bg-[#3AB7BF] px-3 py-2 mt-5 text-[15px] 
              rounded-md text-white font-[700]"
                  >
                    Let's Practice Mock Test
                  </Link>
                </div>
              </div>

              <div className="w-[35%] flex justify-end  h-full sm:hidden md:block ">
                <span className="self-end h-full flex justify-end mt-[-5rem]">
                  <MockTestOverviewSvg
                    height="20rem"
                    width="20rem"
                  ></MockTestOverviewSvg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <MockOverviewSectionTwo></MockOverviewSectionTwo>
      </div>
    </>
  );
}
