import React from "react";
import { ReactComponent as Qutation } from "../../Assets/SVG/Quatation.svg";
import IconDummy2 from "../../Assets/Icon/iconDummy2.jpg";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Review({feedback}) {

  return (
    <div className=" bg-header ml-[2rem] rounded-md flex ">
      <div className="flex justify-center">
        <div className="flex:col justify-around sm:w-[20rem] md:w-[25rem]">
          <div className="px-4 mt-3">
            <span>
              <Qutation className="fill-modt w-[3rem] h-[3rem]"></Qutation>
            </span>
            <p className="text-midnight px-2 py-2 font-montserrat font-[500] ">
              {feedback.feedback}
            </p>
          </div>

          <div className="h-full w-full flex mt-5 px-4">
         <div className="mt-3">
         <Avatar
            className=" m-auto"
            src={`https://practicemania.s3.ap-south-1.amazonaws.com/user/${feedback.profile?.avatar}`}
            size="large"
            icon={<UserOutlined />}
          />
         </div>
            <div className="mt-[3px] ml-4">
              <h2 className="text-[20px] font-robotomono text-midnight">
                {feedback.user.name}
              </h2>
              <p className="text-modt">{feedback?.profile?.country}</p>
              <p className="h-5"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
