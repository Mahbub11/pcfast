import React, { useState } from "react";
import IconFBOriginal from "../../Assets/SVG/IconFBOriginal";
import IconYoutubeOriginal from "../../Assets/SVG/IconYoutubeOriginal";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { saveFeedback } from "../../redux/slices/general";
import { ShowNotification } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function CommunityIndex() {
  const { userProfile, userInfo } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();

  const saveFeedbackDB = () => {
    console.log(feedback.length);
    if (feedback.length < 10) {
      dispatch(
        ShowNotification({
          severity: "error",
          message: "Please write more to submit",
        })
      );
    } else {
      const data = {
        userId: userInfo.id,
        feedback: feedback,
        rating: rating,
      };

      dispatch(saveFeedback(data));
      setFeedback("");
    }
  };

  return (
    <div className="w-full h-full px-2 py-2 flex justify-end ">
      <div
        className="sm:w-[90%] md:w-[70%] m-auto
         font-poppins text-[18px] md:flex md:flex-row
         sm:flex sm:flex-col md:justify-end sm:justify-center "
      >
        <div className="flex flex-col justify-center md:w-[70%] ">
          <Avatar
            className=" m-auto"
            src={`https://practicemania.s3.ap-south-1.amazonaws.com/user/${userProfile?.avatar}`}
            size="large"
            icon={<UserOutlined />}
          />
          <p className="text-center mt-2">{userInfo.name}</p>
          <TextArea
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Type your feedback here..."
            rows={10}
            className="md:w-[70%] drop-shadow-sm  self-center mt-10 text-[17px]"
          ></TextArea>

          <div className="m-auto mt-5">
            <Rating
              style={{ maxWidth: 150 }}
              value={rating}
              onChange={setRating}
            />
          </div>

          <div>
            <button
              onClick={saveFeedbackDB}
              to={"/auth/signin"}
              className="bg-[#3AB7BF] px-5 py-3 flex justify-center items-center m-auto
             text-[15px] rounded-md text-white font-[700] mt-10"
            >
              Send Feedback
            </button>
          </div>
        </div>

        <div className="w-auto gap-5 m-auto mt-[7rem]">
          <div>
            <p className="font-poppinsBold text-[20px] text-center">
              Join Our Official <br></br>
              <span>Community</span>
            </p>
            <div className="justify-center flex-col gap-5">
              <div className="w-full m-auto flex justify-center">
                <div className="mt-5 w-full m-auto md:flex md:flex-col
                sm:flex justify-center gap-5">
                  <Link
                    to={
                      "https://www.facebook.com/groups/1308420916508757/?ref=share&mibextid=NSMWBT"
                    }
                  >
                    <div className="w-full flex justify-center">
                      <span>
                        <IconFBOriginal
                          height="3rem"
                          width="3rem"
                        ></IconFBOriginal>
                      </span>
                    </div>
                    <h2 className="text-center">Facebook</h2>
                  </Link>

                  <Link
                    to={
                      "https://www.youtube.com/channel/UCDwzyaIME5NrLcgiFeGdmhQ"
                    }
                  >
                    <div className="w-full flex justify-center">
                      <span>
                        <IconYoutubeOriginal
                          height="3rem"
                          width="3rem"
                        ></IconYoutubeOriginal>
                      </span>
                    </div>
                    <h2 className="text-center">Facebook</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
