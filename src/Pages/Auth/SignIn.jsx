import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconFBL from "../../Assets/SVG/IconFBL";
import IconGL from "../../Assets/SVG/IconGL";
import IconLoginBG from "../../Assets/SVG/IconLoginBG";
import { Input, notification, Spin } from "antd";
import axiosInstance from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { LoadingOutlined } from "@ant-design/icons";
import PopUpinfoCollect from "../../Components/Feedback/PopUpinfoCollect";
import { dispatch } from "../../redux/store";
import { getBookmarkList } from "../../redux/slices/bookmark";
import { getStatDuolingo } from "../../redux/slices/statistic";
import { getModuleData, getUserInfo } from "../../redux/slices/auth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const apiKey = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState(false);
  const navigate = useNavigate();

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const handleSignIn = async () => {
    if (email && password) {
      if (ValidateEmail(email)) {
        setLoading(true);
        const config = { headers: { "Content-Type": "application/json" } };
        const signUpdata = {
          email: email,
          password: password,
        };
        await axiosInstance
          .post(`${API_LEVEL}/auth/signin`, signUpdata, config)
          .then(async (res) => {
            if (res.status === 200) {
              openNotification("success", "Success !", "Logged In Success");
              localStorage.setItem("access", res.data.token);

              // Fetch user data after successful login
              await dispatch(getUserInfo());
              await dispatch(getModuleData());
              await dispatch(getBookmarkList());
              await dispatch(getStatDuolingo());

              setTimeout(() => {
                navigate("/duolingo/module/reading");
                setLoading(false);
              }, 5000); // 100ms is usually enough
            }
          })
          .catch((error) => {
            openNotification("error", "Error !", error.error);
            setLoading(false);
          });
      } else {
        openNotification("error", "Error !", "Invalid email address");
      }
    } else {
      openNotification("error", "Error !", "All fields required");
    }
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    openNotification("error", "Error !", "Invalid email address");
    return false;
  }

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axiosInstance.post(
        `${API_LEVEL}/auth/g-signin`,
        {
          idToken: credentialResponse.credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      console.log("JWT from backend:", data.token);

      localStorage.setItem("access", data.token);

      // Fetch user data after successful login
      await dispatch(getUserInfo());
      await dispatch(getModuleData());
      await dispatch(getBookmarkList());
      await dispatch(getStatDuolingo());

      setTimeout(() => {
        navigate("/duolingo/module/reading");
        setLoading(false);
      }, 5000); // Adjust timeout as needed
    } catch (error) {
      console.error("Google login failed:", error);
      // Optional: display error message or set error state
    }
  };

  const handleError = () => {
    console.error("Google Sign-In was unsuccessful.");
  };

  return (
    <div className="h-full w-full px-2 relative overflow-hidden font-montserrat">
      {contextHolder}
      <div className="flex justify-center">
        <Link
          to={"/"}
          className="sm:text-[30px] md:text-[40px] md:mt-2 sm:mt-4  bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-lobster font-[500] drop-shadow-sm lg:w-auto w-full"
        >
          PracticeCompanions
        </Link>
      </div>
      <div className="h-[80%] md:w-[80%] sm:w-full m-auto flex justify-around  px-5 py-3  mt-[2rem]">
        <div className="md:h-auto sm:h-auto md:w-[35rem] sm:w-full bg-white  rounded-md shadow-sm">
          <div className="md:w-[75%] sm:w-full md:h-auto sm:h-full m-auto mt-2">
            <div className="h-full px-5 py-5 flex flex-col gap-2 justify-between">
              <h1 className="font-montserrat text-[22px] text-center font-[500]">
                SIGN IN
              </h1>
              <div className="md:mt-[3rem] flex justify-center  sm:mt-[2rem]">
                <div className="w-[90%] flex flex-col gap-3 justify-center items-center">
                  <Input
                    type="text"
                    name="email"
                    pattern=".*@.*\..*"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your E-mail Address"
                    className=" h-[3rem] w-full shadow-sm rounded-md px-2 py-2"
                  ></Input>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className=" h-[3rem] w-full shadow-sm rounded-md px-2 py-2"
                  ></Input>

                  <p className=" self-end flex justify-end">
                    <Link to={"/auth/forgotpass"}>Forgot Password</Link>
                  </p>

                  <div className={`${loading ? "block" : "hidden"} mt-5`}>
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 24,
                          }}
                          spin
                        />
                      }
                    />
                  </div>

                  <button
                    onClick={handleSignIn}
                    className={`${
                      loading ? "hidden" : "block"
                    } bg-[#15B13F] w-full h-[3rem] md:mt-[1rem] rounded-md text-white font-[500]"`}
                  >
                    Sign In
                  </button>
                  <GoogleOAuthProvider clientId={apiKey}>
                    <div style={{ textAlign: "center", width: "100%" }}>
                      <GoogleLogin
                        width="10rem"
                        theme="filled_blue"
                        onSuccess={handleSuccess}
                        onError={handleError}
                      />
                    </div>
                  </GoogleOAuthProvider>
                </div>
              </div>

              <div className="flex justify-center  flex-col  md:mt-5 m-auto ">
                {/* <h1 className="text-center">Or Continue With</h1>
                <div className="flex justify-center gap-2 ">
                  <span className="cursor-pointer">
                    <IconFBL height="5rem" width="7rem"></IconFBL>
                  </span>
                  <span className="cursor-pointer">
                    <IconGL height="5rem" width="7rem"></IconGL>
                  </span>
                </div> */}
                <p className="sm:flex sm:flex-wrap justify-center mt-[2rem]">
                  Don't you have a account? <span className="w-2"></span>
                  {"  "}
                  <Link to={"/auth/signup"}>
                    <span className="text-[#3AB7BF] font-[600] cursor-pointer">
                      SIGN UP
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden md:block self-center">
          <span>
            <IconLoginBG height="30rem" width="35rem"></IconLoginBG>
          </span>
        </div>
      </div>
    </div>
  );
}
