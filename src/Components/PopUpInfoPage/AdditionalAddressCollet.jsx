import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

export default function AdditionalAddressCollect({setAddress,address}) {
 
  return (
    <div>
      <div className="font-poppins">
        <div>
          <h1 className="text-[20px] font-[600]">
            Additional Information (Location)
          </h1>
        </div>
        <div className="mt-10 w-[60%]">
          <CountryDropdown
          className='border-[2px] border-[#3ab6bf5f] rounded-md px-2 py-2'
            value={address}
            onChange={(val) => setAddress(val)}
          />
        </div>
      </div>
    </div>
  );
}
