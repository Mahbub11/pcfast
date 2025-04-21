import React, { useEffect, useState } from "react";
import { ReactComponent as Studentsuccess } from "../../Assets/SVG/StudentSuccess.svg";
import { ReactComponent as Qutation } from "../../Assets/SVG/Quatation.svg";
import IconDummy1 from "../../Assets/Icon/iconDummy1.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
// import "./Carousal.css";
import Review from "../Feedback/Review";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../redux/slices/general";
import { Skeleton } from "antd";

export const SectionFour = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const dispatch = useDispatch();
  const [busy, isBusy] = useState(true);
  const {feedBackList}= useSelector(state=> state.general)

  useEffect(() => {
    dispatch(getFeedback());
    isBusy(false);
  }, []);

  return (
    <div>
      {
        busy? <Skeleton></Skeleton>:
        <div>
      <section className="h-[60%] sm:mt-[20%] lg:mt-[15%] md:mt-[15%] w-full  flex:col justify-center">
        <div className="flex:col justify-center w-full">
          <h2
            className="sm:text-[30px] md:text-[35px] 
           lg:text-[40px]  text-center font-[700]"
          >
            Reviews
          </h2>
          <div className="w-full flex justify-center mt-3">
            <p
              className=" md:text-[22px] text-[20px] text-center sm:w-[90%] sm:text-[16px] 
            sm:font-[400] font-montserrat lg:w-[60%]"
            >
              Your review is very important to us which will give us more
              encouragement so that we can raise the quality of
              PracticeCompanions even more.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center sm:mt-[2rem] lg:mt-[5rem]">
          <div className="overflow-hidden sm:w-full md:w-[70%] sm:text-justify md:text-left" ref={emblaRef}>
            <div className=" sm:w-full flex">
             
             {
              feedBackList?.map(val=>(
                 <Review feedback={val}></Review>
              ))
             }
            </div>
          </div>
        </div>
      </section>
    </div>
      }
    </div>
  );
};
