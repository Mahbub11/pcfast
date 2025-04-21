import React from "react";
import ComprehensiveCoverage from "../../../Assets/pictures/mocktestoverview/comprehensiveCoverage.jpg";
import RealsticExamExperience from "../../../Assets/pictures/mocktestoverview/RealsticExamExperience.png";
import Speaing from "../../../Assets/pictures/sectionHome/speaking.png";
import Progress from "../../../Assets/pictures/sectionHome/Progress.png";
export default function MockOverviewSectionTwo() {
  return (
    <div>
      <div className="w-[95%]   m-auto flex-col font-poppins">
        <div className="mt-[5rem] m-auto md:w-[50%]">
          <h2 className="md:text-[35px] sm:text-[20px] font-[700] text-center">
            Here's what you can expect in <br></br> PracticeCompanions Mock
            Tests
          </h2>
          <p className="text-center sm:mt-5 md:mt-0 sm:text-[15px]">
            Prepare comprehensively with our diverse range of mock tests.
            Whether you're preparing for exams, certifications, or simply
            looking to sharpen your knowledge, our mock tests are designed to
            help you succeed.{" "}
          </p>
        </div>

        <div className="">
          <div
            className="md:flex md:flex-row sm:flex-col w-full md:px-[5rem] sm:px-2 py-5
           mt-[7rem] justify-between"
          >
            <div>
              <div className=" md:h-[300px] md:w-[530px] md:mt-[-2rem] sm:mt-5 flex flex-col justify-between">
                <div className="h-[8rem] w-[9rem] bg-green-400 rounded-md"></div>
                <img
                  title="Duolingo Comprehensive Coverage"
                  alt="Duolingo Comprehensive Coverage"
                  className="mt-5 ml-5 md:w-[30rem] sm:w-[18.5rem] absolute rounded-md shadow-md"
                  src={ComprehensiveCoverage}
                ></img>
                <div className="h-[8rem] sm:mt-[-3.2rem] md:mt-0  w-[9rem] bg-green-400 rounded-md self-end"></div>
              </div>
            </div>
            <div className="md:w-[40%] sm:w-full md:text-[20px] font-poppins md:mt-0 sm:mt-5">
              <h2 className="font-poppinsBold text-[#23B4BE] text-[25px] sm:text-center md:text-start">
                Comprehensive Coverage
              </h2>

              <p className="mt-3 text-[18px]">
                Our mock tests cover a wide range of topics, from language
                proficiency to technical skills, ensuring you're well-prepared
                for DET.
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div
            className="md:flex md:flex-row sm:flex-col w-full md:px-[5rem] sm:px-2 py-5
           mt-[7rem] justify-between"
          >
            <div className="md:w-[40%] sm:w-full md:text-[20px] font-poppins">
              <h2 className="font-poppinsBold text-[#23B4BE] text-[25px] sm:text-center md:text-start">
                Realistic Exam Experience
              </h2>

              <p className="mt-3 text-[18px]">
                Experience the feeling of taking a real exam with our carefully
                crafted mock tests, complete with timed sessions and randomized
                questions.
              </p>
            </div>
            <div>
              <div className=" md:h-[310px] md:w-[520px] md:mt-[-2rem] sm:mt-5 flex flex-col justify-between">
                <div className="h-[8rem] w-[9rem] bg-green-400 rounded-md  self-end"></div>
                <img
                  title="Duolingo Realstic Exam Experience"
                  alt="Duolingo Realstic Exma Experience"
                  className="mt-5 ml-5 md:w-[30rem] sm:w-[18rem] absolute rounded-md shadow-md border-2"
                  src={RealsticExamExperience}
                ></img>
                <div className="h-[8rem] sm:mt-[-3.2rem] md:mt-0  w-[9rem] bg-green-400 rounded-md self-start"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div
            className="md:flex md:flex-row sm:flex-col w-full md:px-[5rem] sm:px-2 py-5
           mt-[7rem] justify-between"
          >
            <div>
              <div className=" md:h-[370px] md:w-[530px] md:mt-[-2rem] sm:mt-5 flex flex-col justify-between">
                <div className="h-[8rem] w-[9rem] bg-green-400 rounded-md"></div>
                <img
                  title="Duolingo Test Instant Feedabck"
                  alt="Duolingo Test Instant Feedabck"
                  className="mt-5 ml-5 sm:w-[18rem] md:w-[30rem] absolute rounded-md shadow-md"
                  src={Speaing}
                ></img>
                <div className="h-[8rem] sm:mt-[-1rem] md:mt-0  w-[9rem] bg-green-400 rounded-md self-end"></div>
              </div>
            </div>
            <div className="md:w-[40%] sm:w-full md:text-[20px] font-poppins sm:mt-10 md:mt-0">
              <h2 className="font-poppinsBold text-[#23B4BE] text-[25px] sm:text-center md:text-start">
                Instant Feedback
              </h2>

              <p className="mt-3 text-[18px] ">
                Receive immediate feedback on your performance, including
                detailed explanations for correct answers and suggestions for
                improvement.
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div
            className="md:flex md:flex-row sm:flex-col w-full md:px-[5rem] sm:px-2 py-5
           mt-[7rem] justify-between"
          >
            <div className="md:w-[40%] sm:w-full md:text-[20px] font-poppins">
              <h2 className="font-poppinsBold text-[#23B4BE] text-[25px] sm:text-center md:text-start">
                Track Your Progress
              </h2>

              <p className="mt-3 text-[18px]">
                Keep track of your progress over time, monitor your strengths
                and areas for improvement, and see how you stack up against
                others.
              </p>
            </div>
            <div>
              <div className=" md:h-[265px] md:w-[520px] md:mt-[-2rem] sm:mt-5 flex flex-col justify-between">
                <div className="h-[8rem] w-[9rem] bg-green-400 rounded-md self-end"></div>
                <img
                  title="Duolingo Track Your Progress"
                  alt="Duolingo Track Your Progress"
                  className="mt-5 ml-5 md:w-[30rem] sm:w-[18rem] absolute rounded-md shadow-md border-2"
                  src={Progress}
                ></img>
                <div className="h-[8rem] sm:mt-[-4.5rem] md:mt-0 w-[9rem] bg-green-400 rounded-md self-start"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
