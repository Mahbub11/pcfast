import { Button, Input, Space } from "antd";
import React from "react";

export default function AdditionalPhone({setPhone}) {
  return (
    <div>
      <div className="font-poppins">
        <div>
          <h1 className="text-[20px] font-[600]">
            Additional Information (Phone Number)
          </h1>
          <p className="mt-5">
            If you want a reply from us later when you are away from your
            computer.
          </p>
        </div>
        <div className="mt-10 w-[60%]">
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input onChange={(e)=> setPhone(e.target.value)} defaultValue="Enter your Phone Number" />
            <Button>Submit</Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  );
}
