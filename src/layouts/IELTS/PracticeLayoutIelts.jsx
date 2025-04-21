import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import LayoutAnimation from "../../Assets/SVG/LayoutAnimation";
import Footer from "../../Components/Home/Footer";
import Header from "../../Components/Home/Header";
import { Skeleton,notification } from "antd";


export default function PracticeLayoutIelts() {

  return (
    <div className="w-full h-auto bg-[#FFFF] sm:h-screen">
      <div className="">
        <Header></Header>

        <div className={`mt-10`}>
       
          <Outlet></Outlet>
        </div>

        {/* <Footer></Footer> */}
      </div>
    </div>
  );
}
