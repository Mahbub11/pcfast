import { Button, Input, Space } from "antd";
import { Radio } from "antd";
import React, { useState } from "react";

export default function AdditionalInterestedTest({interestedTest,setinterestedTest}) {

  return (
    <div>
      <div className="font-poppins">
        <div>
          <h1 className="text-[20px] font-[600]">Additional Information</h1>
        </div>
        <div className="mt-10  w-full flex justify-center">
          <div>
            <p className="text-center text-[20px]">Interested Test Proficiency</p>
            <div className="w-full flex justify-center">
              <div className="h-min w-auto mt-5">
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) => setinterestedTest(e.target.value)}
                >
                  <div className="flex gap-3 sm:flex-wrap font-montserrat ">
                    <div className="flex gap-1">
                      <Radio.Button
                        style={{
                          background:
                            interestedTest === "duolingo" ? "#3AB7BF" : "#FFFF",
                          color: interestedTest === "duolingo" ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value="duolingo"
                      >
                        DUOLINGO
                      </Radio.Button>
                    </div>
                    <div className="flex gap-1">
                      <Radio.Button
                        style={{
                          background: interestedTest === "ielts" ? "#3AB7BF" : "#FFFF",
                          color: interestedTest === "ielts" ? "#FFFF" : "	#000000",
                          fontFamily: "inherit",
                        }}
                        value="ielts"
                      >
                        IELTS
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
