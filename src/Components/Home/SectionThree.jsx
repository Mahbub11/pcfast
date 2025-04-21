import React from "react";
import { ReactComponent as Studentsuccess } from "../../Assets/SVG/StudentSuccess.svg";
import Slider from "react-slick";
import SuccessAnimation from "../SuccessAnimation";
import IconDesignSuccess from "../../Assets/SVG/IconDesignSuccess";

export const SectionThree = () => {
  var settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    autoplay: true,
    vertical: true,
    arrows: false,
    rtl: true,
  };

  return (
    <div>
      <section className="sm:h-[40%] lg:h-[60%] mt-[10%] w-full  flex:col justify-center">
        <div className="flex:col justify-center w-full">
          <h2
            className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700] "
          >
            Design For Success
          </h2>
          <div className="w-full flex justify-center mt-3">
            <p
              className="text-[20px] md:text-[22px] text-center sm:w-[90%] 
            sm:text-[16px] sm:font-[400] font-montserrat lg:w-[60%] "
            >
              PracticeCompanions is designed in such a way that you can easily
              practice as many times as you want and achieve your desired score.
            </p>
          </div>
        </div>

        <div className="sm:w-[80%] sm:mt-[-8rem] md:mt-[-5px] lg:w-[60%] flex justify-center m-auto h-[40rem]">
          <span className="w-full h-full flex justify-between md:mt-10">
            <span className="md:ml-[-10rem] sm:ml-[-5rem]">
              <IconDesignSuccess
                height="45rem"
                width="md:45rem"
              ></IconDesignSuccess>
            </span>
            {/* <Studentsuccess className="w-[30rem] h-[40rem] sm:blur-[1px]"></Studentsuccess> */}
          </span>
          <div className="overflow-hidden md:w-[40%] sm:w-[60%] md:ml-[10rem] 
          sm:ml-[5rem] absolute sm:mt-[10rem] md:mt-[5rem] ">
            <Slider {...settings} className="md:h-[35rem] sm:h-[25rem] w-full ">
              <div className="bg-[#a1bddd] px-4 py-4 rounded-md mt-5">
                <h2 className="text-gray-50 sm:font-[600] font-montserrat text-[20px] uppercase">
                  Practice Over 100+ Free Module
                </h2>
              </div>
              <div className="bg-[#a1bddd] px-4 py-4 rounded-md mt-5">
                <h2 className="text-gray-50  sm:font-[600] font-montserrat text-[20px] uppercase">
                  Different Types of Learning Curve
                </h2>
              </div>
              <div className="bg-[#a1bddd] px-4 py-4 rounded-md mt-5">
                <h2 className="text-gray-50  sm:font-[600] font-montserrat text-[20px] uppercase">
                  New Questions Added every Week
                </h2>
              </div>
              <div className="bg-[#a1bddd] px-4 py-4 rounded-md mt-5">
                <h2 className="text-gray-50  sm:font-[600] font-montserrat text-[20px] uppercase">
                  Live Result
                </h2>
              </div>
              <div className="bg-[#a1bddd] px-4 py-4 rounded-md mt-5">
                <h2 className="text-gray-50  sm:font-[600] font-montserrat text-[20px] uppercase">
                  Easy to Practice
                </h2>
              </div>
              <div className="bg-[#a1bddd] px-4 py-4 rounded-md mt-5">
                <h2 className="text-gray-50  sm:font-[600] font-montserrat text-[20px] uppercase">
                  User Friendly
                </h2>
              </div>
              <div className="bg-[#a1bddd] px-4 py-4 rounded-md mt-5">
                <h2 className="text-gray-50  sm:font-[600] font-montserrat text-[20px] uppercase">
                  Practice Over 100+ Free Module
                </h2>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};
