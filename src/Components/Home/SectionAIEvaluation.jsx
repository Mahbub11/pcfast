import React, { useState } from "react";
import { ReactComponent as Studentsuccess } from "../../Assets/SVG/StudentSuccess.svg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import writing from "../../Assets/pictures/sectionHome/writing.png";
import speaking from "../../Assets/pictures/sectionHome/speaking.png";
import Progress from "../../Assets/pictures/sectionHome/Progress.png";
import avgScore from "../../Assets/pictures/sectionHome/AvgScore.png";
import AiEvaluationDiagram from "../../Assets/SVG/AiEvaluationDiagram";

export const SectionAIEvaluation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);


  return (
    <div>
      <section className="sm:h-[40%] lg:h-[60%]  mt-[10%] w-full  flex:col justify-center">
        <div className="flex:col justify-center w-full">
          <h2
            className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]"
          >
            AI Evaluation
          </h2>
          <div className="w-full flex justify-center mt-3">
            <p
              className="text-[20px] md:text-[22px] text-center sm:w-[90%] 
            sm:text-[16px] sm:font-[400] font-montserrat lg:w-[70%]"
            >
              At PracticeCompanions, we are dedicated to providing a
              transformative learning experience for our users, and we
              understand the pivotal role that Artificial Intelligence (AI)
              plays in shaping modern educational tools. Our commitment to
              excellence drives us to continually evaluate and enhance our
              platform using cutting-edge AI technologies.
            </p>
          </div>
        </div>

        <div className=" w-full h-auto md:mt-[5rem] sm:mt-[2rem] ">
          <div className="md:w-[88%] md:flex md:flex-row sm:flex sm:flex-col gap-10 justify-center  h-auto m-auto overflow-hidden ">
            <div className="h-full md:w-[60%] sm:w-full">
              <div
                className="overflow-hidden w-full sm:text-justify md:text-left "
                ref={emblaRef}
               >
                <div className="w-full sm:w-full flex gap-10">
                  <div className="sm:ml-[1rem] md:ml-[3rem] ">
                    <div className="h-auto md:w-[50rem] sm:w-[21rem] ">
                      <img
                      title="Duolingo Speaking Evaluation"
                        className="md:h-[28rem] md:w-[50rem] sm:h-[17rem] sm:w-[21rem] "
                        alt="writing evaluation duoling"
                        src={speaking}
                      ></img>
                    </div>
                  </div>

                  <div className=" ml-[3rem] ">
                    <div className="h-auto md:w-[50rem] sm:w-[21rem]">
                      <img
                      title="Writing Evaluation Duolingo"
                        className="md:h-[28rem] md:w-[50rem] sm:h-[17rem] sm:w-[21rem] rounded-md"
                        alt="writing evaluation duoling"
                        src={writing}
                      ></img>
                    </div>
                  </div>
                  <div className=" ml-[3rem] ">
                    <div className="h-auto md:w-[50rem] sm:w-[21rem]">
                      <img
                      title="Progress Track Duolingo"
                        className="md:h-[28rem] md:w-[50rem] sm:h-[17rem] sm:w-[21rem] rounded-md"
                        alt="Progress Track Duolingo"
                        src={Progress}
                      ></img>
                    </div>
                  </div>

                  <div className=" ml-[3rem] ">
                    <div className="h-auto md:w-[50rem] sm:w-[21rem]">
                      <img
                      title="Average Performance Duolingo"
                        className="md:h-[28rem] md:w-[55rem] sm:h-[17rem] sm:w-[21rem] rounded-md"
                        alt="Average Score Duolingo"
                        src={avgScore}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full md:w-[40%] flex justify-center  sm:w-full">
              <span className="">
               
               {
                isMobile? <AiEvaluationDiagram
                height="15rem"
                width="17rem"
             ></AiEvaluationDiagram>:
             <AiEvaluationDiagram
             height="25rem"
             width="26rem"
          ></AiEvaluationDiagram>
               }
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
