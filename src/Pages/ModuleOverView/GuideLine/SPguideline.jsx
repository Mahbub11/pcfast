import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../../config";
import { Helmet } from "react-helmet-async";

export default function SPguideline() {
  return (


    <>
     

      <Helmet>
      <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about questions, details and tips for Speak about the Photo. And how you do practice Speak about the Photo in PracticeCompanions."
        />
        <title>Complete Guide for Speak about the Photo in Duolingo English Test</title>
        <link rel="canonical" href={`${LIVE_URL}duolingo/module/guideline/speak-about-the-photo`} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,Complete Guide for Speak about the Photo in Duolingo English Test"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Complete Guide for Speak about the Photo in Duolingo English Test"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about questions, details and tips for Speak about the Photo. And how you do practice Speak about the Photo in PracticeCompanions."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Complete Guide for Speak about the Photo in Duolingo English Test"
        />
        <meta
          name="twitter:description"
          content="Here you will learn about questions, details and tips for Speak about the Photo. And how you do practice Speak about the Photo in PracticeCompanions."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Complete Guide for Speak about the Photo in Duolingo English Test"
        />
        <meta
          name="facebook:description"
          content="Here you will learn about questions, details and tips for Speak about the Photo. And how you do practice Speak about the Photo in PracticeCompanions."
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
              Complete Guide for Speak about the Photo in Duolingo English Test
              </h1>
              <div className="mt-10">
                <p>
                This is likely one of the trickiest adaptive system questions you will face on the Duolingo English Test since it requires you to describe a picture in great detail without much preparation.
                </p>
                <div className="ml-10 mt-5">
                  <ul className="list-disc space-y-1 ">
                    <li>	This question will appear once.</li>
                    <li>	You have to describe the photo aloud for 90 seconds.</li>
                    <li>
                    	You must speak for at least 30 seconds.
                    </li>
                    <li>
                    	Speak for as long as possible.
                    </li>
                    <li>
                    	You are scored based on your content, fluency, and pronunciation.
                    </li>
                    <li>
                    	It contributes to your production and conversation subscores.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-7">
                <h2>Speak about the Photo” question type looks like this:</h2>
                <div className="mt-5">
                  <img
                  title="speak about the photo Duolngo"
                    className="md:w-[80%] sm:w-[95%] h-auto self-center"
                    src={`${S3_BASE_URL}/speak_about_the_photo_duolingo.png`}
                    alt="speak about the photo duolingo"
                  ></img>
                </div>
                <div className="mt-5">
                  <h2 className="font-[700] text-[30px] text-start">Tips & Tricks for Speak about the photo
                  </h2>
                  <ul className="ml-10 list-disc space-y-1  mt-5">
                    <li>
                    Try to speak a full explanation of the image rather than just tagging it.
                    </li>
                    <li>
                    	If you make a mistake, don’t stop keep speaking.
                    </li>
                    <li>
                    	You only have to speak for 30 seconds but try to speak full 90 seconds.
                    </li>
                    <li>
                    	Your response has to be directly related to the picture.
                    </li>
                    <li>
                    	Check your microphone before you start speak.
                    </li>
                    <li>
                    	Speak slowly, clearly and loudly. 
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
                     title="speak about the photo Duolngo"
                      className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl"
                      src={`${S3_BASE_URL}/Speak_about_the_Photo.png`}
                      alt="Speak about the Photo"
                    ></img>
                    <h2 className="mt-5 font-[600]">Evaluation Page</h2>
                     <img title="speak about the photo Duolngo"
                     className="md:w-[80%] sm:w-[95%] h-auto self-center border-[2px] border-header rounded-xl "
                     src={`${S3_BASE_URL}/Speak_about_the_Picture.png`}
                     alt="Speak about the Picture"
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
