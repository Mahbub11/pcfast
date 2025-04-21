import React from "react";
import IconBubble from "../../Assets/SVG/IconBubble";
import IconCaretRight from "../../Assets/SVG/IconCaretRight";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { BASE_URL, LIVE_URL } from "../../config";
import { Collapse } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import IconEmailOutline from "../../Assets/SVG/IconEmailOutline";
import IconInboxMessage from "../../Assets/SVG/IconInboxMessage";
import IconRightMark from "../../Assets/SVG/IconRightMark";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";



export default function PricingPage() {


  const {  userInfo } = useSelector((state) => state.auth);
  const handleCheckout = (id) => {
    axiosInstance
      .post(`${BASE_URL}api/v1/stripe/create-checkout-session`, {
        userEmail: userInfo.email,
        userId:userInfo.id,
        planId:id
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
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
        <link rel="canonical" href={`${LIVE_URL}duolingo/pricing`} />
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

      <div className="mt-10">
        <div className="font-poppins">
          <h1 className="font-lobster text-[40px] text-center text-midnight">
            Pricing & Plans
          </h1>
          <p className="font-montserrat text-center text-[20px] mt-5">
            Flexible and Affordable Plans for Every Budget – <br></br> Select
            the Right Plan and Start Today
          </p>

          <div className="md:w-[90%] lg:w-[70%] m-auto flex justify-center mt-10">
            <div className="w-full flex justify-center  flex-wrap gap-10 ">
              <div
                className="mt-10 py-[3.5rem] w-[20rem] bg-white border-2 border-tahiti rounded-md
          drop-shadow-sm transform 
          transition duration-1000  hover:scale-105 shadow-md cursor-pointer"
              >
                <div
                  className="m-auto w-full flex justify-center mt-[-4.7rem]
           relative"
                >
                  <div className=" bg-tahiti rounded-full ">
                    <h2
                      className="py-2 px-[3rem] 
                  shadow-sm text-center text-white font-[700] "
                    >
                      FREE
                    </h2>
                  </div>
                </div>

                <div className="px-5 py-2">
                  <div className="mt-10 ">
                    <h2
                      className="text-midnight font-poppinsBold text-center text-[30px]
              mt-5"
                    >
                      FREE
                    </h2>
                    <p className="text-center">
                      Start exploring with our <br></br> Free Plan.
                    </p>
                    <h2 className="font-poppinsBold text-[30px] mt-5 text-midnight text-center">
                      {" "}
                      $0.00
                    </h2>
                  </div>

                  <div className="mt-5">
                    <button
                      className="px-2 py-2 font-poppinsBold
                text-[20px] text-center bg-tahiti w-full rounded-md text-white
                shadow-sm"
                    >
                      TRY FOR FREE
                    </button>

                    <div className="mt-5">
                      <div className="flex-col space-y-3">
                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2> Unlimited Reading-Listening Practice</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>20 Writing-Speaking Evaluation</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Browse High-scoring Sample Answers</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>2 set Full Mock Test</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Unlimited Progress Tracking</h2>
                        </span>
                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Frequent Support</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>AI-Powered Evaluations</h2>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-10 py-5 w-[20rem] bg-white border-2 border-tahiti rounded-md
          drop-shadow-sm transform 
          transition duration-1000  hover:scale-105 shadow-md"
              >
                <div
                  className="m-auto w-full flex justify-center mt-[-2.5rem]
           relative"
                >
                  <div className=" bg-tahiti rounded-full ">
                    <h2
                      className="py-2 px-[3rem] 
                  shadow-sm text-center text-white font-[700] "
                    >
                      30% off
                    </h2>
                  </div>
                </div>

                <div className="px-5 py-2">
                  <div className="mt-10 ">
                    <h2
                      className="text-midnight font-poppinsBold text-center text-[30px]
              mt-5"
                    >
                      7 Days
                    </h2>
                    <p className="text-center">
                      Experience premium <br></br>
                      features for a week.
                    </p>
                    <div className="flex justify-center mt-5 ml-1 text-midnight">
                      <h2 className="font-poppinsBold text-[30px] "> $9.99</h2>
                      <h2 className="font-poppinsBold text-[15px] mt-4 ml-3 line-through">
                        {" "}
                        $14.27
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                    onClick={()=>handleCheckout(1)}
                      className="px-2 py-2 font-poppinsBold
                text-[20px] text-center bg-tahiti w-full rounded-md text-white
                shadow-sm"
                    >
                      BUY NOW
                    </button>

                    <div className="mt-5">
                      <div className="flex-col space-y-3">
                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2> Unlimited All module Practice</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Nearly 3,000 questions</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Detailed Feedback For SpeaKing-Writing</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Browse High-scoring Sample Answers</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>5 set Mock Test</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Unlimited Dictionary and Word List Service</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Frequent Support</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>AI-Powered Evaluations</h2>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-10 py-5 w-[20rem] bg-white border-2 border-tahiti rounded-md
          drop-shadow-smtransform 
          transition duration-1000  hover:scale-105 shadow-md"
              >
                <div
                  className="m-auto w-full flex justify-center mt-[-2.5rem]
           relative"
                >
                  <div className=" bg-tahiti rounded-full ">
                    <h2
                      className="py-2 px-[3rem] 
                  shadow-sm text-center text-white font-[700] "
                    >
                      50% off
                    </h2>
                  </div>
                </div>

                <div className="px-5 py-2">
                  <div className="mt-10 ">
                    <h2
                      className="text-midnight font-poppinsBold text-center text-[30px]
              mt-5"
                    >
                      15 Days
                    </h2>
                    <p className="text-center">
                      Unlock more potential with <br></br>
                      our 15-Day Plan.
                    </p>
                    <div className="flex justify-center mt-5 ml-1 text-midnight">
                      <h2 className="font-poppinsBold text-[30px] "> $15.99</h2>
                      <h2 className="font-poppinsBold text-[15px] mt-4 ml-3 line-through">
                        {" "}
                        $31.98
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                        onClick={()=>handleCheckout(2)}
                      className="px-2 py-2 font-poppinsBold
                text-[20px] text-center bg-tahiti w-full rounded-md text-white
                shadow-sm"
                    >
                      BUY NOW
                    </button>

                    <div className="mt-5">
                      <div className="flex-col space-y-3">
                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2> Unlimited All module Practice</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Nearly 3,000 questions</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Detailed Feedback For SpeaKing-Writing</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Browse High-scoring Sample Answers</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>10 set Mock Test</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Unlimited Dictionary and Word List Service</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Frequent Support</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>AI-Powered Evaluations</h2>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-10 py-5 w-[20rem] bg-white border-2 border-tahiti rounded-md
          drop-shadow-sm transform 
          transition duration-1000  hover:scale-105 shadow-md"
              >
                <div
                  className="m-auto w-full flex justify-center mt-[-2.5rem]
           relative"
                >
                  <div className=" bg-tahiti rounded-full ">
                    <h2
                      className="py-2 px-[3rem] 
                  shadow-sm text-center text-white font-[700] "
                    >
                      60% off
                    </h2>
                  </div>
                </div>

                <div className="px-5 py-2">
                  <div className="mt-10 ">
                    <h2
                      className="text-midnight font-poppinsBold text-center text-[30px]
              mt-5"
                    >
                      30 Days
                    </h2>
                    <p className="text-center">
                      Get the full experience with <br></br>
                      our 30-Day Plan.
                    </p>
                    <div className="flex justify-center mt-5 ml-1 text-midnight">
                      <h2 className="font-poppinsBold text-[30px] "> $19.99</h2>
                      <h2 className="font-poppinsBold text-[15px] mt-4 ml-3 line-through">
                        {" "}
                        $49.98
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                        onClick={()=>handleCheckout(3)}
                      className="px-2 py-2 font-poppinsBold
                text-[20px] text-center bg-tahiti w-full rounded-md text-white
                shadow-sm"
                    >
                      BUY NOW
                    </button>

                    <div className="mt-5">
                      <div className="flex-col space-y-3">
                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2> Unlimited All module Practice</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Nearly 3,000 questions</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Detailed Feedback For SpeaKing-Writing</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Browse High-scoring Sample Answers</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>15 set Mock Test</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Unlimited Dictionary and Word List Service</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Frequent Support</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>AI-Powered Evaluations</h2>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-10 py-5 w-[20rem] bg-white border-2 border-tahiti rounded-md
          drop-shadow-sm transform 
          transition duration-1000  hover:scale-105 shadow-md"
              >
                <div
                  className="m-auto w-full flex justify-center mt-[-2.5rem]
           relative"
                >
                  <div className=" bg-tahiti rounded-full ">
                    <h2
                      className="py-2 px-[3rem] 
                  shadow-sm text-center text-white font-[700] "
                    >
                      75% off
                    </h2>
                  </div>
                </div>

                <div className="px-5 py-2">
                  <div className="mt-10 ">
                    <h2
                      className="text-midnight font-poppinsBold text-center text-[30px]
              mt-5"
                    >
                      45 Days
                    </h2>
                    <p className="text-center">
                      Get the full experience with <br></br>
                      our 45-Day Plan.
                    </p>
                    <div className="flex justify-center mt-5 ml-1 text-midnight">
                      <h2 className="font-poppinsBold text-[30px] "> $24.99</h2>
                      <h2 className="font-poppinsBold text-[15px] mt-4 ml-3 line-through">
                        {" "}
                        $99.96
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                        onClick={()=>handleCheckout(4)}
                      className="px-2 py-2 font-poppinsBold
                text-[20px] text-center bg-tahiti w-full rounded-md text-white
                shadow-sm"
                    >
                      BUY NOW
                    </button>

                    <div className="mt-5">
                      <div className="flex-col space-y-3">
                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2> Unlimited All module Practice</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Nearly 3,000 questions</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Detailed Feedback For SpeaKing-Writing</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Browse High-scoring Sample Answers</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>20 set Mock Test</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Unlimited Dictionary and Word List Service</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>Frequent Support</h2>
                        </span>

                        <span className="flex gap-3 justify-start">
                          <span className="mt-1">
                            {" "}
                            <IconRightMark
                              height="1rem"
                              width="1rem"
                            ></IconRightMark>
                          </span>
                          <h2>AI-Powered Evaluations</h2>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 py-5 w-full mt-10 flex justify-center">
            <span
              className="text-[20px] md:flex md:flex-row sm:flex sm:flex-col
            sm:text-center md:text-start gap-3"
            >
              <h2 className="mt-1"> Secure Payment:</h2>
              <span>
                <img src="https://practicemania.s3.ap-south-1.amazonaws.com/general/payment.png"></img>
              </span>
            </span>
          </div>
        </div>

        <div className="space-y-5 w-full mt-[7rem]">
          <h2 className="text-[35px] font-[700] text-center text-midnight">
            Frequently Asked Questions
          </h2>

          <div
            className="md:w-[50%] w-full sm:px-5 md:px-0 flex-col justify-center 
        space-y-4 m-auto "
          >
            <Collapse
              style={{ marginTop: "3rem" }}
              bordered={true}
              collapsible="header"
              expandIcon={({ isActive }) => (
                <div className="ml-2 mt-5 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "17px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "17px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div>
                      <h2 className="text-[25px] font-montserrat md:block sm:hidden">
                        What makes this platform different from other?
                      </h2>
                      <h2 className="text-[25px] font-montserrat md:hidden">
                        What makes this <br></br> platform different <br></br>{" "}
                        from other
                      </h2>
                    </div>
                  ),
                  children: (
                    <p className="md:ml-10 text-[17px] font-poppins ">
                      Our platform stands out by offering unlimited English
                      language practice questions, ensuring continuous learning
                      and improvement
                    </p>
                  ),
                },
              ]}
            />
            <Collapse
              bordered={true}
              collapsible="header"
              size="large"
              expandIcon={({ isActive }) => (
                <div className=" mt-4 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "17px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "17px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div>
                      <h2 className="text-[25px] flex font-montserrat md:block sm:hidden">
                        How does plans and pricing work?
                      </h2>
                      <h2 className="text-[25px] flex font-montserrat md:hidden">
                      How does plans and <br></br> pricing work?
                      </h2>
                    </div>
                  ),
                  children: (
                    <p className="md:ml-10 font-poppins text-[17px]">
                      We provide transparent plans and pricing for our users,
                      with no hidden fees. Additionally, we offer subscription
                      packages so that you can choose services according to your
                      needs.
                    </p>
                  ),
                },
              ]}
            />

            <Collapse
              collapsible="header"
              size="large"
              bordered={true}
              expandIcon={({ isActive }) => (
                <div className=" mt-4 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div>
                      <h2 className="text-[25px] font-montserrat md:block sm:hidden">
                        Do you offer any discounts?
                      </h2>
                      <h2 className="text-[25px] font-montserrat md:hidden">
                      Do you offer any <br></br> discounts?
                      </h2>
                    </div>
                  ),
                  children: (
                    <p className="md:ml-10 font-poppins text-[17px]">
                      Yes! We offer tailored discounts for each service. If you
                      need any financial help regarding the package to suscribe
                      please contact-us through email.
                    </p>
                  ),
                },
              ]}
            />
            <Collapse
              collapsible="header"
              size="large"
              bordered={true}
              expandIcon={({ isActive }) => (
                <div className=" mt-4 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div>
                      <h2 className="text-[25px] font-montserrat md:block sm:hidden">
                        What is your refund policy if I'm not satisfied with the
                        service?
                      </h2>

                      <h2 className="text-[25px] font-montserrat md:hidden">
                        What is your refund <br></br> policy if I'm not{" "}
                        <br></br>
                        satisfied with the
                        <br></br> service?
                      </h2>
                    </div>
                  ),
                  children: (
                    <p className="md:ml-10 font-poppins text-[17px]">
                      If you're not satisfied, we offer a half refund within the
                      first 3 days. Contact customer support to initiate the
                      process
                    </p>
                  ),
                },
              ]}
            />
            <Collapse
              collapsible="header"
              size="large"
              bordered={true}
              expandIcon={({ isActive }) => (
                <div className=" mt-4 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <h2 className="text-[25px] font-montserrat">
                      Is there a free trial?
                    </h2>
                  ),
                  children: (
                    <p className="md:ml-10 font-poppins text-[17px]">
                      Yes, we offer a free trial period so you can experience
                      our platform before committing to a subscription.
                    </p>
                  ),
                },
              ]}
            />

            <Collapse
              collapsible="header"
              size="large"
              bordered={true}
              expandIcon={({ isActive }) => (
                <div className=" mt-4 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div>
                      <h2 className="text-[25px] font-montserrat md:block sm:hidden">
                        My payment was successful, but the upgrade failed.
                      </h2>

                      <h2 className="text-[25px] font-montserrat md:hidden">
                      My payment was <br></br> successful, but the <br></br> upgrade failed.
                      </h2>
                    </div>
                  ),
                  children: (
                    <p className="md:ml-10 font-poppins text-[17px]">
                      Please contact us via chat or email:
                      <span className="text-tahiti">
                        {" "}
                        support@practicecompanions.com
                      </span>{" "}
                      This is the simplest and fastest way to address your
                      concerns.
                    </p>
                  ),
                },
              ]}
            />

            <Collapse
              collapsible="header"
              size="large"
              bordered={true}
              expandIcon={({ isActive }) => (
                <div className=" mt-5 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div>
                      <h2 className="text-[25px] font-montserrat md:block sm:hidden">
                        Where do I send my feedback?
                      </h2>
                      <h2 className="text-[25px] font-montserrat md:hidden">
                        Where do I send my <br></br> feedback?
                      </h2>
                    </div>
                  ),
                  children: (
                    <p className="md:ml-10 font-poppins text-[17px]">
                      You can send your feedback to
                      <span className="text-tahiti">
                        {" "}
                        contact@practicecompanions.com
                      </span>{" "}
                      or through our feedback form on our website.
                    </p>
                  ),
                },
              ]}
            />
            <Collapse
              collapsible="header"
              size="large"
              bordered={true}
              expandIcon={({ isActive }) => (
                <div className=" mt-5 cursor-pointer">
                  {!isActive ? (
                    <RightOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></RightOutlined>
                  ) : (
                    <DownOutlined
                      style={{ fontSize: "20px", color: "#3ab7bf" }}
                    ></DownOutlined>
                  )}
                </div>
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div>
                      <h2 className="text-[25px] font-montserrat md:block sm:hidden">
                        Are there any community features, like forums or study
                        groups?
                      </h2>

                      <h2 className="text-[25px] font-montserrat md:hidden">
                        Are there any <br></br> community features, <br></br>{" "}
                        like forums or study <br></br>
                        groups?
                      </h2>
                    </div>
                  ),
                  children: (
                    <p className="md:ml-10 font-poppins text-[17px]">
                      You can join our community and stay updated by following
                      our Facebook page at
                      <span>
                        <a
                          href={
                            "https://www.facebook.com/groups/1308420916508757/?ref=share&mibextid=NSMWBT"
                          }
                        >
                          <span className="text-tahiti px-1">
                            PracticeCompanions
                          </span>
                        </a>{" "}
                      </span>{" "}
                      and joining our group,
                      <span>
                        <a
                          href={
                            "https://www.facebook.com/groups/1308420916508757/?ref=share&mibextid=NSMWBT"
                          }
                        >
                          <span className="text-tahiti px-1">
                            Duolingo - IELTS English Test by PracticeCompanions
                          </span>
                        </a>{" "}
                      </span>{" "}
                      Community
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-[7rem] md:w-[50%]  m-auto">
          <h2 className="text-[35px] font-[700] text-center text-midnight">
            Contact Us
          </h2>
          <div className="mt-[5rem] md:flex md:flex-row sm:flex-col  justify-between">
            <div className="px-[2.5rem] py-7 bg-gray-50 rounded-md sm:m-[1rem] md:m-0">
              <div className="w-full h-full flex justify-center ">
                <div className="mt-10">
                  <span className="w-full m-auto flex justify-center">
                    <IconEmailOutline
                      height="7rem"
                      width="7rem"
                      fill="#3ab7bf"
                    ></IconEmailOutline>
                  </span>
                  <h2
                    className="text-[30px] text-midnight font-poppinsBold text-center mt-10 
                tracking-widest"
                  >
                    Email Us
                  </h2>

                  <p className="text-[20px] font-montserrat mt-3 sm:text-center ">
                    Receive a response in 1 business day.
                  </p>
                  <p
                    className="mt-7 text-center border-2 rounded-md
                px-3 py-3 font-[700] font-montserrat cursor-pointer"
                  >
                    contact@practicecompanions.com
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 bg-gray-50 rounded-md sm:mt-10 md:mt-0 sm:m-[1rem] md:m-0">
              <div className="w-full h-full flex justify-center ">
                <div className="mt-10">
                  <span className="w-full m-auto flex justify-center">
                    <IconInboxMessage
                      height="7rem"
                      width="7rem"
                      fill="#3ab7bf"
                    ></IconInboxMessage>
                  </span>
                  <h2
                    className="text-[30px] font-poppinsBold text-center mt-[3rem]
                tracking-wider text-midnight"
                  >
                    Leave a message
                  </h2>

                  <p className="text-[20px] font-montserrat mt-3 sm:text-center">
                    We will respond to you within 1 business day.
                  </p>
                  {/* <p
                  className="mt-7 text-center border-2 rounded-md
                px-3 py-3 font-[700] font-montserrat"
                >
                  Leave a message right now
                </p> */}

                  <div className="mt-7">
                    <Link
                      className="w-full  text-center border-2 rounded-md
                px-[3rem] py-3 font-[700] font-montserrat m-auto flex justify-center"
                      to={"/contact-us"}
                    >
                      {" "}
                      Leave a message right now
                    </Link>
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
