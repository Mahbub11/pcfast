import { Button, Input, Space } from "antd";
import { Radio } from "antd";
import React, { useState } from "react";

export default function AdditionalCurrentLevel({cLevel,setClevel}) {
  
  return (
    <div>
      <div className="font-poppins">
        <div>
          <h1 className="text-[20px] font-[600]">Additional Information</h1>
        </div>
        <div className="mt-10  w-full flex justify-center">
          <div>
            <p className="text-center text-[20px]">Current Level</p>
            <div>
              <div className="h-min w-auto mt-5">
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) => setClevel(e.target.value)}
                >
                  <div className="flex gap-3 sm:flex-wrap font-montserrat ">
                    <div className="flex gap-1">
                      <Radio.Button
                        style={{
                          background:
                            cLevel === "student" ? "#3AB7BF" : "#FFFF",
                          color: cLevel === "student" ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value="student"
                      >
                        STUDENT
                      </Radio.Button>
                    </div>
                    <div className="flex gap-1">
                      <Radio.Button
                        style={{
                          background: cLevel === "jb" ? "#3AB7BF" : "#FFFF",
                          color: cLevel === "jb" ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value="jb"
                      >
                        JOB
                      </Radio.Button>
                    </div>
                    <div className="flex gap-1">
                      <Radio.Button
                        style={{
                          background: cLevel === "ap" ? "#3AB7BF" : "#FFFF",
                          color: cLevel === "ap" ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value="ap"
                      >
                        Abroad Plan
                      </Radio.Button>
                    </div>
                  </div>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
