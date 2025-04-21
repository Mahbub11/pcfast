import React, { useState } from "react";
import { Radio, Button, Modal, Input } from "antd";
import Artical from "../../Components/Articals/Artical";
import { Helmet } from "react-helmet-async";
import { LIVE_URL } from "../../config";
import MaterialsArticalCard from "../../Components/Articals/MaterialsArticalCard";

export default function Articals() {
  const [sectionName, setSectionName] = useState(1);

  const handleSectionModule = (e) => {
    setSectionName(e.target.value);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Here You will find Latest Articals About Duolingo English Test Preperation"
        />
        <title>Articals of Duolingo English Test Preperation</title>
        <link rel="canonical" href={`${LIVE_URL}articals`} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,  Articals of Duolingo English Test Preperation"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="Articals of Duolingo English Test Preperation"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="Here You will find Latest Articals About Duolingo English Test Preperation"
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={LIVE_URL} />
        <meta
          name="twitter:title"
          content="Articals of Duolingo English Test Preperation"
        />
        <meta
          name="twitter:description"
          content="Here You will find Latest Articals About Duolingo English Test Preperation"
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta
          name="facebook:title"
          content="Articals of Duolingo English Test Preperation"
        />
        <meta
          name="facebook:description"
          content="Here You will find Latest Articals About Duolingo English Test Preperation"
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />
      </Helmet>

      <div className="w-full h-full">
        <div className=" md:w-[80%] sm:w-full h-full m-auto">
          <h1 className="font-lobster md:text-[50px] sm:text-[30px] text-center text-midnight">
            Articles For Duolingo English-Test
          </h1>
          <div className="h-auto w-full px-2 py-2">
            <div className="flex justify-end px-2 py-2">
              <input
                placeholder="Search Text "
                className="px-2 py-2 bg-gray-200 rounded-l-md"
              ></input>
              <button className="bg-[#3AB7BF] px-2 text-white rounded-r-md">
                Search
              </button>
            </div>
            <div className="flex justify-between w-full h-auto mt-10">
              {/* <h1 className="text-[25px] font-poppins font-[700]">
                Duolingo Latest Articals
              </h1> */}
              {/* <div>
                <Radio.Group
                  defaultValue={1}
                  onChange={handleSectionModule}
                  buttonStyle="solid"
                >
                  <div className="flex gap-3 sm:flex-wrap font-montserrat">
                    <div className="flex gap-1">
                      <Radio.Button
                        style={{
                          background: sectionName === 1 ? "#3AB7BF" : "#FFFF",
                          color: sectionName === 1 ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value={1}
                      >
                        DUOLINGO
                      </Radio.Button>
                    </div>
                    <div className="flex gap-1">
                      <Radio.Button
                        style={{
                          background: sectionName === 2 ? "#3AB7BF" : "#FFFF",
                          color: sectionName === 2 ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value={2}
                      >
                        IELTS
                      </Radio.Button>
                    </div>
                  </div>
                </Radio.Group>
              </div> */}
            </div>

            <div className="h-full w-full  mt-3 flex flex-wrap gap-3">
              <Artical module={"reading"}></Artical>
              <Artical module={"writing"}></Artical>
              <Artical module={"speaking"}></Artical>
              <Artical module={"listening"}></Artical>

              <MaterialsArticalCard
                module={"reading"}
                title="All 18 Question Types with Sample Question and Answers"
                link="module"
              ></MaterialsArticalCard>
              <MaterialsArticalCard
                module={"reading"}
                title="Guide for Reading Module in Duolingo English Test"
                link="reading"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"reading"}
                title="Complete Guide for Read and Select in duolingo English test"
                link="module/guideline/read-and-select"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"reading"}
                title="Complete Guide for Interactive Reading in duolingo English test"
                link="module/guideline/interactive-reading"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"writing"}
                title="Guide for Writing Module in Duolingo English Test"
                link="writing"
              ></MaterialsArticalCard>
              <MaterialsArticalCard
                module={"writing"}
                title="Complete Guide for Write about the Photo in duolingo English test"
                link="module/guideline/write-about-the-photo"
              ></MaterialsArticalCard>
              <MaterialsArticalCard
                module={"writing"}
                title="Complete Guide for Read then Write in duolingo English test"
                link="module/guideline/read-then-write"
              ></MaterialsArticalCard>
              <MaterialsArticalCard
                module={"writing"}
                title="Complete Guide for Writing Sample in duolingo English test"
                link="module/guideline/writing-sample"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"speaking"}
                title="Guide for Speaking Module in Duolingo English Test"
                link="speaking"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"speaking"}
                title="Complete Guide for Speak about the Photo in duolingo English test"
                link="module/guideline/speak-about-the-photo"
              ></MaterialsArticalCard>
              <MaterialsArticalCard
                module={"speaking"}
                title="Complete Guide for Speak about the Photo in duolingo English test"
                link="module/guideline/speak-aloud"
              ></MaterialsArticalCard>
              <MaterialsArticalCard
                module={"speaking"}
                title="Complete Guide for Read then Speak in duolingo English test"
                link="module/guideline/read-then-speak"
              ></MaterialsArticalCard>
              <MaterialsArticalCard
                module={"speaking"}
                title="Complete Guide for Listen then Speak in duolingo English test"
                link="module/guideline/listen-then-speak"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"speaking"}
                title="Complete Guide for Speaking Sample in duolingo English test"
                link="module/guideline/speaking-sample"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"listening"}
                title="Guide for Listening Module in Duolingo English Test"
                link="listening"
              ></MaterialsArticalCard>

              <MaterialsArticalCard
                module={"listening"}
                title="Complete Guide for Listen and Type in duolingo English test"
                link="module/guideline/listen-then-type"
              ></MaterialsArticalCard>

<MaterialsArticalCard
                module={"listening"}
                title="Complete Guide for Interactive Listening in duolingo English test"
                link="module/guideline/interactive-listening"
              ></MaterialsArticalCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
