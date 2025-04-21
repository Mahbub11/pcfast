import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import IconFBOriginal from "../../Assets/SVG/IconFBOriginal";
import IconYoutubeOriginal from "../../Assets/SVG/IconYoutubeOriginal";
import { Link } from "react-router-dom";
import IconEmailOutline from "../../Assets/SVG/IconEmailOutline";
import { useDispatch } from "react-redux";
import { ShowNotification } from "../../redux/actions";
import { notification } from "antd";
import { sendContactUsEmail } from "../../redux/slices/commonTask";
import axiosInstance from "../../utils/axios";
import { API_LEVEL, LIVE_URL } from "../../config";
import { Helmet } from "react-helmet-async";

export default function ContactUs() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "top",
    });
  };

  const handleSendEmail = async () => {
    ValidateEmail(email);
    if (name && email && message) {
      const data = {
        name,
        email,
        message,
      };

      await axiosInstance
        .post(`${API_LEVEL}/common-task/contact-us`, data)
        .then((res) => {
          openNotification("success", "Success !", "Email Sent!");
        })
        .catch((err) => {
          openNotification("error", "Error !", "Email Sent Failed!");
        });
    } else {
      openNotification("error", "Error !", "All field Rquired");
    }
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    openNotification("error", "Error !", "Invalid email address");
    return false;
  }

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
        <link rel="canonical" href={`${LIVE_URL}contact-us`} />
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
    
    <div className="h-full w-full  leading-7">
      {contextHolder}
      <div className="md:w-[70%]  sm:w-full px-2 py-2 h-auto  m-auto">
        <div className=" px-2 py-2 w-full h-auto text-[18px] font-poppins">
          <div>
            <h1 className="text-center font-lobster text-[55px]">Contact Us</h1>
          </div>

          <div className="mt-[5rem]">
            <h2 className="font-[600] md:text-[25px]">
              Questions, feedback - reach us, we're here to help you.
            </h2>
            <div className="md:flex md:flex-row sm:flex-col gap-10 mt-[3rem] ">
              <div className="md:w-[20%] sm:w-full">
                <h2 className="font-[700]">Fill in the form</h2>
                <h2 className="text-[17px] text-justify mt-5">
                  Thank you for reaching out to us! Your feedback and inquiries
                  are important to us. We will get back to you as soon as
                  possible.
                </h2>
              </div>

              <div>
                <div className="w-full md:ml-10 sm:mt-10 md:mt-0">
                  <div className="space-y-3 md:w-[45rem]">
                    <Input
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="bg-home/30 drop-shadow-md  w-full h-[3rem] rounded-md"
                    ></Input>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="bg-home/30 shadow-md w-full h-[3rem] rounded-md"
                    ></Input>

                    <TextArea
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      rows={10}
                      className="bg-home/30 w-full shadow-md"
                    ></TextArea>

                    <button
                      onClick={handleSendEmail}
                      className=" bg-tahiti px-10 py-3 text-white m-auto flex justify-center
                    font-[700]"
                    >
                      {" "}
                      Send Now
                    </button>

                    <div className="m-auto w-full flex justify-center">
                      <div>
                        <p className="text-center mt-10 text-[22px]">Or,</p>

                        <div className="flex gap-3">
                          <span className="mt-[23px]">
                            <IconEmailOutline
                              height="1.5rem"
                              width="1.5rem"
                              fill="#3ab7bf"
                            ></IconEmailOutline>
                          </span>
                          <span className="font-[700] md:text-[20px] mt-5 md:tracking-wider">
                            contact@practicecompanions.com
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-[20%] sm:py-5  md:ml-10 sm:mt-10 md:mt-0">
                <div
                  className="w-full md:self-end sm:w-full 
                 md:ml-[5rem] "
                >
                  <h2
                    className="text-center font-[700] md:text-[30px]
                    md:leading-10 font-montserrat"
                  >
                    Join Our Official Community
                  </h2>

                  <div className="justify-center flex-col gap-5">
                    <div className="w-full m-auto flex justify-center">
                      <div className="mt-5 w-full m-auto flex-col justify-center gap-5">
                        <Link
                          to={
                            "https://www.facebook.com/groups/1308420916508757/?ref=share&mibextid=NSMWBT"
                          }
                        >
                          <div className="w-full flex justify-center">
                            <span className="shadow-sm">
                              <IconFBOriginal
                                height="3rem"
                                width="3rem"
                              ></IconFBOriginal>
                            </span>
                          </div>
                          <h2 className="text-center">Facebook</h2>
                        </Link>

                        <Link
                          to={
                            "https://www.youtube.com/channel/UCDwzyaIME5NrLcgiFeGdmhQ"
                          }
                        >
                          <div className="w-full flex justify-center">
                            <span className="shadow-sm">
                              <IconYoutubeOriginal
                                height="3rem"
                                width="3rem"
                              ></IconYoutubeOriginal>
                            </span>
                          </div>
                          <h2 className="text-center">Facebook</h2>
                        </Link>
                      </div>
                    </div>
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
