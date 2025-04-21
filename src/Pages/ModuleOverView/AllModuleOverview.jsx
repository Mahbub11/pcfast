import React from "react";
import { LIVE_URL, S3_BASE_URL } from "../../config";
import logo from "../../Assets/pictures/duolingoModule/read-and-complete-duolingo-english-test@2x.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AllModuleOverview() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="There are 18 question types that you will get in Duolingo english test. We discussed individual with sample question and answer."
        />
        <title>All 18 types Sample Question & Sample Answers</title>
        <link rel="canonical" href={`${LIVE_URL}duolingo/module`} />
        <meta
          name="keywords"
          content="duolingo,ielts,duolingo practice,ielts practice,moc test, duolingo guide,
        ielts guide, duolingo tips,'Duolingo all types smaple questions"
        />
        <meta name="author" content="PracticeCompanios" />
        <meta
          property="og:title"
          content="All 18 types Sample Question & Sample Answers"
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          content="There are 18 question types that you will get in Duolingo english test. We discussed individual with sample question and answer."
        />
        <meta property="og:image" content={`${LIVE_URL}/favicon.ico`} />
        <meta property="og:url" content={`${LIVE_URL}duolingo/module`}/>
        <meta name="twitter:title" content="All 18 types Sample Question & Sample Answers" />
        <meta
          name="twitter:description"
          content="There are 18 question types that you will get in Duolingo english test. We discussed individual with sample question and answer."
        />
        <meta name="twitter:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="twitter:card" content={`${LIVE_URL}favicon.ico`} />

        <meta name="facebook:title" content="All 18 types Sample Question & Sample Answers" />
        <meta
          name="facebook:description"
          content="There are 18 question types that you will get in Duolingo english test. We discussed individual with sample question and answer."
        />
        <meta name="facebook:image" content={`${LIVE_URL}favicon.ico`} />
        <meta name="facebook:card" content={`${LIVE_URL}favicon.ico`} />

        
      </Helmet>
      <div className="w-full h-full px-2 py-2">
        <div
          className="sm:w-[90%] md:w-[65%]
       m-auto mt-[2rem] font-poppins text-justify text-[18px]"
        >
          <div className="md:ml-[3rem]">
            <div>
              <div className="m-auto">
                <h1 className="font-poppinsBold sm:text-[25px] md:text-[45px] text-start font-[900]">
                  All 18 Question Types with Sample <br /> Question and Answers
                </h1>
                <p className="mt-[2rem] leading-8">
                  There are total 18 question types on the Duolingo English
                  Test. In this article, we are going to explain all the types
                  with sample question and answer. It will help to understand
                  what kind of questions will appear to you. <br /> We
                  PracticeCompanions providing you unlimited questions in every
                  single question type. So you can select your own choice for
                  your practice. <br /> Let’s see the every question type
                  individually.
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-[40px] font-[800] font-poppinsBold tracking-wide">
                  TABLE OF CONTENTS
                </h2>
                <div className="flex flex-col gap-5">
                  <div className="mt-5">
                    <h2 className="font-[600] text-[35px] tracking-normal">
                      Reading
                    </h2>
                    <div className="mt-2">
                      <ul className="space-y-1 font-[600]">
                        <li>Read and Complete</li>
                        <li>Read and select (Vocabulary)</li>
                        <li>
                          Interactive Reading
                          <div className="ml-10 mt-3">
                            <ul className="list-disc">
                              <li>Complete the Sentence</li>
                              <li>Complete the Passage</li>
                              <li>Highlight the Answer</li>
                              <li>Identify the Idea</li>
                              <li>Title the Passage</li>
                            </ul>
                          </div>
                        </li>

                        <li>
                          <div className="mt-5">
                            <ul className="space-y-2 font-[600]">
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/reading`}
                                  target="self"
                                >
                                  Guide for Reading Module in Duolingo English
                                  Test
                                </a>
                              </li>
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/tips/reading`}
                                  target="self"
                                >
                                  Suggestion and tips for Reading Module
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*  */}
                  <div className="mt-5">
                    <h2 className="font-[600] text-[35px]">Writing</h2>
                    <div className="mt-2">
                      <ul className="space-y-1 font-[600]">
                        <li>Write about Photo</li>
                        <li>Read then Write</li>
                        <li>Writing Sample</li>

                        <li>
                          <div className="mt-5">
                            <ul className="space-y-2 ">
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/writing`}
                                  target="self"
                                >
                                  Guide for Writing Module in Duolingo English
                                  Test
                                </a>
                              </li>
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/tips/writing`}
                                  target="self"
                                >
                                  Suggestion and tips for Writing Module
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/*  */}
                  <div className="mt-5">
                    <h2 className="font-[600] text-[35px]">Speaking</h2>
                    <div className="mt-2">
                      <ul className="space-y-1 font-[600]">
                        <li>Speak about the Photo</li>
                        <li>Read Aloud</li>
                        <li>Read then Speak</li>
                        <li>Listen then Speak</li>
                        <li>Speaking Sample</li>

                        <li>
                          <div className="mt-5">
                            <ul className="space-y-2 font-[600]">
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/speaking`}
                                  target="self"
                                >
                                  Guide for Speaking Module in Duolingo English
                                  Test
                                </a>
                              </li>
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/tips/speaking`}
                                  target="self"
                                >
                                  Suggestion and tips for Speaking Module
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/*  */}
                  <div className="mt-5">
                    <h2 className="font-[600] text-[35px]">Listening</h2>
                    <div className="mt-2">
                      <ul className="space-y-1 font-[600] ">
                        <li>Listen and Type</li>

                        <li>
                          Interactive Listening
                          <div className="ml-10 mt-3">
                            <ul className="list-disc font-[600]">
                              <li>Listen and Respond</li>
                              <li>Summarize the Conversation</li>
                            </ul>
                          </div>
                        </li>

                        <li>
                          <div className="mt-5">
                            <ul className="space-y-2 ">
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/listening`}
                                  target="self"
                                >
                                  Guide for Listening Module in Duolingo English
                                  Test
                                </a>
                              </li>
                              <li className="underline text-blue-400">
                                <a
                                  href={`${LIVE_URL}duolingo/tips/listening`}
                                  target="self"
                                >
                                  Suggestion and tips for Listening Module
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>

            {/* Second Reading*/}
            <div className="mt-[3rem]">
              <h2 className="text-[30px] font-[600] tracking-wide">
                Read and Complete
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/read and complete duolingo.png`}
                  alt="read and complete duolingo"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600]">Answer:</h2>
                  <p className="mt-5 italic">
                    The phones 4u Arena seats over 21,000 and is the largest
                    indoor area i<span className="font-[600]">n</span> Europe.
                    It h<span className="font-[600]">as</span>
                    been vo<span className="font-[600]">ted</span> International
                    Venue of t<span className="font-[600]">he</span> Year a
                    <span className="font-[600]">nd</span> for sev
                    <span className="font-[600]">eral</span>
                    years w<span className="font-[600]">as</span> the mo
                    <span className="font-[600]">st</span> popular ve
                    <span className="font-[600]">nue</span>
                    in t<span className="font-[600]">he</span> world. The sports
                    grounds also host large pop concerts.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/read-and-complete`}
                  target="self"
                >
                  Complete guide for Read and Complete in duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}
            <div className="mt-[3rem]">
              <h2 className="text-[30px] font-[600] tracking-wide">
                Read and Select
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/read and select duolingo.png`}
                  alt="read and select duolingo"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Answer:</h2>
                  <div className="mt-3">
                    <h2>Real Words:</h2>
                    <ul className="list-disc ml-10 mt-5 italic">
                      <li>regret</li>
                      <li>signature</li>
                      <li>deal</li>
                      <li>corner</li>
                      <li>unforgettable</li>
                    </ul>
                  </div>
                  <div className="mt-5">
                    <h2>Fake Words:</h2>
                    <ul className="list-disc ml-10 mt-3 italic">
                      <li>banic</li>
                      <li>unfalled</li>
                      <li>controde</li>
                      <li>fantally</li>
                      <li>prinater</li>
                      <li>insurd</li>
                      <li>poid</li>
                      <li>strementy</li>
                      <li>friever</li>
                      <li>sharket</li>
                      <li>darious</li>
                      <li>eerses</li>
                      <li>parken</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/read-and-select`}
                  target="self"
                >
                  Read and Select guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[30px] font-[600] tracking-wide">
                Interactive Reading
              </h2>

              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Complete the Sentence
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/complete the sentence duolingo.png`}
                  alt="complete the sentence duolingo"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Answer:</h2>
                  <div className="mt-3">
                    <ul className="list-disc ml-10 mt-5 italic">
                      <li>fuse</li>
                      <li>trying</li>
                      <li>few</li>
                      <li>again</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/interactive-reading`}
                  target="self"
                >
                  Interactive Reading guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Complete the Passage
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/complete-the-passage-duolingo-english-test.png`}
                  alt="complete-the-passage-duolingo-english-test"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Answer:</h2>
                  <p className="italic">
                    He realized he must have made a mistake, so he went back and
                    checked his work.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/ri`}
                  target="self"
                >
                  Interactive Reading guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Highlight the answer
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/highlight-the-answer-duolingo-english-test.png`}
                  alt="highlight-the-answer-duolingo-english-test"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Answer:</h2>
                  <p className="italic">
                    Fixing a few things around the house himself
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/interactive-reading`}
                  target="self"
                >
                  Interactive Reading guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Identify the Idea
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/identify-the-idea-duolingo-english-test.png`}
                  alt="identify-the-idea-duolingo-english-test"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Answer:</h2>
                  <p className="italic">
                    John blew a fuse while rewiring one of the outlets in his
                    house.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/ri`}
                  target="self"
                >
                  Interactive Reading guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Title the Passage
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/title-the-passage-duolingo-english-test.png`}
                  alt="title-the-passage-duolingo-english-test"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Answer:</h2>
                  <p className="italic">John’s Electrical Difficulties</p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/interactive-reading`}
                  target="self"
                >
                  Interactive Reading guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[30px] font-[600] tracking-wide">Writing</h2>
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Write about the Photo
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/write about the photo duolingo.png`}
                  alt="write about the photo duolingo"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Sample Answer:</h2>
                  <p className="italic">
                    The photo shows a man and a young boy walking together on a
                    street. They could be father and son. Both are wearing
                    winter clothing and walking on a paved sidewalk. The boy
                    appears to be carrying school bag. The background shows
                    buildings and parked cars. It seems to be a snapshot taken
                    during a casual stroll in an urban area.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/wp`}
                  target="self"
                >
                  Write about the Photo guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Read then Write
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/read then write duolingo.png`}
                  alt="read then write duolingo.png"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Sample Answer:</h2>
                  <p className="italic">
                    In my culture, there is a distinct emphasis on valuing the
                    contributions of scientists more prominently than those of
                    artists. Scientific achievements, particularly in fields
                    like medicine and technology, receive heightened recognition
                    due to their tangible impacts on society. For example,
                    breakthroughs in medical research leading to new treatments
                    or innovations in technology garner widespread acclaim and
                    support.
                    <br /> <br />
                    Scientific endeavors often attract substantial resources,
                    including government funding and public attention,
                    reflecting the prioritization of advancements that offer
                    immediate and practical benefits. This emphasis stems from
                    the perception that scientific contributions lead to
                    concrete solutions, shaping the trajectory of progress and
                    addressing pressing societal challenges.
                    <br /> <br />
                    While artistic expressions are acknowledged for their
                    cultural significance, emotional resonance, and contribution
                    to the human experience, they may not receive the same level
                    of immediate recognition in my cultural context. The
                    prevailing sentiment values the measurable and practical
                    outcomes associated with scientific achievements over the
                    more subjective impact of artistic endeavors.
                    <br />
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/wrw`}
                  target="self"
                >
                  Read then Write guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Writing Sample
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/read then write duolingo.png`}
                  alt="read then write duolingo"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Sample Answer:</h2>
                  <p className="italic">
                    Success in school is shaped by certain behaviors that extend
                    beyond textbooks and classrooms. Time management stands out,
                    ensuring punctuality and efficient handling of academic
                    tasks. Personally, my detailed schedule helped balance
                    coursework, activities, and personal time, fostering
                    discipline.<br></br>
                    <br></br>
                    Active participation in class discussions contributes to a
                    deeper understanding of subjects. Sharing perspectives not
                    only enriches personal learning but also creates a
                    collaborative classroom environment. Effective communication
                    with teachers and peers is crucial. Establishing open
                    channels positively impacted my grasp of complex topics.
                    <br></br>
                    <br></br>
                    Setting realistic goals and breaking them into tasks
                    instills a sense of direction. This behavior aids in
                    maintaining focus and celebrating achievements. Adaptability
                    is key when facing challenges. Flexibility allows for
                    adjusting study strategies, fostering resilience.<br></br>
                    <br></br>
                    Collaborative learning, through effective teamwork, prepares
                    for real-world scenarios. Group work enhances academic
                    performance and interpersonal skills. In navigating
                    unexpected changes in coursework, adaptability has proven
                    instrumental.
                    <br></br>
                    <br></br>
                    These behaviors collectively create a positive academic
                    environment, nurturing personal and academic growth. They
                    are not mere habits but lifelong skills shaping success
                    beyond the school setting.<br></br>
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/ws`}
                  target="self"
                >
                  Writing Sample guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[30px] font-[600] tracking-wide">Speaking</h2>
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Speak about the Photo
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/speak about the photo duolingo.png`}
                  alt="speak about the photo duolingo"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Sample Answer:</h2>
                  <p className="italic">
                    In this photo, I see a little boy and a little girl laughing
                    and hugging. The little boy has his hand on the girl’s head,
                    and he is pulling her toward him. They seems to be close to
                    one another, like brother and sister. It’s not clear what
                    has made them so happy. Perhaps it was nothing; children are
                    often very happy like this! However, I noticed that the
                    girl’s hair is wet. The boy’s hair is too short to tell.
                    Perhaps they were just in the bath and that put them into a
                    good mood.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/sp`}
                  target="self"
                >
                  Speak about the Photo guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Read Aloud
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/read aloud duolingo.png`}
                  alt="read aloud duolingo"
                ></img>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/speak-aloud`}
                  target="self"
                >
                  Read Aloud guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Read then Speak
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/read-then-speak-duolingo-english-test.png`}
                  alt="read-then-speak-duolingo-english-test"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Sample Answer:</h2>
                  <p className="italic">
                    One of my favorite restaurants is "Sunshine Bistro." It's
                    like a culinary oasis where every visit feels like a
                    flavorful adventure. Nestled in a charming corner, the cozy
                    ambiance and vibrant decor create a welcoming atmosphere.
                    <br></br>
                    <br></br>
                    What makes "Sunshine Bistro" stand out is its diverse menu,
                    offering a fusion of global cuisines. From savory tacos to
                    aromatic curries, each dish is a symphony of tastes. The
                    chefs seem to infuse creativity into every recipe, making it
                    a go-to spot for unique and delicious meals.<br></br>
                    <br></br>
                    The staff is incredibly friendly, and their enthusiasm adds
                    to the overall dining experience. Whether I'm celebrating
                    special occasions or having a casual dinner with friends,
                    "Sunshine Bistro" feels like the perfect setting.<br></br>
                    <br></br>
                    The attention to detail extends to the presentation of each
                    dish, making every meal not only a treat for the taste buds
                    but also a feast for the eyes. "Sunshine Bistro" has become
                    more than a restaurant; it's a place of culinary joy and
                    shared moments that I cherish.<br></br>
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/sr`}
                  target="self"
                >
                  Read then Speak guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Listen then speak
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/listen then speak.png`}
                  alt="listen then speak"
                ></img>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/sl`}
                  target="self"
                >
                  Listen then Speak guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Speaking Sample
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/speaking-sample-duolingo-english-test.png`}
                  alt="speaking-sample-duolingo-english-test"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Sample Answer:</h2>
                  <p className="italic">
                    In a world inundated with information from diverse sources,
                    the ability to discern and prioritize becomes paramount.
                    When deciding which information to focus on, I rely on
                    criteria such as reliability, relevance, and credibility.
                    These principles guide me through a sea of data, helping me
                    filter out noise and pinpoint the most valuable sources.
                    <br></br>
                    <br></br>
                    Once, while doing a project, I found conflicting information
                    from online forums. To make my work better, I decided to
                    ignore these less reliable sources. Instead, I paid more
                    attention to articles from experts and well-known journals.
                    This helped me have better and more reliable information.
                    <br></br>
                    <br></br>
                    As I delved into the project, the decision to prioritize
                    academic resources yielded significant benefits. By
                    concentrating on credible sources, the depth and quality of
                    my research improved. The rigorous review processes inherent
                    in academic publications ensured a higher standard of
                    information, contributing to the overall robustness of my
                    work.<br></br>
                    <br></br>
                    This experience taught me valuable lessons about the
                    importance of critical evaluation in information
                    consumption. Filtering out less reliable sources is not just
                    a choice; it's a necessity in ensuring that the information
                    we focus on is trustworthy, substantiated, and contributes
                    to the overall integrity of our endeavors.<br></br>
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/ss`}
                  target="self"
                >
                  Speaking Sample guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[30px] font-[600] tracking-wide">
                Listening
              </h2>
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Listen and Type
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center"
                  src={`${S3_BASE_URL}/duolingo/module/listen and type duolingo.png`}
                  alt="listen and type duolingo"
                ></img>

                <div className="mt-10">
                  <h2 className="font-[600] ">Answer:</h2>
                  <p className="italic">
                    The museum has an incredible collection of ancient
                    artifacts.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/lt`}
                  target="self"
                >
                  Listen and Type guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}

            <div className="mt-[3rem]">
              <h2 className="text-[25px] font-[600] tracking-wide mt-5">
                Interactive Listening
              </h2>
              <div className="w-full mt-5 ">
                <img
                  className="md:w-[80%] sm:w-[95%] h-auto self-center border-[3px] rounded-xl border-yellow-200"
                  src={`${S3_BASE_URL}/duolingo/module/interactive listening duolingo.png`}
                  alt="interactive listening duolingo"
                ></img>
              </div>

              <h2 className="mt-10 underline text-blue-400 font-[600]">
                <a
                  href={`${LIVE_URL}duolingo/module/guideline/li`}
                  target="self"
                >
                  Interactive Listening guide for duolingo English test
                </a>
              </h2>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}
