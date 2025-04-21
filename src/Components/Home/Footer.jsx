import React, { useState } from "react";
import { ReactComponent as WaveFooter } from "../../Assets/SVG/WaveFooter.svg";
import { ReactComponent as Facebook } from "../../Assets/SVG/facebook.svg";
import { ReactComponent as Google } from "../../Assets/SVG/google.svg";
import IconYoutube from "../../Assets/SVG/IconYoutube";
import IconTwitterCircle from "../../Assets/SVG/IconTwitter";
import { ReactComponent as Linkdii } from "../../Assets/SVG/linkedin.svg";
import IconSubsCribe from "../../Assets/SVG/IconSubsCribe";
import { Link } from "react-router-dom";

export default function Footer() {
  const date = new Date();

  const [email, setEmail] = useState();

  const subsCribe = () => {
    if (ValidateEmail(email)) {
      window.location.reload();
    }
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
  }

  return (
    <div className="">
      <div className=" sm:mt-[10rem] md:mt-[20rem] h-auto bg-[#E8E8E8]">
        <div
          className="bg-[#19ADB7] md:mt-[5rem] lg:mt-[5rem] xl:mt-[-7rem] xl:w-[70%] absolute
       xl:left-[14%] sm:flex:col sm:justify-center md:flex md:justify-between  
       m-auto w-[65%] sm:h-[10rem] lg:h-[13rem] h-[20rem]  sm:mt-[-5rem]
        sm:w-[90%] xl:h-[15rem] mt-[14rem] sm:left-[5%] left-[17%] rounded-md"
        >
          <div className="ml-3 flex justify-center md:ml-[2rem] lg:mt-[3rem] xl:mt-[3rem] ">
            <h2 className="font-montserrat text-[20px] md:text-[25px] xl:text-[28px] font-[900] text-white">
              <span
                className="sm:text-[38px] xl:text-[55px] font-[600] font-poppins
         text-white"
              >
                Subscribe!
              </span>
              <br></br>{" "}
              <p className="font-[500] sm:hidden md:block font-poppins text-[25px]">
                to get regular Updates.
              </p>
            </h2>
          </div>

          <div className="w-full  flex justify-center mt-3 md:m-auto lg:w-full sm:w-[70%] sm:m-auto">
            <div className="flex justify-center sm:mt-5">
              <input
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="text[3rem] sm:w-[13rem] sm:h-[3rem] lg:w-[25rem] xl:h-[5rem] xl:w-[20rem] text-start px-5 text-[20px]
               h-[2.5rem] lg:h-[5.5rem] md:h-[3.5rem] rounded-l-md  border-none outline-none m-auto font-montserrat"
              ></input>

              <div className="bg-[#D1D0D0] md:w-[7rem] sm:w-[3.5rem] cursor-pointer">
                <span
                  onClick={subsCribe}
                  className="sm:hidden md:flex h-full mt-4 drop-shadow-sm  justify-center m-auto"
                >
                  <IconSubsCribe height="3rem" width="3rem"></IconSubsCribe>
                </span>
                <span
                  onClick={subsCribe}
                  className="sm:flex md:hidden h-full mt-2 drop-shadow-sm justify-center m-auto"
                >
                  <IconSubsCribe height="2rem" width="2rem"></IconSubsCribe>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:h-[30rem]  w-full sm:h-[15rem] msm:h-[15] m-auto md:block sm:hidden">
          <div className="flex justify-center items-end h-full ">
            <div className="flex justify-around md:mb-[4rem]">
              <div className="flex justify-between w-[80%]  h-full ">
                <div className="flex:col justify-between w-[30%]">
                  <h2
                    className="sm:text-[35px] xxl:text-[40px] text-[40px] text-gradient-to-r
                 from-tahiti to-midnight mt-2 font-lobster font-[500] cursor-pointer"
                  >
                    <Link className="drop-shadow-sm" to={"/"}>
                      PracticeCompanions
                    </Link>
                  </h2>

                  <p
                    className="text-[17px] xxl:text-[20px] xxl:font-[300] font-light 
                 sm:hidden md:block lg:block xl:block xxl:blcok "
                  >
                    Explore endless practice opportunities with instant
                    feedback. Master English effortlessly with our platform's
                    rapid results.
                  </p>
                </div>

                <div
                  className=" sm:hidden md:block flex:col
               justify-center gap-5 mt-[3rem] h-[20%] border-tahiti/30 border-l-[3px] w-[20%]"
                >
                  <ul className="ml-3 text-[17px] font-poppins font-[600]">
                    <li className="text-[#19ADB7] hover:underline cursor-pointer">
                      <Link to={"/"}> Home</Link>
                    </li>

                    <li className=" text-[#19ADB7]   hover:underline cursor-pointer">
                      <Link to={"/articals"}> Blog</Link>
                    </li>
                    <li className="  text-[#19ADB7]  hover:underline cursor-pointer">
                      <Link to={"/duolingo/pricing"}> Pricing</Link>
                    </li>

                    {/* <li className="mt-2 text-[20px] text-[#19ADB7] font-[500] font-robotomono hover:underline cursor-pointer">
                      <Link to={"/materials"}> Materials</Link>
                    </li>
                    <li className="mt-2 text-[20px] text-[#19ADB7] font-[500] font-robotomono hover:underline cursor-pointer">
                      <Link to={"/articals"}> Articles</Link>
                    </li> */}
                    <li className=" text-[#19ADB7]   hover:underline cursor-pointer">
                      <Link to={"/privacy-policy"}> Privacy & Policy</Link>
                    </li>
                    <li className=" text-[#19ADB7] 
                    hover:underline cursor-pointer">
                      <Link to={"/terms-and-conditions"}> Terms & Conditions</Link>
                    </li>
                    
                  </ul>
                </div>

                <div className="flex:col justify-between h-full mt-5 items-center">
                  <h2
                    className="text-[40px] xxl:text-[40px] xxl:mt-[-1rem] sm:text-[20px]
               text-gradient-to-r from-tahiti to-midnight  mt-2
                font-poppins font-[600]"
                  >
                    Contact
                  </h2>
                  <div className="flex:col justify-start">
                    <div className="flex:col justify-start mt-2">
                      <h2
                        className="text-[#19ADB7] font-[500]
                     cursor-pointer xxl:text-[21px] font-montserrat sm:text-[15px] drop-shadow-sm"
                      >
                       contact@practicecompanions.com
                      </h2>

                      <div className=" sm:w-[40%] w-[50%] h-[5rem] mt-4">
                        <div className=" flex h-[2.8rem] mr-10 rounded-md">
                          <div className=" flex gap-5 mr-10">
                            <div className="bg-midnight w-[40%]  rounded-md flex justify-start">
                              <a
                                href={
                                  "https://www.facebook.com/groups/1308420916508757/?ref=share&mibextid=NSMWBT"
                                }
                              >
                                <span>
                                  <Facebook className="fill-white w-10 h-10 mt-1"></Facebook>
                                </span>
                              </a>
                            </div>
                            <div className="bg-midnight w-[40%] rounded-md flex justify-center">
                              <a
                                href={
                                  "https://www.youtube.com/channel/UCDwzyaIME5NrLcgiFeGdmhQ"
                                }
                              >
                                <span>
                                  <IconYoutube
                                    fill="white"
                                    height="3rem"
                                    width="2.5rem"
                                    className="fill-white w-10 h-10"
                                  ></IconYoutube>
                                </span>
                              </a>
                            </div>

                            <div className="bg-midnight w-[40%] rounded-md flex justify-center">
                              <a href={"https://twitter.com/practiceco63790"}>
                                <span className="flex justify-center m-auto mt-1">
                                  <IconTwitterCircle
                                    fill="white"
                                    height="2.3rem"
                                    width="2.5rem"
                                    className="fill-white w-10 h-10"
                                  ></IconTwitterCircle>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:block md:hidden w-full py-5 m-auto">
          <div className="w-full px-2 m-auto flex flex-col justify-between ">
            <div className="flex:col justify-center w-[30%] mt-[5rem]">
              <h2
                className="sm:text-[35px] xxl:text-[40px] text-[40px] text-gradient-to-r
                 from-tahiti to-midnight mt-2 font-lobster font-[500] cursor-pointer"
              >
                <Link to={"/"}>PracticeCompanions</Link>
              </h2>
            </div>

            <div>
              <div className="flex w-full m-auto">
                <div>
                  <ul className="w-full mt-5 text-[15px] font-poppins ">
                    <li className=" text-tahiti  font-[500] hover:underline cursor-pointer">
                      <Link to={"/"}> Home</Link>
                    </li>
                    {/* <li className="text-[20px] text-indigo-400 font-[500] font-robotomono hover:underline cursor-pointer">
                      <Link to={"/duolingo/module/reading"}> Practice</Link>
                    </li> */}
                    <li className="text-[16px] text-tahiti  hover:underline cursor-pointer">
                      <Link to={"/materials"}> Materials</Link>
                    </li>
                    <li className=" text-tahiti   hover:underline cursor-pointer">
                      <Link to={"/articals"}> Articles</Link>
                    </li>
                    <li className=" text-tahiti  hover:underline cursor-pointer">
                      <Link to={"/duolingo/pricing"}> Pricing</Link>
                    </li>
                    <li className=" text-tahiti   hover:underline cursor-pointer">
                      <Link to={"/privacy-policy"}> Privacy & Policy</Link>
                    </li>
                    <li className=" text-tahiti   hover:underline cursor-pointer">
                      <Link to={"/terms-and-conditions"}> Terms & Conditions</Link>
                    </li>
                  </ul>
                </div>

                <div className="h-auto w-[50%] ml-[-1rem]">
                 <div className="w-full flex justify-end ml-10">
                 <div className=" flex flex-col justify-center mt-4">
                    <h2 className="text-[30px] font-[600] ">Contact</h2>
                    <p className="text-tahiti  cursor-pointer 
                     font-[500] text-[14px] text-center">
                      contact@practicecompanions.com
                    </p>
                    <div className=" gap-2  ">
                      <div className=" h-auto mt-2 ">
                        <div className=" flex h-[2.8rem] rounded-md">
                          <div className=" flex gap-5">
                            <div className="bg-midnight w-[40%]
                              rounded-md flex justify-start h-min">
                              <a
                                href={
                                  "https://www.facebook.com/groups/1308420916508757/?ref=share&mibextid=NSMWBT"
                                }
                              >
                                <span>
                                  <Facebook className="fill-white w-8 h-7 mt-1"></Facebook>
                                </span>
                              </a>
                            </div>
                            <div className="bg-midnight h-min w-[40%] rounded-md flex justify-center">
                              <span>
                                <Google className="fill-white  w-8 h-8"></Google>
                              </span>
                            </div>

                            <div className="bg-midnight h-min w-[40%] rounded-md flex justify-center">
                              <span>
                                <Linkdii className="fill-white  w-8 h-8"></Linkdii>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-center font-poppins px-2 py-2">
          Copyright Practice Companions @{date.getFullYear()} - This product is
          not endorsed or approved by Duolingo.
        </h2>
      </div>
    </div>
  );
}
