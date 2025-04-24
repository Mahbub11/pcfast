import React from "react";
import { Helmet } from "react-helmet-async";
import { LIVE_URL } from "../../config";

export default function ShowModuleContent({ data }) {

  console.log(data)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here you will learn about Duolingo English Test Reading module's question types."
        />
        <title>{` ${data.heading} `}</title>
        <link
          rel="canonical"
          href={`${LIVE_URL}duolingo/${data.module.toLowerCase()}`}
        />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,'Duolingo Guide for Reading Module"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content={`Guide for ${data.heading} Module in Duolingo English Test`}
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here you will learn about Duolingo English Test Reading module's question types."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta
          property="og:url"
          content={`${LIVE_URL}duolingo/${data.module.toLowerCase()}`}
        />
        <meta
          name="twitter:title"
          content={`Guide for ${data.heading} Module in Duolingo English Test`}
        />
        <meta
          name="twitter:description"
          content="Here you will learn about Duolingo English Test Reading module's question types."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content={`Guide for ${data.heading} Module in Duolingo English Test`}
        />
        <meta
          name="facebook:description"
          content="Here you will learn about Duolingo English Test Reading module's question types."
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>
      <div className="sm:w-[90%] md:w-[60%] m-auto mt-10">
        {/* Header */}
        <section>
          <div className="flex flex-col gap-3">
            <div className=" uppercase">
              <h1 className="font-poppinsBold text-[40px] font-[600]">
                {data.heading}
              </h1>
            </div>
            <p className="mt-5 sm:text-[17px] md:text-[20px] font-montserrat text-justify">
              {data.subPara}
            </p>
          </div>

          <div className="mt-10">
            {data.content.map((val) => {
              return (
                <div
                  className={`${
                    val.heading ? "mt-[5rem]" : "mt-[-2rem]"
                  } flex flex-col `}
                >
                  <div className="ml-4">
                    <ul className={`${val.heading ? "list-disc" : ""}`}>
                      <li className="font-[600] sm:text-[20px] md:text-[22px]">
                        {val.heading}
                      </li>
                    </ul>
                  </div>
                  <p className="font-montserrat sm:text-[17px] md:text-[20px] text-justify mt-3">
                    {val.subHeading}
                  </p>

                  <div className="self-center mt-[5rem] flex justify-center flex-col gpa-3">
                    <img
                    alt="reading_guideline duolingo"
                      className="md:w-[60%] sm:w-[95%] h-auto self-center"
                      src={val.image}
                    ></img>

                    <div className="text-[20px]">
                      <h2 className="mt-10 underline text-blue-400 font-[600]">
                        <a href={val?.completeGuideline?.url} target="self">
                          {val?.completeGuideline?.text}
                        </a>
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
