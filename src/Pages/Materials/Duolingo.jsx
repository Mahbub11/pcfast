import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { IconEye } from "../../Assets/SVG/IconEye";
import { Radio, Button, Modal } from "antd";
import IconCommingSoon from "../../Assets/SVG/IconCommingSoon";
import { duolingoMaterial } from "../../utils/MaterialsData";
import { LIVE_URL } from "../../config";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import OfficialGuideDuolingo from "../../Assets/Files/DuolingoOfficialGuide.pdf";

export default function Duolingo() {
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState({});

  const handlePreview = () => {
    setTemplate(duolingoMaterial[0]);
    setIsOpen(true);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
         Materials for Duolingo-Ielts English Test Preparation
        </title>
        <meta
          name="description"
          content="Here you will find all the materials for Duolingo-Ielts English Test Preparation"
        />
        <link rel="canonical" href={`${LIVE_URL}materials`} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips, Materials for Duolingo-Ielts English Test Preparation"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Materials for Duolingo-Ielts English Test Preparation"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will find all the materials for Duolingo-Ielts English Test Preparation"
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Materials for Duolingo-Ielts English Test Preparation"
        />
        <meta
          name="twitter:description"
          content="Here you will find all the materials for Duolingo-Ielts English Test Preparation"
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Materials for Duolingo-Ielts English Test Preparation"
        />
        <meta
          name="facebook:description"
          content="Here you will find all the materials for Duolingo-Ielts English Test Preparation"
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>

      <div className="px-2 py-10 md:w-[80%] sm:w-[95%] h-auto m-auto  mt-10 bg-gray-100 rounded-sm ">
        <div className="w-full flex flex-col gap-3 justify-center">
          <h1 className="text-center text-[30px] font-montserrat font-[600] ">
           Duolingo-IELTS Test Materials
          </h1>
          <div className="mr-5 self-end">
            {/* <Radio.Group
       
      */}

            <Radio.Group defaultValue={1} buttonStyle="solid">
              <div className="flex gap-[2px] font-montserrat">
                <Radio.Button
                  style={{
                    background: "#B4D6FD",
                    color: "#000000",
                    fontFamily: "inherit",
                  }}
                  value={1}
                >
                  DUOLINGO
                </Radio.Button>
                <div className="flex gap-1">
                  <Radio.Button
                    style={{
                      background: "#B4D6FD",
                      color: "#000000",
                      fontFamily: "inherit",
                    }}
                    value={2}
                  >
                    IELTS
                  </Radio.Button>
                  <span className="mt-[-1rem]">
                    <IconCommingSoon
                      width="2rem"
                      height="2rem"
                    ></IconCommingSoon>
                  </span>
                </div>
              </div>
            </Radio.Group>
          </div>
          <div className=" flex flex-col gap-10 text-gray-600 md:w-[80%] sm:w-[95%] m-auto md:mt-[3rem] sm:mt-4">
            <div className="px-2 py-2">
              <h2 className="font-poppins text-[25px] border-b-[3px] text-gray-800">
                Latest Materials
              </h2>
              <div className="mt-5 flex justify-between px-2 md:mt-[2rem] sm:mt-4">
                <h2 className=" text-[20px] ">
                  Duolingo English Test Official Guide
                </h2>
                <a
                  href={OfficialGuideDuolingo}
                  download="Duolingo Official Guide"
                >
                  <button className="border-[2px] bg-[#3AB7BF] px-2 py-2 rounded-md text-white">
                    Preview
                  </button>
                </a>
              </div>
              <div className="mt-5 flex justify-between px-2 md:mt-[2rem] sm:mt-4">
                <h2 className=" text-[20px] ">
                  How Duolingo English Test Report Result
                </h2>
                <button className="border-[2px] bg-[#3AB7BF] px-2 py-2 rounded-md text-white">
                  <a
                    href={`${LIVE_URL}duolingo/scoring/explanation`}
                    target="self"
                  >
                    Preview
                  </a>
                </button>
              </div>
            </div>

            <div className="px-2 py-2 font-montserrat">
              <div className="bg-[#DDE9F8] ">
                <h2 className="font-poppins text-[25px]  text-gray-800  px-2 py-2">
                  Additional Materials
                </h2>
              </div>
              <div className="h-auto w-full bg-white">
                <div className="px-2 py-2 ml-2 text-[18px] font-[500] font-poppins">
                  <ul className="mt-5 space-y-4">
                    <li className="hover:text-blue-400">
                      <a href={`${LIVE_URL}duolingo/module`} target="self">
                        All 18 Question Types with Sample Question and Answers
                      </a>
                    </li>
                    <div className="mt-5">
                      <li className="hover:text-blue-400">
                        <a href={`${LIVE_URL}duolingo/reading`} target="self">
                          Guide for Reading Module in Duolingo English Test
                        </a>{" "}
                      </li>
                      <li className="hover:text-blue-400">
                        {" "}
                        <a
                          href={`${LIVE_URL}duolingo/tips/reading`}
                          target="self"
                        >
                          Suggestion and notes for Reading Module
                        </a>
                      </li>
                    </div>
                    <div className="mt-5">
                      <li className="hover:text-blue-400">
                        <a href={`${LIVE_URL}duolingo/writing`} target="self">
                          Guide for Writing Module in Duolingo English Test
                        </a>
                      </li>
                      <li className="hover:text-blue-400">
                        <a
                          href={`${LIVE_URL}duolingo/tips/writing`}
                          target="self"
                        >
                          Suggestion and notes for Writing Module
                        </a>
                      </li>
                    </div>
                    <div className="mt-5">
                      <li className="hover:text-blue-400">
                        {" "}
                        <a href={`${LIVE_URL}duolingo/speaking`} target="self">
                          Guide for Speaking Module in Duolingo English Test
                        </a>
                      </li>

                      <li className="hover:text-blue-400">
                        {" "}
                        <a
                          href={`${LIVE_URL}duolingo/module/speaking`}
                          target="self"
                        >
                          Suggestion and notes for Speaking Module
                        </a>
                      </li>
                    </div>

                    <div className="mt-5">
                      <li className="hover:text-blue-400">
                        <a href={`${LIVE_URL}duolingo/listening`} target="self">
                          Guide for Listening Module in Duolingo English Test
                        </a>
                      </li>

                      <li className="hover:text-blue-400">
                        <a
                          href={`${LIVE_URL}duolingo/tips/listening`}
                          target="self"
                        >
                          Suggestion and notes for Listening Module
                        </a>
                      </li>
                    </div>
                  </ul>
                </div>
                <div className="h-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
